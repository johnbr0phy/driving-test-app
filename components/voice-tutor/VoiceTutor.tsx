'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { decodePcm24, encodePcm16, playedAudioMs, StreamingResampler } from '@/lib/voiceTutorAudio';

type Phase = 'idle' | 'starting' | 'listening' | 'speaking' | 'ended';
type Props = { examId: string; questionId: string; optionOrder: string; questionText: string; language: string };
type Playback = { node: AudioBufferSourceNode; itemId: string; start: number; duration: number };

/** Keyed by question. Each asynchronous continuation checks the session generation. */
export function VoiceTutor({ examId, questionId, optionOrder, questionText, language }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState('');
  const [seconds, setSeconds] = useState(120);
  const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
  const ref = useRef({ generation: 0, phase: 'idle' as Phase, stream: null as MediaStream | null,
    context: null as AudioContext | null, input: null as MediaStreamAudioSourceNode | null,
    recorder: null as AudioWorkletNode | null, socket: null as WebSocket | null,
    abort: null as AbortController | null, timer: null as ReturnType<typeof setInterval> | null,
    expiresAt: 0, playback: [] as Playback[], played: new Map<string, number>(), nextAt: 0, ready: false, currentResponse: '', ignoredResponses: new Set<string>() });

  function change(next: Phase) { ref.current.phase = next; setPhase(next); }
  function alive(generation: number) { return ref.current.generation === generation && ref.current.phase !== 'ended'; }
  function reportPlayback() {
    const r = ref.current;
    const now = r.context?.currentTime ?? 0;
    const current = r.playback.find(part => part.start <= now && part.start + part.duration > now) ?? r.playback[0];
    const itemId = current?.itemId ?? Array.from(r.played.keys()).at(-1);
    if (!itemId) return;
    const audioEndMs = playedAudioMs(r.played.get(itemId) || 0, r.playback.filter(part => part.itemId === itemId), now);
    if (r.socket?.readyState === WebSocket.OPEN) r.socket.send(JSON.stringify({ type: 'playback', itemId, audioEndMs }));
  }
  function stopOutput() {
    const r = ref.current;
    reportPlayback();
    for (const part of r.playback) { part.node.onended = null; try { part.node.stop(); } catch { /* Already ended. */ } part.node.disconnect(); }
    r.playback = []; r.played.clear(); r.nextAt = 0;
    if (r.currentResponse) r.ignoredResponses.add(r.currentResponse);
  }
  function cleanup() {
    const r = ref.current;
    r.generation++; r.ready = false; r.abort?.abort(); r.abort = null;
    if (r.timer) clearInterval(r.timer); r.timer = null;
    stopOutput();
    if (r.socket) {
      r.socket.onopen = null; r.socket.onmessage = null; r.socket.onerror = null; r.socket.onclose = null;
      if (r.socket.readyState === WebSocket.OPEN) r.socket.send(JSON.stringify({ type: 'end' }));
      r.socket.close(); r.socket = null;
    }
    if (r.recorder) { r.recorder.port.onmessage = null; r.recorder.disconnect(); r.recorder.port.close(); r.recorder = null; }
    r.input?.disconnect(); r.input = null;
    r.stream?.getTracks().forEach(track => { track.onended = null; track.stop(); }); r.stream = null;
    if (r.context) { void r.context.close().catch(() => {}); r.context = null; }
    r.currentResponse = ''; r.ignoredResponses.clear();
    r.phase = 'ended';
  }
  function end(note = 'Session ended. Your microphone is off.') { cleanup(); setPhase('ended'); setMessage(note); }
  useEffect(() => () => cleanup(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function queueAudio(delta: string, itemId: string, responseId: string, generation: number) {
    const r = ref.current;
    if (!alive(generation) || !r.context || r.ignoredResponses.has(responseId)) return;
    r.currentResponse = responseId;
    const samples = decodePcm24(delta);
    if (!samples.length) return;
    const start = Math.max(r.context.currentTime + 0.015, r.nextAt);
    if (start - r.context.currentTime > 30) throw new Error('Audio playback fell behind. Please start a new session.');
    const buffer = r.context.createBuffer(1, samples.length, 24000);
    buffer.copyToChannel(samples, 0);
    const node = r.context.createBufferSource(); node.buffer = buffer; node.connect(r.context.destination);
    const part = { node, itemId, start, duration: samples.length / 24000 };
    r.playback.push(part); r.nextAt = start + part.duration; change('speaking');
    node.onended = () => {
      if (!alive(generation)) return;
      r.played.set(itemId, (r.played.get(itemId) || 0) + part.duration * 1000);
      r.playback = r.playback.filter(p => p !== part); node.disconnect();
      if (!r.playback.length) change('listening');
    };
    node.start(start);
  }

  async function start() {
    const r = ref.current;
    if (r.phase !== 'idle' && r.phase !== 'ended') return;
    cleanup(); change('starting'); setMessage(''); setTranscript([]); setSeconds(120);
    const generation = r.generation;
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) throw new Error('Voice is not supported in this browser. You can still read the question explanation.');
      const context = new AudioContext({ sampleRate: 24000 }); r.context = context;
      await context.resume();
      if (!alive(generation)) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      if (!alive(generation)) { stream.getTracks().forEach(track => track.stop()); return; }
      r.stream = stream;
      await context.audioWorklet.addModule('/voice-tutor-recorder.js');
      if (!alive(generation)) return;
      r.abort = new AbortController();
      const response = await fetch('/api/voice-tutor/session', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examId, questionId, optionOrder, questionText, language }), signal: r.abort.signal });
      const session = await response.json();
      if (!alive(generation)) return;
      if (!response.ok) throw new Error(session.error || 'The free pilot is unavailable. Please try again later.');
      r.expiresAt = Math.min(session.expiresAt, Date.now() + 120000);
      const relay = new URL(session.relayUrl);
      if (relay.protocol !== 'wss:' && !(relay.protocol === 'ws:' && ['localhost', '127.0.0.1'].includes(relay.hostname))) throw new Error('A secure voice connection is required.');
      relay.searchParams.set('ticket', session.ticket);
      const socket = new WebSocket(relay.toString()); r.socket = socket;
      const resampler = new StreamingResampler(context.sampleRate, 24000);
      r.input = context.createMediaStreamSource(stream);
      r.recorder = new AudioWorkletNode(context, 'voice-tutor-recorder');
      r.recorder.port.onmessage = (event: MessageEvent<Float32Array>) => {
        if (!alive(generation) || !r.ready || socket.readyState !== WebSocket.OPEN) return;
        if (socket.bufferedAmount > 256000) { end('Your voice connection is too slow. Session ended.'); return; }
        const samples = resampler.push(event.data);
        if (samples.length) socket.send(encodePcm16(samples));
      };
      r.input.connect(r.recorder); r.recorder.connect(context.destination);
      socket.onmessage = event => {
        if (!alive(generation)) return;
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'ready') { r.ready = true; change('listening'); setMessage('Talk naturally. You can interrupt the tiger by speaking. Headphones work best.'); }
          if (data.type === 'speech.started') { stopOutput(); change('listening'); }
          if (data.type === 'audio.delta') queueAudio(data.delta, data.itemId, data.responseId, generation);
          if (data.type === 'response.done' && data.text) setTranscript(t => [...t, { speaker: 'Tiger', text: data.text }].slice(-16));
          if (data.type === 'error') end(data.error || 'Voice connection stopped.');
          if (data.type === 'ended') end(data.reason || 'Your voice session ended.');
        } catch { end('The voice connection could not continue. Your microphone is off.'); }
      };
      socket.onerror = () => { if (alive(generation)) end('Could not connect to the voice tutor. Please try again later.'); };
      socket.onclose = () => { if (alive(generation)) end('The voice connection closed. Your microphone is off.'); };
      stream.getAudioTracks().forEach(track => { track.onended = () => { if (alive(generation)) end('Your microphone disconnected. Session ended.'); }; });
      const connectingAt = Date.now();
      r.timer = setInterval(() => {
        if (!alive(generation)) return;
        const left = Math.max(0, Math.ceil((r.expiresAt - Date.now()) / 1000)); setSeconds(left);
        if (!r.ready && Date.now() - connectingAt > 15000) { end('The voice connection timed out. Please try again later.'); return; }
        if (left === 0) end('Your two-minute session ended. Your microphone is off.');
      }, 250);
    } catch (error) {
      if (alive(generation)) end(error instanceof Error ? error.message : 'Could not start your microphone.');
    }
  }

  const active = phase !== 'idle' && phase !== 'ended';
  return (
    <section aria-label="Tigertest voice tutor" className="rounded-xl border border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Image src="/tiger_face_07.png" alt="" width={48} height={48} />
        <div><h3 className="font-semibold">Ask the tiger</h3><p className="text-sm">Free voice tutor pilot · 2 minutes</p></div>
      </div>
      <p className="text-sm">Talk about this answer in your own words. While connected, your microphone audio is streamed to OpenAI. The voice is AI-generated and AI can make mistakes. Do not share personal information. Tigertest does not store your audio. Free for anyone while our shared $100 pilot budget lasts. The session stops after 30 seconds without speech or after two minutes.</p>
      <div className="flex flex-wrap items-center gap-2">
        {!active && <button type="button" onClick={() => void start()} className="rounded-lg bg-black dark:bg-white text-white dark:text-gray-900 px-4 py-2 font-medium">Start microphone</button>}
        {active && <button type="button" onClick={() => end()} className="rounded-lg border border-current px-4 py-2">End session</button>}
        {phase === 'speaking' && <button type="button" onClick={() => { stopOutput(); if (ref.current.socket?.readyState === WebSocket.OPEN) ref.current.socket.send(JSON.stringify({ type: 'interrupt' })); change('listening'); }} className="rounded-lg border border-current px-4 py-2">Interrupt and speak</button>}
        {active && <span className="text-sm tabular-nums" aria-label={`${seconds} seconds remaining`}>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')} left</span>}
      </div>
      <p role="status" className="text-sm">{phase === 'starting' ? 'Connecting microphone…' : phase === 'listening' ? 'Listening…' : phase === 'speaking' ? 'Tiger is speaking. You can interrupt…' : ''} {message}</p>
      {transcript.length > 0 && <div aria-label="Tutor transcript" className="space-y-3 text-sm max-h-72 overflow-y-auto">
        {transcript.map((turn, i) => <p key={i}><strong>{turn.speaker}:</strong> {turn.text}</p>)}
      </div>}
    </section>
  );
}
