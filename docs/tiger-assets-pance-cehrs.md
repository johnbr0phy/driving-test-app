# PANCE and CEHRS tiger sets

Reviewed November 16, 2026 against the 18 tests added by PRs #862 and #867.

- PANCE: white clinical coat over blue scrubs, navy stethoscope, patient chart and pen, blank blue badge. Replaces the NCLEX RN badge, which describes the wrong profession.
- CEHRS: dark teal office cardigan, cream shirt, tablet with a medical cross and patient-record lines. Replaces the coding/billing calculator.
- Other sixteen tests retain the suitable existing family artwork. All eight expressions of those families were visually checked for country-specific flags and inappropriate role markings.

Built-in image generation produced each base from the existing NCLEX/CMAA happy reference respectively. Each other expression was an independent identity-preserving edit of the new base. The prompt locks head shape, stripes, ears, muzzle, pose, clothing, paws, props and colors. Expression wording follows `TIGER_ASSET_PROMPTS.md`: crowned winner, confetti celebration, happy, confident closed smile, tentative closed smile with eyes open, neutral flat mouth, closed frown, worried open mouth with sweat. No country flags or readable badges.

All sixteen final exports were visually checked after resizing and palette optimization. Face 05 is tentative with open eyes and closed mouth, not a duplicate laugh. Props and identities remain consistent. Outputs are distinct 512×512 transparent PNGs, under 100 KB each, with transparent outer margins. SHA-256 fixtures pin the reviewed exports.

`lib/tigerAssets.ts` registers the complete sets; `shareImageUrl` refreshes only their share-card cache keys. Existing related exam mappings remain unchanged. No question content, pricing or access behavior changes.
