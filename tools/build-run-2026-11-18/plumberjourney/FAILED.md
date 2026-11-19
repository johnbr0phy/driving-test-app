# plumberjourney: not built (source stop rule)

Exam: US journeyman plumber license exam on the International Plumbing Code (ICC, PSI and
Prometric state and city exams). Checked 2026-11-18.

The brief requires every code figure (slopes, fixture units, pipe sizes, trap arm lengths, vent
sizing, cleanout spacing) to come from IPC text read in this build, with its edition named. No
current IPC text could be read by an automated fetch, and Claude in Chrome was not connected, so
the bank was not written.

## What was tried
- ICC free read, 2024 and 2021 IPC Chapter 7 (https://codes.iccsafe.org/content/IPC2024P1/chapter-7-sanitary-drainage,
  https://codes.iccsafe.org/content/IPC2021P2/chapter-7-sanitary-drainage and the `/s/IPC2021P1/...`
  section pages): HTTP 403 from CloudFront for curl and for the web-fetch agent.
- Wayback Machine snapshot of the 2024 Chapter 7 page (20251010): only the JavaScript shell, no
  code text and no API endpoint in the page.
- Claude in Chrome (to read the free read in a real browser): extension not connected.
- Ohio Administrative Code 4101:3-7-01 and 4101:3-9-01 (codes.ohio.gov, effective 2024 and 2025):
  readable, but they list only Ohio's modifications to the 2021 IPC, not the text.
- Ohio Register full text of the rescinded 4101:3-7-01 (registerofohio.state.oh.us, in force
  until 2024-03-01): readable full text, but it is Ohio's amended code on an older IPC edition
  (many sections "Deleted" or replaced). Using it would assert one state's superseded code as the
  IPC, so it was not used.
- amlegal.com city plumbing codes (Philadelphia, Chicago, NYC; IPC-derived local codes): blocked
  by a Cloudflare challenge, and they are local amended codes in any case.
- ICC exam catalog / plumbing exam bulletins on iccsafe.org: the catalog URLs tried returned 404.
- A full 2024 IPC PDF hosted on a third-party engineering firm's site turned up in search. Not
  downloaded: it looks like an unauthorized copy from an untrusted host, not ICC or a government.

## What would unblock it
- Read the ICC free read in a normal browser (codes.iccsafe.org, IPC 2024, Chapters 3, 4, 6, 7, 9,
  10, 11) with Claude in Chrome connected, or paste the chapter text into the session, and find a
  current ICC or PSI journeyman plumber candidate bulletin for the format. Then rebuild from
  `jelec` as planned (idBase 41100, region US, Premium).
