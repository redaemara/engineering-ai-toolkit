# Initial engineering verification

Node 24 test run: 25 passed, zero failed (2026-11-26). No installed production package dependencies.

Independent reference checks:
- 12 inches = 1 foot; 10 ft² = 0.9290304 m²; 1 m³ = 1000 L.
- RHS 100×50×2 mm: area 5000−4416=584 mm²; steel 7850 kg/m³, length 6 m = 27.5064 kg.
- Solid rectangular aluminium 20×10 mm, 2 m at 2700 kg/m³ = 1.08 kg.
- CHS 50×2 mm: 96π mm²; rectangle 20×30 mm: Ix=45,000 mm⁴.
- Cutting 6000 mm, cuts 2000+2000+1950, kerf 5 mm each, 10 mm trim each end: product 5950, loss 35, remnant 15, 1 bar, 99.1667% utilization.
- Takeoff 2×3×0.5 m, count 4 = 12 m³; allowance 5% on net 100 = 105.

Regression checks cover invalid units, zero and negative inputs, invalid section thickness, excessive cut length, quantity limits, CSV escaping/formula protection, conservation and deterministic packing over 50 datasets. UI JavaScript syntax check passed. Browser smoke test could not launch: local Chromium executable missing (exit 127). UI interaction, screenshot and mobile rendering remain unverified; run tests/ui-smoke.cjs with Playwright and a working Chromium installation before release.

Security review: no external network calls, credentials, storage or runtime packages; DOM text nodes used for user-originated output; CSV formula-leading strings are prefixed. This is a limited source review, not a penetration test. CI actions will require review at time of repository publication.
