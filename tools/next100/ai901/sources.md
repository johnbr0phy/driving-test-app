# AI-901 sources

All 198 items are original, written from Microsoft's public AI-901 study guide and Microsoft Learn product documentation. No item is copied from Microsoft's practice assessment (AI Skills Navigator), the exam sandbox, any prep provider or any other bank. All pages fetched 2026-11-19.

## Outline
- **Study guide for Exam AI-901: Microsoft Azure AI Fundamentals**, Microsoft Learn, "Skills measured as of April 15, 2026" (page ms.date 2026-03-31, updated 2026-07-14), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901
  Skills at a glance: Identify AI concepts and capabilities 40-45%; Implement AI solutions by using Microsoft Foundry 55-60%. Sub-areas: Describe principles of responsible AI (fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability); Identify AI model components and configurations; Identify AI workloads; Implement generative AI apps and agents by using Foundry; Implement AI solutions for text and speech by using Foundry; Implement AI solutions with computer vision and image-generation capabilities by using Foundry; Implement AI solutions for information extraction by using Foundry. Audience: beginning AI solution developers with knowledge of Python syntax and Azure resources. Passing score 700. Most questions on GA features; preview features may appear if commonly used.

## Format and status
- **Exam AI-901: Microsoft Azure AI Fundamentals**, exam page (updated 2026-08-05), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-901/
  Passing score 700; English version updated April 15, 2026, localized versions about eight weeks later; 13 languages (English, Arabic (Saudi Arabia), Chinese Simplified, Chinese Traditional, French, German, Indonesian, Italian, Japanese, Korean, Portuguese (Brazil), Russian, Spanish); "Retirement date: none"; price by country; part of the requirements for Microsoft Certified: Azure AI Fundamentals.
- **Exam AI-900** page (hidden, noindex, updated 2026-06-30), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-900/
  Warning: "The AI-900 exam was retired on June 30, 2026, and has been replaced by AI-901. To earn this certification, candidates must now pass AI-901."
- **Microsoft Certified: Azure AI Fundamentals** certification page (updated 2026-07-14), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/
  Required exams: AI-901. Certification updated April 15, 2026.
- **Exam duration and exam experience**, Microsoft Learn (updated 2026-06-04), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience
  Fundamentals exams: 45 minutes exam time, 65 minutes seat time. "Most Microsoft Certification exams typically contain between 40-60 questions." Microsoft Learn is not available during fundamentals exams. Question types are not identified in advance; the sandbox shows build list, case studies, drag and drop, hot area and multiple choice.
- **Course AI-901T00-A: Introduction to AI in Azure** (updated 2026-06-17), fetched 2026-11-19. https://learn.microsoft.com/en-us/training/courses/ai-901t00
  One-day instructor-led course for the certification (used for the teacher-led note).
- Question count: Microsoft publishes none for AI-901. Tigertest's tests are 50 in 45 minutes, inside Microsoft's 40 to 60.

