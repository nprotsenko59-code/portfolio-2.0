---
status: awaiting_human_verify
trigger: "I still see old ones there"
created: 2026-08-25T17:52:17Z
updated: 2026-08-25T17:57:48Z
---

## Current Focus

hypothesis: Twelve refreshed Payment Installments binaries are displayed through next/image under unchanged src strings, so Next.js can continue serving stale optimized responses because that cache has no invalidation mechanism.
test: User verifies the deployed or local Payment Installments case now displays the re-uploaded visuals.
expecting: A fresh page load shows the new assets throughout the case with no old images remaining.
next_action: Await user confirmation after opening /work/guesty-installments in the real workflow/environment.
reasoning_checkpoint:
  hypothesis: "Twelve refreshed Payment Installments binaries are displayed through next/image under unchanged src strings, causing stale optimized responses because Next.js has no image-cache invalidation mechanism."
  confirming_evidence:
    - "SHA-256 comparisons prove all twelve binaries changed in d3f5147 while their src strings remained identical."
    - "The installed Next.js 16 documentation states that optimized-image caches cannot be invalidated and recommends changing src."
    - "CaseStudy.tsx and CasePlaceholder.tsx pass those unchanged strings to next/image."
  falsification_test: "If a production build after source versioning still emits optimizer requests containing the old payment-installments paths, the hypothesis or implementation is wrong."
  fix_rationale: "Changing the public source URLs changes the optimizer request keys, directly bypassing stale entries without weakening global caching behavior."
  blind_spots: "The deployed CDN and the user's browser cannot be inspected from this local workspace; end-to-end confirmation requires a deployment and user check."
reasoning_checkpoint: null
tdd_checkpoint: null

## Symptoms

expected: The Payment Installments case should display the newly re-uploaded images.
actual: The website still displays the old Payment Installments images.
errors: No error message reported.
reproduction: Open the Payment Installments case after the refreshed asset commit and view its images.
started: Immediately after reconnecting the re-uploaded assets under their previous public filenames.

## Eliminated

## Evidence

- timestamp: 2026-08-25T17:52:17Z
  checked: Commit d3f5147 and current image references.
  found: Most refreshed binaries replaced files at the exact same public URLs used by the previous images.
  implication: Existing optimized-image and CDN cache keys can still resolve to old image content.

- timestamp: 2026-08-25T17:54:42Z
  checked: Installed Next.js 16 Image component documentation, minimumCacheTTL section.
  found: Next.js states optimized-image caches have no invalidation mechanism and recommends changing the src or deleting the image cache; the default minimum cache TTL is four hours.
  implication: Replacing a public file while keeping its src string is insufficient to guarantee clients receive the new optimized image.

- timestamp: 2026-08-25T17:54:42Z
  checked: Payment Installments references before and after d3f5147.
  found: Twelve refreshed visuals retained their previous src strings; only entry-point-open.jpg was a genuinely new URL, while payment-cycle.jpg was removed.
  implication: The user's observation is consistent with stale optimized responses for every retained URL, not with missing replacement binaries.

- timestamp: 2026-08-25T17:56:05Z
  checked: Initial post-fix reference-integrity shell check.
  found: The check treated all newline-separated references as one path because zsh does not split unquoted scalar expansions on newlines; the build did not start.
  implication: The verification harness must iterate references line by line; this result does not indicate a missing application asset.

- timestamp: 2026-08-25T17:56:14Z
  checked: Corrected reference-integrity check and npm run build.
  found: All 13 active Payment Installments references resolve to files, zero old root-level source paths remain in active code, and Next.js 16.2.6 completed the production build and static generation successfully.
  implication: The versioned source update is internally consistent and introduces no build or type regression.

- timestamp: 2026-08-25T17:57:01Z
  checked: Built artifacts and locally served /work/guesty-installments route.
  found: Seven built artifacts contain the versioned directory and none contain old active paths; the served page contains versioned paths only, the new raw and optimized first-screen URLs return HTTP 200, and the old raw URL returns 404.
  implication: The shipped page will request fresh image-optimizer keys and cannot fall back to the deleted root-level source URLs.

- timestamp: 2026-08-25T17:57:35Z
  checked: Final scoped diff and git diff --check.
  found: Diff validation passed, but npm run build regenerated next-env.d.ts from the development route-types path to the production route-types path.
  implication: This unrelated generated-file change must be restored before handoff; intended source and asset changes are otherwise clean.

- timestamp: 2026-08-25T17:57:48Z
  checked: Post-restoration workspace diff.
  found: next-env.d.ts matches HEAD, git diff --check passes, and the remaining implementation consists only of two source-reference files plus thirteen exact asset renames into the versioned directory.
  implication: The fix is minimal, scoped, and ready for end-to-end human verification.

## Resolution

root_cause: Twelve re-uploaded Payment Installments images replaced binaries at unchanged public src paths. They are rendered by next/image, whose optimized-image cache has no invalidation mechanism, so stale optimized responses can continue to be served for those same URLs.
fix: Moved all thirteen refreshed assets into /images/payment-installments/2026-08-25/ and updated every active Payment Installments image src to the versioned URLs.
verification: All 13 active references exist; zero old active paths remain; npm run build passes; built artifacts and the served case route contain only versioned paths; new raw and optimized first-screen requests return HTTP 200 while the old raw path returns 404; final diff check passes.
files_changed: [lib/cases.ts, components/CasePlaceholder.tsx, public/images/payment-installments/2026-08-25/*.jpg]
