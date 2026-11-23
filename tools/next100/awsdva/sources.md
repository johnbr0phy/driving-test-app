# AWS Certified Developer - Associate (DVA-C03) sources

All items are original, written from AWS's public DVA-C03 exam guide and AWS product documentation. No item is copied or reworded from the AWS Skill Builder official practice question set, the official practice exam, AWS sample questions, any prep provider or any other bank. All pages fetched 2026-11-23.

## Outline
- **AWS Certified Developer - Associate (DVA-C03) exam guide**, AWS documentation, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03.html
  Registration for DVA-C03 opened October 27, 2026; the last day for DVA-C02 is November 30, 2026, so the bank follows DVA-C03. Two response types: multiple choice (one of four) and multiple response (two or more of five or more, all needed for credit). 50 scored plus 15 unscored questions; unanswered is wrong, no penalty for guessing. Pass or fail, scaled 100 to 1,000, minimum 720, compensatory. Domains: 1 Development with AWS Services 30%; 2 Security 26%; 3 Testing and Deployment 22%; 4 Troubleshooting and Optimization 22%. Target candidate: 1 or more years developing and maintaining applications on AWS. Out of scope: designing architectures, designing and creating CI/CD pipelines, administering IAM users and groups, administering servers, selecting FMs and prompt engineering and RAG design, designing AI safety frameworks and governance, designing ETL pipelines, designing networks.
- **Domain 1**, tasks 1.1 to 1.3, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain1.html
  Coupling and decoupling; sync vs async (API Gateway, SQS, EventBridge); retry with backoff, graceful degradation; API transformations and validation; SDKs; streaming; serialization; event-driven patterns (EventBridge, S3 Event Notifications, SQS, SNS); AI-assisted development tools; managed AI services. Lambda in VPCs; configuration (memory, concurrency, timeout, runtime, handler, layers, extensions, environment variables); destinations and dead-letter queues; event source mappings. Data lifecycles (S3 Lifecycle, TTL, retention); choosing data stores by access pattern; caching; DynamoDB keys, consistency, Query and Scan, indexes.
- **Domain 2**, tasks 2.1 to 2.3, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain2.html
  Federation; access control (fine-grained permissions, tokens, MFA); programmatic access; presigned URLs (S3 and CloudFront); authenticated calls; IAM permissions; assuming roles. Encryption at rest and in transit; ACM and Private CA; client-side vs server-side; data keys; development certificates and SSH keys; PII and PHI; secret management. AI services: request and manage access; private connectivity and no training on inputs; filtering inputs and outputs (content filtering, PII/PHI redaction, denied topics, prompt injection protection); securing agents (tool-use authorization, session isolation, human-in-the-loop approval); protecting sensitive content in logs.
- **Domain 3**, tasks 3.1 to 3.3, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain3.html
  Dependencies; container images (ECR, tags, lifecycle policies); code repositories; environment configuration (AppConfig, Parameter Store, Secrets Manager, API Gateway, Lambda); API Gateway stages and endpoints. Tests with SAM, CDK, CloudFormation; mock APIs; test events; environments (Lambda aliases, image tags, Amplify branches, Copilot environments, API Gateway); AI-generated tests. Lambda packaging (.zip, images, layers); ECS task definitions, EKS manifests, Fargate, rolling updates; IaC templates; CodeDeploy; CodePipeline; blue/green, canary, rolling; rollback; source control labels and branches; AI tools in CI/CD.
- **Domain 4**, tasks 4.1 to 4.3, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/developer-associate-03-domain4.html
  Debugging; metrics, logs, traces; querying logs; deployment failures; AI troubleshooting. Structured logging; custom metrics; notifications; tracing; health checks, liveness and readiness probes. Concurrency (provisioned concurrency, Auto Scaling, thread and connection pools); memory and compute; messaging (SQS, SNS fan-out); caching (ElastiCache, DAX, CloudFront); bottlenecks with CloudWatch; AI optimization.