## Product docs used for facts (Microsoft Learn)
- "What is Microsoft Foundry?" (ms.date 2026-08-13, updated 2026-09-24): agents, more than 10,000 models, toolboxes, portal, SDKs, azd; evolution table (Azure AI Studio / Azure AI Foundry to Microsoft Foundry; Azure AI Services to Foundry Tools; hub + Azure OpenAI + Azure AI Services to a single Foundry resource with projects; Assistants API to Responses API; azure-ai-projects 2.x unified client). https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry
- "What is Microsoft Foundry Agent Service?" (ms.date 2026-10-26, updated 2026-11-17): prompt agents, voice-based prompt agents (Voice Live, WebSocket), hosted agents (Agent Framework, LangGraph and others), Responses API ephemeral agents, tools (web search, file search, code interpreter, memory, functions, OpenAPI, MCP), toolboxes, lifecycle (create, test in playground, trace, evaluate, optimize, publish, monitor), versioning and rollback, publishing to Teams, Copilot and the Entra Agent Registry, Entra agent identity, native speech-to-speech vs cascaded voice designs, models such as GPT-4o, Llama and DeepSeek. https://learn.microsoft.com/en-us/azure/foundry/agents/overview
- "Quickstart: Get started with Microsoft Foundry SDK" (ms.date 2026-09-03, updated 2026-10-19): pip install azure-ai-projects>=2.3.0, DefaultAzureCredential after az login, project endpoint format https://<resource-name>.services.ai.azure.com/api/projects/<project-name>, AIProjectClient, get_openai_client(), responses.create(model=..., input=...), output_text, agents.create_version with PromptAgentDefinition, get_openai_client(agent_name=...), conversations.create() and conversation=conversation.id. https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code
- "Understanding deployment types in Microsoft Foundry Models" (ms.date 2026-08-06, updated 2026-08-12): start with Global Standard; Global, Data Zone (US, EU, APAC) and Standard (Azure geography) processing; provisioned PTUs and lower latency variance; Global and Data Zone Batch at 50% less with a 24-hour target; Developer for fine-tuned model evaluation, 24-hour lifetime, no SLA or residency guarantee; instant access (preview). https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/deployment-types
- "Prompt engineering techniques" (ms.date 2026-05-13, updated 2026-06-05): next-token prediction, tokens, instructions, primary and supporting content, zero-shot, one-shot and few-shot, cues and priming the output, recency bias and repeating instructions, clear syntax (Markdown, XML, separators), breaking the task down, chain of thought, citations and output structure, temperature 0 to 2 (lower for legal documents), top_p, change one at a time, grounding context, giving the model an out, techniques not recommended for reasoning models like gpt-5 and o-series. https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
- "Guardrails and controls overview in Microsoft Foundry" (ms.date 2026-11-02, updated 2026-11-17): intervention points (user input, tool call, tool response, output), risks (hate, sexual, self-harm, violence, prompt attacks, protected material), blocking levels, Microsoft.DefaultV2, annotate and block. https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview
- "What is Responsible AI" (Azure Machine Learning, ms.date 2026-09-07, updated 2026-10-19): the six principles of Microsoft's Responsible AI Standard and their descriptions (similar people treated alike; operate reliably and resist manipulation; interpretability; privacy laws and consumer controls, encryption and access restriction; people accountable, AI not the final authority). https://learn.microsoft.com/en-us/azure/machine-learning/concept-responsible-ai
- "What is Azure Language in Foundry Tools" (ms.date 2026-07-21, updated 2026-07-22): PII detection, language detection, prebuilt and custom NER, text analytics for health; legacy CLU, custom text classification, entity linking (Wikipedia), key phrase extraction, orchestration workflow, question answering, sentiment analysis and opinion mining, extractive and abstractive summarization; Azure Language MCP server; Docker containers. https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview
- "What Is Azure Speech?" (ms.date 2026-10-02, updated 2026-11-02): Azure Speech in Foundry Tools; real-time, fast and batch transcription; custom speech; neural voices, SSML, standard and custom voice; text to speech avatar; speech translation; language identification; pronunciation assessment; Voice Live; containers; Speech SDK, Speech CLI, REST; Teams captioning, Office dictation, Edge Read Aloud. https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview
- "What is Azure Content Understanding in Foundry Tools?" (ms.date 2026-10-29, updated 2026-10-30): documents, images, video and audio; analyzers (prebuilt industry and custom); content extraction (OCR, layout); segmentation (enableSegment); field extraction (Extract documents only, Classify, Generate); confidence 0 to 1 and grounding (estimateFieldSourceAndConfidence); Markdown or JSON output; classification; Content Understanding Studio; inherited guardrails; bring your own model deployments; GA API 2025-11-01. https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview
- "How to use image generation models from OpenAI" (ms.date 2026-04-17): DALL-E 3 retired March 4, 2026; gpt-image series; generate and edit with a PNG mask matching the input dimensions; size, quality, n 1 to 10, output_format png or jpeg (no WEBP); base64 only; 5 images a minute default; content_policy_violation; Images playground; prefer Microsoft Entra ID over keys. https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/dall-e
- "How to use vision-enabled chat models" (ms.date 2026-07-29, updated 2026-07-31): text and image content parts, public URL or base64 data URL, 10 images per chat request, JPEG, PNG, GIF (first frame) and WEBP, public URLs only (no private endpoints), detail low (512x512), high and auto, set max tokens or the output is cut off. https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision

## Left out on purpose
- No prices, quotas other than the documented image default, or SLA figures.
- Preview-only features (agent optimizer, instant access, Content Understanding agentic mode) are mentioned only where Microsoft documents them as preview, and never as the key of a required fact.
- No retake policy for AI-901 (not read on an AI-901 page).
- Hands-on labs and interactive item types other than yes/no sets, matching and multiple response are not modelled.

## Blueprint (per 50-item test)
| Domain key | Study-guide sub-area | Per test | Drill-only | Pool |
|---|---|---|---|---|
| ai901Rai | Describe principles of responsible AI | 6 | 12 | 24 |
| ai901Models | Identify AI model components and configurations | 7 | 13 | 27 |
| ai901Workloads | Identify AI workloads | 8 | 12 | 28 |
| ai901GenApps | Generative AI apps (prompts, deploying, SDK chat client) | 8 | 12 | 28 |
| ai901Agents | Agents (single-agent solution, client app for an agent) | 7 | 12 | 26 |
| ai901TextSpeech | Text and speech | 5 | 13 | 23 |
| ai901Vision | Computer vision and image generation | 4 | 12 | 20 |
| ai901Extract | Information extraction with Content Understanding | 5 | 12 | 22 |

Concepts 21/50 (42%), Foundry 29/50 (58%). The split inside each area is Tigertest's.

## Formats
Single (148), multi "Choose two" (12), yes/no statement sets as `matrix` with columns Yes/No (balanced 42 Yes rows, 42 No rows), matching as `matrix`.

## Overlap check
Stems and key-answer pairs checked against the az900, sc900, sc200 and gcdl banks on disk; none repeats a fact and answer.
