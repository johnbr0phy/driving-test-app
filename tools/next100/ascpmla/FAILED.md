# ascpmla: FAILED (official content guideline not readable)

Checked 2026-11-15. The stop rule applies: the ASCP BOC Medical Laboratory Assistant, MLA(ASCP),
Examination Content Guideline could not be fetched from ASCP, so no questions were written.

## What was tried

- https://www.ascp.org/content/docs/default-source/boc-pdfs/boc-us-guidelines/mla_content_guideline.pdf?sfvrsn=12
  (the URL search engines index; search snippet says "Revised: May 2021", five content areas):
  HTTP 403 to curl and to WebFetch.
- https://www.ascp.org/boc/docs/default-source/explore-credentials/content-guidelines/ascp_mla_content_guideline.pdf: 403 (WebFetch).
- https://www.ascp.org/boc/explore-credentials/view-all-credentials/mla (credential page, to read
  the guideline link): 403 (WebFetch).
- ASCP's blob content host, which served the PBT, MLT, MLS and MB guidelines
  (https://ascpcontentwebsite.blob.core.windows.net/boccontent/docs/default-source/explore-credentials/content-guidelines/):
  ascp_ascpi_mla_content_guideline.pdf, ascp_mla_content_guideline.pdf, mla_content_guideline.pdf,
  mla-content-guideline.pdf and the old boc-pdfs/boc-us-guidelines/mla_content_guideline.pdf path:
  all 404. ASCP-only credentials on that host carry a GUID suffix in the file name (for example
  ascp_dlm_content_guideline_cfea0236-....pdf), so the MLA file name cannot be guessed.
- https://s3.amazonaws.com/ascpcdn/static/BOC/elinks/MLA_Content_Guideline.pdf: 403.
  (https://s3.amazonaws.com/ascpcdn/static/BOC/elinks/MLA_Eligibility.pdf does load, but it is the
  eligibility sheet, not the outline.)
- Four web searches (standard and extended) for the guideline PDF on ascp.org and the blob host:
  only the 403 ascp.org URL and prep sites came back.
- An archive.org lookup of the ascp.org PDF was refused by the session's permission policy.

## What is known only from non-official sources (not used)

Prep sites describe five areas (patient registration and specimen collection, specimen
preparation and processing, support of clinical testing, waived and point-of-care testing,
laboratory operations) with weights such as 30-35% processing, 20-25% collection, 20-25% clinical
support, 10-15% operations, 5-10% POCT, and a 100-question exam. None of this was confirmed from
ASCP, so nothing was built from it.

## How to unblock

Download the current MLA content guideline in a browser from the ASCP BOC MLA credential page and
put the PDF (or its blob-host URL with the GUID file name) in this folder, then rerun the build
from tools/next100/ascppbt as the template.