- **In-scope services**, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/dva-03-in-scope-services.html
  Includes Athena, Data Firehose, Kinesis, OpenSearch Service, EventBridge, SNS, SQS, Step Functions, EC2, Elastic Beanstalk, Lambda, ECR, ECS, EKS, Aurora, DynamoDB, ElastiCache, RDS, Amplify, CloudShell, CodeArtifact, CodeBuild, CodeDeploy, CodePipeline, X-Ray, Bedrock, Bedrock AgentCore, Amazon Quick, Kiro, AppConfig, CDK, CloudFormation, CloudTrail, CloudWatch, CloudWatch Logs, CLI, SAM, Systems Manager, API Gateway, CloudFront, ELB, PrivateLink, Route 53, VPC, ACM, Cognito, IAM, KMS, Private CA, Secrets Manager, STS, WAF, EBS, EFS, S3, S3 Glacier.
- **Out-of-scope services**, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/dva-03-out-of-scope-services.html
  Includes Polly, Rekognition, SageMaker AI and Strands Agents, Shield, Snow Family, Storage Gateway. No item keys on these.
- **Comparison of DVA-C02 and DVA-C03**, fetched 2026-11-23. https://docs.aws.amazon.com/aws-certification/latest/developer-associate-03/dva-03-comparison.html
  DVA-C02 in use until November 30, 2026; DVA-C03 from December 1, 2026. Weights moved from 32/26/24/18 to 30/26/22/22. New task 2.3 on AI security; AI tool skills added in 1.1, 3.2, 3.3, 4.1, 4.3; presigned URLs, container images and container orchestration added.

## Format and status
- **AWS Certified Developer - Associate** certification page, fetched 2026-11-23. https://aws.amazon.com/certification/certified-developer-associate/
  65 questions, multiple choice or multiple response, 130 minutes, 150 USD, Pearson VUE test center or online proctored, English, Japanese, Korean, Portuguese (Brazil), Simplified Chinese and Spanish (Latin America), valid 3 years.

## Product docs used for facts
- **Lambda quotas**, fetched 2026-11-23. https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html
  Memory 128 to 10,240 MB, CPU in proportion to memory; 4 KB of environment variables in aggregate; 5 layers; 6 MB synchronous payload; 250 MB unzipped package, 10 GB container image; 1,000 default concurrent executions per Region. The timeout and async payload limits changed in 2026 (timeout now up to 30 minutes, async payload 1 MB), so no item asks a timeout or async payload number.
- **Capturing records of Lambda asynchronous invocations**, fetched 2026-11-23. https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html
  On-success and on-failure destinations (SQS, SNS, S3 on failure only, Lambda, EventBridge) with the response in the record; DLQs (standard SQS or SNS) get only the event content; DLQ set only at function level; FIFO targets not supported; with SQS as an event source, configure the DLQ on the queue.
- **Lambda SnapStart**, fetched 2026-11-23. https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html
  Java 11+, Python 3.12+, .NET 8+; published versions only; not with provisioned concurrency, EFS or ephemeral storage over 512 MB; uniqueness must be generated after initialization.
- **DynamoDB read and write operations**, fetched 2026-11-23. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/read-write-operations.html
  Strongly consistent read of up to 4 KB = 1 RCU, eventually consistent = half, transactional = 2; reads rounded to 4 KB; one WCU per 1 KB write, transactional 2; Scan reads all items evaluated; conditional writes that fail still consume WCU.
- **DynamoDB global secondary indexes**, fetched 2026-11-23. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html
  GSI key schema can differ from the table; eventually consistent reads only; separate provisioned throughput, and low GSI write capacity throttles table writes; projections KEYS_ONLY, INCLUDE, ALL; items without the index key are not in the index.
- **SQS visibility timeout**, fetched 2026-11-23. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
  Default 30 seconds; ChangeMessageVisibility to extend or set to 0 to release; 12-hour maximum from first receive; heartbeat pattern for variable jobs.
