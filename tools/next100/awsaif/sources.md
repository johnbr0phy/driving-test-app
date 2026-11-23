# AWS Certified AI Practitioner (AIF-C01) sources

All items are original, written from AWS's public AIF-C01 exam guide and AWS product documentation. No item is copied or reworded from the AWS Skill Builder official practice question set, the official practice exam, AWS sample questions, any prep provider or any other bank. All pages fetched 2026-11-22.

## Outline
- **AWS Certified AI Practitioner (AIF-C01) exam guide**, AWS documentation, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html
  Two response types: multiple choice (one correct of four) and multiple response (two or more correct of five or more). 50 scored questions plus 15 unscored. No penalty for guessing. Pass or fail, scaled 100 to 1,000, minimum 700, compensatory scoring. Domains: 1 Fundamentals of AI and ML 20%; 2 Fundamentals of GenAI 24%; 3 Applications of Foundation Models 28%; 4 Guidelines for Responsible AI 14%; 5 Security, Compliance, and Governance for AI Solutions 14%. Target candidate: up to 6 months of exposure to AI/ML on AWS, uses but does not build AI/ML solutions; out of scope: coding models, data or feature engineering, hyperparameter tuning, building pipelines, statistical analysis, implementing security protocols or governance frameworks.
- **Domain 1** task statements 1.1 to 1.3, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html
  Terms (AI, ML, deep learning, neural networks, CV, NLP, bias, fairness, fit, LLM, GenAI, agentic AI); batch, real-time, asynchronous and serverless inferencing; data types; supervised, unsupervised, reinforcement learning; when AI is not appropriate; regression, classification, clustering; SageMaker AI, Transcribe, Translate, Comprehend, Lex, Polly; traditional ML vs FMs; pipeline components; model sources; managed vs self-hosted API; Bedrock, Amazon Quick, Kiro, SageMaker AI by pipeline stage; MLOps; accuracy, precision, recall, F1 and business metrics.
- **Domain 2** task statements 2.1 to 2.3, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html
  Tokens, chunking, embeddings, vectors, transformers, FMs, multimodal and diffusion models; FM lifecycle; token pricing; context engineering; agentic concepts (multi-agent patterns, MCP, memory, tools, orchestration); advantages and disadvantages (hallucination, nondeterminism); model selection factors; business metrics; Bedrock, SageMaker AI, JumpStart, Amazon Quick, Kiro, Strands Agents, Bedrock AgentCore; cost tradeoffs including provisioned throughput and custom models.
- **Domain 3** task statements 3.1 to 3.4, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html
  FM selection (including prompt caching); temperature and length; RAG and Bedrock Knowledge Bases; vector stores (OpenSearch Service, Aurora, Neptune, RDS for PostgreSQL); customization cost tradeoffs (pre-training, fine-tuning, in-context learning, RAG, distillation); AI agents; prompt constructs and techniques (chain-of-thought, zero-, single-, few-shot, templates); risks (exposure, poisoning, hijacking, jailbreaking); Bedrock Prompt Management; continued pre-training, instruction tuning, transfer learning, data preparation, RLHF; human evaluation, benchmark datasets, Bedrock Model Evaluation, ROUGE, BLEU, BERTScore, LLM-as-a-judge; evaluating RAG, agents and workflows; task completion rate, cost per interaction.
- **Domain 4** task statements 4.1 and 4.2, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html
  Bias, fairness, inclusivity, robustness, safety, veracity; Bedrock Guardrails; sustainability in model choice; legal risks (IP, biased output, trust, hallucination); dataset characteristics; bias and variance, overfitting and underfitting; label quality, human audits, subgroup analysis; transparent vs opaque models; SageMaker Model Cards, Bedrock Model Evaluations, open source models and licensing; safety vs transparency tradeoffs; human-centered design.
- **Domain 5** task statements 5.1 and 5.2, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html
  IAM, encryption, Macie, PrivateLink, shared responsibility, AgentCore Identity, Policy in AgentCore, Guardrails; data lineage and cataloging; privacy-enhancing technologies; prompt injection, data leakage, output filtering, audit logging, toxicity; hallucination detection and grounding; AWS Config, Inspector, Artifact, CloudTrail, Trusted Advisor; data residency, retention, monitoring; review cadence, Generative AI Security Scoping Matrix, team training.
- **In-scope AWS services**, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-in-scope-services.html
  Machine learning: Bedrock, Bedrock AgentCore, Comprehend, Lex, Nova, Personalize, Polly, Rekognition, SageMaker AI, SageMaker JumpStart, Textract, Transcribe, Translate, AWS Transform; developer tools Kiro and Strands Agents; analytics including Amazon Quick, OpenSearch Service, Glue, Lake Formation; governance CloudTrail, CloudWatch, Config, Trusted Advisor, Well-Architected Tool; security Artifact, IAM, Inspector, KMS, Macie, Secrets Manager.
