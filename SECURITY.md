# Security Policy

## Supported versions

Tigertest is a hosted web app, so only the current live version is supported. Fixes ship straight to production.

| Component | Supported |
| --- | --- |
| tigertest.io (live site) | :white_check_mark: |
| Tigertest iOS and Android apps (current store release) | :white_check_mark: |
| Older app store releases, forks, self-hosted copies | :x: |

## Reporting a vulnerability

Please do not open a public issue for security problems.

Report privately through GitHub instead: go to the **Security** tab of this repository and click **Report a vulnerability**. Please include:

- what you found and where (URL, API route or file)
- steps to reproduce it
- what an attacker could do with it

### What to expect

- **Acknowledgement** within 3 business days.
- **An assessment** within 10 business days: whether we accept the report, and how severe we think it is.
- **A fix** as soon as practical for accepted reports, usually within 30 days, sooner for anything that exposes user data or payments. We'll keep you updated in the advisory thread.
- **Credit** in the published advisory if you'd like it.

If we decline a report, we'll tell you why.

## Scope

In scope: tigertest.io and its API routes, sign-in and account data, Premium checkout and payment handling, and the mobile apps.

Out of scope: denial of service or load testing, spam or social engineering, findings that need a compromised device or browser, and missing best-practice headers without a working exploit.

## Safe harbor

We won't pursue legal action over good-faith research that follows this policy. Please don't access or change other people's data, and use test accounts you created yourself.