- **SQS short and long polling**, fetched 2026-11-23. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html
  Short polling samples a subset of servers; long polling queries all servers, maximum wait 20 seconds.
- **KMS data keys**, fetched 2026-11-23. https://docs.aws.amazon.com/kms/latest/developerguide/data-keys.html
  GenerateDataKey returns plaintext and encrypted copies; GenerateDataKeyWithoutPlaintext only the encrypted copy; data keys used outside KMS; store the encrypted key with the data; Decrypt returns the plaintext key.
- **Common Amazon Cognito scenarios**, fetched 2026-11-23. https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-scenarios.html
  User pools are directories with sign-in and federation; identity pools give temporary AWS credentials, including for guests; groups appear in the ID token; machine-to-machine apps use the client credentials grant and get only an access token.
- **S3 presigned URLs**, fetched 2026-11-23. https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
  Carry the signer's permissions; up to 7 days with IAM user credentials and SigV4; a URL signed with temporary credentials ends when they expire; console limit 1 minute to 12 hours; can be used many times until expiry; PUT presigned URLs upload without the uploader having credentials.
- **CodeDeploy deployment configurations**, fetched 2026-11-23. https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
  Lambda and ECS canary (for example 10 percent then the rest after N minutes), linear (10 percent every N minutes) and all-at-once; EC2 OneAtATime (default), HalfAtATime, AllAtOnce.
- **AppSpec hooks**, fetched 2026-11-23. https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html
  Lambda hooks BeforeAllowTraffic and AfterAllowTraffic run validation Lambda functions that report with PutLifecycleEventHookExecutionStatus; EC2 hooks ApplicationStop, BeforeInstall, AfterInstall, ApplicationStart, ValidateService and traffic hooks; DownloadBundle, Install, BlockTraffic and AllowTraffic cannot run scripts; ApplicationStop does not run on the first deployment to an instance.
- **API Gateway mock integrations**, fetched 2026-11-23. https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-mock-integration.html
  Responses generated by API Gateway with no backend, set by integration request and response mapping templates; used to unblock dependent teams.
- **API Gateway stage variables**, fetched 2026-11-23. https://docs.aws.amazon.com/apigateway/latest/developerguide/stage-variables.html
  Key-value pairs per stage, ${stageVariables.name}; point stages at different backends or Lambda functions (permission added manually); not for credentials.
- **API Gateway caching**, fetched 2026-11-23. https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html
  Per stage; default TTL 300 seconds, maximum 3600, 0 disables; only GET cached by default; cache keys from parameters; clients invalidate with Cache-Control: max-age=0 when authorized (execute-api:InvalidateCache); flush stage cache.
- **Step Functions workflow types**, fetched 2026-11-23. https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html
  Standard up to one year, exactly-once, billed per state transition; Express up to five minutes, at-least-once (async) or at-most-once (sync), billed by executions, duration and memory; type cannot change.
- **Embedding metrics within logs (EMF)**, fetched 2026-11-23. https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Embedded_Metric_Format.html
  Custom metrics extracted from structured logs, needs logs:PutLogEvents but not cloudwatch:PutMetricData; useful on Lambda; high-cardinality dimensions such as requestId create a metric per value.
- **CloudWatch Logs data protection**, fetched 2026-11-23. https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html
  Data protection policies audit and mask sensitive data at ingestion; only principals with logs:Unmask see it; events ingested before the policy are not masked.
- **What is AWS X-Ray?**, fetched 2026-11-23. https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
  Traces requests and downstream calls; SDKs send segments to the daemon over UDP; trace map shows services and bottlenecks; Lambda integration.
- **Parameter Store**, fetched 2026-11-23. https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html
  String, StringList, SecureString (KMS); hierarchies; 100 versions; no rotation, AWS recommends Secrets Manager for secrets; AppConfig for gradual rollout, validation and rollback on CloudWatch alarms; ECS env values resolved at task start.
