# Voice tutor: current API evidence and budget design

Verified official documentation on 2026-11-08. No paid API calls or credential access. This file describes a persistent server-owned Realtime WebSocket relay, not a recorded-turn upload UI. Browser microphone capture and playback remain continuous; provider VAD determines conversational turns internally.

## Model and rates

Use `gpt-realtime-2.1` for the quality-first pilot. Its model page lists **128,000 context tokens** and 32,000 maximum output tokens. Do not use the old 32,768-context assumption. The event API separately documents explicit `max_output_tokens` values from 1 to 4096; use 1024 rather than `inf`.

USD per million tokens, input / cached input / output:

- Text: 4 / 0.40 / 24.
- Audio: 32 / 0.40 / 64.
- Images: 5 / 0.50 / not applicable. Images are disabled for this pilot.

Sources: [model](https://developers.openai.com/api/docs/models/gpt-realtime-2.1), [pricing](https://developers.openai.com/api/docs/pricing).

## Transport and configuration

Connect from the persistent Node server to `wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1`, with `Authorization: Bearer ...` in a server-held header. Optionally provide a pseudonymous `OpenAI-Safety-Identifier`. No API key or ephemeral provider credential goes to the browser. A connection produces `session.created`; send `session.update`, then validate `session.updated` before accepting audio or creating responses. This is not the GPT-Live `session.start` protocol.

Source: [WebSockets](https://developers.openai.com/api/docs/guides/voice-websockets).

Proposed configuration, assembled only on the server:

```json
{
  "type": "session.update",
  "session": {
    "type": "realtime",
    "model": "gpt-realtime-2.1",
    "instructions": "SERVER_OWNED_GROUNDED_TUTOR_INSTRUCTIONS",
    "output_modalities": ["audio"],
    "max_output_tokens": 1024,
    "tools": [],
    "audio": {
      "input": {
        "format": { "type": "audio/pcm", "rate": 24000 },
        "turn_detection": {
          "type": "server_vad",
          "create_response": false,
          "interrupt_response": true,
          "prefix_padding_ms": 300,
          "silence_duration_ms": 500,
          "threshold": 0.5
        }
      },
      "output": {
        "format": { "type": "audio/pcm", "rate": 24000 },
        "voice": "marin"
      }
    },
    "truncation": {
      "type": "retention_ratio",
      "retention_ratio": 0.8,
      "token_limits": { "post_instructions": 16000 }
    }
  }
}
```

These are reference-backed fields, not a paid-call-tested configuration. Explicitly verify that input transcription is absent/disabled in the acknowledged session. Do not enable it implicitly. `create_response:false` prevents automatic VAD-stop responses; `interrupt_response:true` supports automatic cancellation at speech start. **Do not set provider `idle_timeout_ms`**: it triggers model responses. Implement the requested 30-second idle shutdown in the relay. The hard 120-second session deadline is also server-owned.

Sources: [client event schema](https://developers.openai.com/api/reference/resources/realtime/client-events), [cost/truncation guide](https://developers.openai.com/api/docs/guides/voice-latency-cost).

## Reservation proof and limits

`post_instructions` caps conversation input after instructions/tool definitions, not the whole input. Thus multiplying 16,000 by an input price alone is insufficient.

A conservative bound that avoids assuming an instruction tokenizer:

- All possible instruction text: reserve the full 128,000 context capacity at $4/M = $0.512.
- Post-instruction conversation: reserve 16,000 at the highest input modality rate, $32/M = $0.512.
- All generated output: reserve 1,024 at the highest output rate, $64/M = $0.065536.
- Total: **$1.089536 = 1,089,536 microdollars per pending response**.

This deliberately double-counts part of the context. It is a conservative derivation from documented limits, not a forecast. The raw full-context audio assumption costs $4.096 before output and would require a larger reservation. The conservative upper bound depends on the provider acknowledging and enforcing the 16,000 post-instruction limit, no independent transcription, no tools, no external calls, no premium processing, and all responses using the fixed output cap. If any premise is unknown, do not start inference. Add any applicable regional premium or taxes if the budget includes those; infrastructure is not included here.

The API documents output token limits; the general [token-counting guide](https://developers.openai.com/api/docs/guides/token-counting) says output limits cover all generated tokens, including non-visible tokens. Do not use a spoken-seconds estimate as the bound. If observed usage violates the assumed schema or reservation, preserve the reservation and disable further inference for investigation.

Admission transaction: `settled lifetime microdollars + unresolved reservations + new reservation <= 100_000_000`. The implementation reserves ten response ceilings before opening the provider session, then records each response and settles the session on verified close. Never let a browser event directly create a response or alter provider settings. Keep one in-flight response, and settle its `response.done` before admitting another. Disable blind retries. Unknown sends/timeouts keep the reservation until reconciled. Expiring a connection lease must not refund money.

This can stop admitting work before all $100 is consumed, because enough headroom for the worst case must remain. It does not promise spending exactly $100 or an unconditional invoice guarantee.

## Streaming event loop

Send PCM audio as `input_audio_buffer.append` with base64 `audio`; use small bounded chunks, not client-supplied provider events. Audio is 24 kHz PCM; browser capture must resample consistently and encode the chosen PCM representation. Validate framing, chunk sizes, byte rate and total session duration server-side.

With server VAD, wait for `input_audio_buffer.committed` and its `item_id` rather than manually committing on `speech_stopped`. Once the user item is ready and any previous response is terminal, use the already-held session reservation and send `response.create` with the explicit output cap and a server attempt identifier in metadata. Deduplicate committed items and pending response creation. Gate against new speech arriving while the reservation is pending.

Handle `session.created`, `session.updated`, `input_audio_buffer.speech_started`, `input_audio_buffer.speech_stopped`, `input_audio_buffer.committed`, `response.created`, `response.output_item.added`, `response.output_audio.delta`, `response.output_audio.done`, `response.output_audio_transcript.delta`, `response.output_audio_transcript.done`, `response.done`, and `error`. Associate streams with response/item/content identifiers. `response.done` is a generation terminal event, not proof of audio playback completion.

Sources: [client events](https://developers.openai.com/api/reference/resources/realtime/client-events), [server events](https://developers.openai.com/api/reference/resources/realtime/server-events).

## Barge-in and shutdown

On speech start: stop browser playback immediately, clear queued audio, invalidate stale chunks, and let automatic interruption cancel the active response (or send targeted `response.cancel` if needed). Do not refund the reservation on cancellation. Keep receiving the terminal usage.

The browser reports actual played PCM samples for the assistant item, not received or queued duration. The relay validates/clamps that report against audio sent and sends:

```json
{
  "type": "conversation.item.truncate",
  "item_id": "ASSISTANT_ITEM_ID",
  "content_index": 0,
  "audio_end_ms": 1500
}
```

`audio_end_ms` must not exceed generated audio duration. This keeps conversation history aligned with speech the student heard. Await truncation acknowledgment before generating a continuation when possible. `output_audio_buffer.clear` is WebRTC/SIP-only; a WebSocket relay must clear its own/client queues.

At 120 seconds, 30 seconds idle, browser disconnect, or a failed accounting dependency: block new responses, cancel active generation, clear playback, drain terminal usage for a bounded interval, then close upstream and downstream sockets. Missing terminal usage keeps the reserve. Never restart a paid response automatically after a reconnect.

## Cost settlement and silence

`response.done.response.usage` gives input/output totals and modality details. Cached input counts are subsets of input counts. For text/audio/image, cost is `(input - cached) * input_rate + cached * cached_rate`, plus output modality costs, divided by one million. Keep raw usage and integer/decimal precision. Require modality totals to reconcile; otherwise mark unknown and retain reserve. Deduplicate by response ID and handle cancelled, failed and incomplete responses as potentially billable.

Realtime billing is per response, with separate input-transcription billing only when enabled. The cost guide says connections/bandwidth currently have no charge and VAD filters empty audio unless manually inserted as conversation input. Therefore ordinary streaming silence without inference and with transcription disabled does not itself create response charges. Nonempty committed audio becomes billable context when a response is generated. Do not enable an idle auto-response, transcription, or another model under this assumption.

Sources: [cost guide](https://developers.openai.com/api/docs/guides/voice-latency-cost), [server usage schema](https://developers.openai.com/api/reference/resources/realtime/server-events).

## Verification required before launch

No live paid test was performed. Test real server acknowledgments, PCM encoding, no automatic responses, cap enforcement, browser playback accounting, interruption, cancelled usage, duplicate commits, late terminal events, process death, cross-tab concurrency, lost sends, and quota admission. The relay needs persistent WebSocket-capable hosting, not an assumed long-lived Vercel request. Instruction-following and grounded answers still need tutoring-quality evaluations; no zero-error claim is justified.