- **Revisions**, fetched 2026-11-22. https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html
  Versions 1.0 (March 26, 2026), 1.1 (April 30, 2026), 1.2 (October 29, 2026). Updates reach the exam about one month after publication, so the bank follows version 1.2.

## Format and status
- **AWS Certified AI Practitioner** certification page, fetched 2026-11-22. https://aws.amazon.com/certification/certified-ai-practitioner/
  90 minutes, 65 questions, 100 USD, Pearson VUE test center or online proctored, 12 languages (Italian and German versions retired after October 15, 2026), valid 3 years. No successor exam announced.

## Product docs used for facts
- **What is Amazon Bedrock AgentCore?**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
  Works with any framework and model; Runtime (serverless, session isolation), Memory (short and long term), Gateway (APIs and Lambda into MCP tools), Identity (works with existing IdPs), Code Interpreter, Browser, Observability (OpenTelemetry), Evaluations, Policy (deterministic rules on tool calls through Gateway, Cedar-compatible), Registry.
- **Amazon Bedrock Guardrails**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
  Content filters (hate, insults, sexual, violence, misconduct, prompt attack), denied topics, word filters, sensitive information filters (block or mask PII, regex), contextual grounding checks, Automated Reasoning checks; ApplyGuardrail API without invoking a model.
- **Amazon Bedrock Knowledge Bases**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
  RAG over proprietary data, citations in responses, managed and customer-managed knowledge bases, vector stores such as OpenSearch Serverless, Aurora and Neptune, reranking.
- **Prompt management in Amazon Bedrock**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html
  Reusable prompts with variables, variants compared side by side, saved versions deployed to applications or flows.
- **Amazon Bedrock evaluations**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html
  Programmatic jobs with built-in or custom prompt datasets, human worker jobs, judge-model (LLM-as-a-judge) jobs, RAG evaluations with ground truth.
- **Provisioned Throughput in Amazon Bedrock**, fetched 2026-11-22. https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html
  Fixed hourly cost in model units; no commitment, 1-month or 6-month terms, longer term cheaper.
- **Set up inference for a custom model (Amazon Bedrock)**, fetched 2026-11-22 by the reviewer. https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-use.html
  A custom model is served either through purchased Provisioned Throughput or through a custom model deployment for on-demand inference, paying only for what is used. So Provisioned Throughput is no longer required for every custom model; the bank keys this.
- **Deploy models for inference (SageMaker AI)**, fetched 2026-11-22. https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html
  Real-time for interactive low latency; serverless for idle periods that tolerate cold starts; asynchronous queues requests with payloads up to 1 GB and up to one hour of processing; JumpStart for low-code deployment of pre-trained models.
- **Amazon SageMaker Model Cards**, fetched 2026-11-22. https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html
  Intended uses, risk rating (unknown, low, medium, high), training details, evaluation results; export to PDF; edits create new versions.
- **SageMaker Clarify**, fetched 2026-11-22. https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-configure-processing-jobs.html
  No longer open to new customers and not in the AIF-C01 in-scope list, so no item keys on Clarify; used only for background on pre- and post-training bias and Shapley feature attribution.
- **Generative AI Security Scoping Matrix**, fetched 2026-11-22. https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/
  Scopes 1 consumer app, 2 enterprise app, 3 pre-trained models, 4 fine-tuned models, 5 self-trained models; disciplines governance and compliance, legal and privacy, risk management, controls, resilience.
- **Kiro**, fetched 2026-11-22. https://kiro.dev/
  Agentic development environment (IDE, CLI) with spec-driven development, hooks and steering, MCP support.
- **Strands Agents**, fetched 2026-11-22. https://strandsagents.com/
  Open source (Apache) SDK in Python and TypeScript, model-driven agent loop, MCP tools, multi-agent patterns (agents as tools, swarm, graph, workflow), deploys to containers, serverless or AgentCore.
- **Amazon Quick**, fetched 2026-11-22. https://aws.amazon.com/quick/
  AI workspace for business users: chat, research, dashboards, flows and agents over company data with connectors. The product page calls it AWS Quick; the exam guide calls it Amazon Quick, which the bank uses. Few items touch it, and none on its tiers or features beyond that.

## Not confirmed or left out
- Prices, quotas and per-token rates (change often). Exam fees appear only on the landing.
- SageMaker Clarify (closed to new customers), Amazon Q Developer and Amazon Q Business (not in the in-scope list) are not keyed.
- Ordering, matching and case study items: the current guide lists only multiple choice and multiple response, so the bank uses those two.