- **Rotate Secrets Manager secrets**, fetched 2026-11-23. https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
  Managed rotation for managed secrets, rotation by Lambda function for others.
- **Amazon Bedrock data protection**, fetched 2026-11-23. https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html
  Model providers have no access to Bedrock logs or customer prompts and completions; TLS; PrivateLink and VPC.
- **Bedrock model access**, fetched 2026-11-23. https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html
  Access to many models is enabled on first use with the right AWS Marketplace permissions; block a model with a Deny on bedrock actions for its ARN in IAM or an SCP; denying aws-marketplace:Subscribe alone does not block the first invocation.
- **Bedrock model invocation logging**, fetched 2026-11-23. https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html
  Off by default; captures full request and response bodies to CloudWatch Logs or S3 in the same account and Region.
- **Amazon Bedrock Guardrails**, fetched 2026-11-23. https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html
  Content filters including the Prompt Attack category, denied topics, word filters, sensitive information filters (block or mask, regex), contextual grounding, Automated Reasoning checks; ApplyGuardrail without invoking a model; guardrail ID and version on the inference call; input tags to evaluate only user input.
- **Amazon Bedrock AgentCore overview**, fetched 2026-11-23. https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html
  Runtime with session isolation; Identity with existing IdPs; Gateway turns APIs and Lambda functions into MCP tools; Policy intercepts every tool call through Gateway with Cedar-compatible rules; Observability on OpenTelemetry; Memory short and long term.
- **Kiro documentation**, fetched 2026-11-23. https://kiro.dev/docs/
  Specs, steering, hooks (on file changes, tool use or task completion), MCP, chat in IDE and CLI.
- **Kiro specs**, fetched 2026-11-23. https://kiro.dev/docs/specs/
  Feature specs produce requirements.md, design.md and tasks.md; bugfix specs; property-based correctness checks; tasks run individually or in dependency-ordered waves.

- **AWS X-Ray concepts**, fetched 2026-11-23. https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html
  Segments and subsegments; sampling (default first request each second plus 5 percent); annotations are indexed key-value pairs for filter expressions, metadata is not indexed; errors 4xx, faults 5xx, throttles 429; X-Amzn-Trace-Id header.
- **Rotate AWS KMS keys**, fetched 2026-11-23. https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html
  Rotation changes only the key material; key ID, ARN and policy stay; old ciphertext is not re-encrypted and decrypts with its original material; data keys are not rotated.
- **What's in a Secrets Manager secret**, fetched 2026-11-23. https://docs.aws.amazon.com/secretsmanager/latest/userguide/whats-in-a-secret.html
  Staging labels AWSCURRENT (returned by default), AWSPREVIOUS, AWSPENDING during rotation.
- **Elastic Beanstalk deployments**, fetched 2026-11-23. https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html
  All at once, rolling, rolling with an additional batch, immutable (new Auto Scaling group, old kept until healthy), traffic splitting; blue/green by CNAME swap.
- **Handling errors for an SQS event source in Lambda**, fetched 2026-11-23. https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html
  By default a failed batch returns every message; ReportBatchItemFailures with batchItemFailures makes only failed messages visible again.
- **Cognito access token**, fetched 2026-11-23. https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html
  Access token carries scope and cognito:groups and authorizes API operations; M2M tokens have no username or groups.

## Not confirmed or left out
- Prices, quotas that changed in 2026 (Lambda timeout, async payload, SQS message size) and per-request rates are not asked. Exam fees appear only on the landing.
- AWS tools that are not on the in-scope list (Amazon Q Developer, CodeGuru, Amazon Comprehend, Amazon Macie) are never keyed. The bank's AI-tool items use Kiro, Bedrock, Bedrock AgentCore and CloudWatch.
- X-Ray SDK version or support-date facts are not asked.
- Ordering, matching and case study items: the guide lists only multiple choice and multiple response, so the bank uses those two.
