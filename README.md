# Engineering AI Toolkit

Independent, transparent engineering arithmetic for quantity takeoff, material estimation and cutting optimization. Version 0.1.0 is a **private review candidate**, not yet an open-source release. No AI service or paid API is required: deterministic calculations are the foundation for future AI-assisted workflows.

## Quick start

Open `index.html` in a modern browser, or run `npm start` (Python 3 required) and visit http://127.0.0.1:8000. Run `npm test` with Node.js 22+; no runtime dependencies or install step. Run `node build-demo.cjs` to generate a single-file offline demo. All calculations remain on the device.

| Tool | Scope |
|---|---|
| Unit converter | Metric and imperial length, area, volume, mass |
| Material weight | Ideal RHS, CHS, rectangular, round, plate and known cross-sectional area |
| Cutting stock | Best-fit decreasing, layouts, audit table and CSV |
| Quantity takeoff | Multiple linear, area and volume items with repeat counts, rates and CSV |
| Section properties | Ideal centroidal second moments and areas |
| Consumption | Net demand, allowance and cost |

See [calculation methods](docs/METHODS.md), [validation](docs/VALIDATION.md) and [user guide](docs/USER_GUIDE.md). Synthetic examples are in examples/.

## Limits

Not structural design or manufacturing instructions. Ideal geometry excludes corner radii, tolerances, connections and fabrication details. Cutting is one-dimensional, one material/section per batch; one saw kerf per finished piece and trim reserved at each end. Minimum bar count is certified only when the capacity lower bound is reached; otherwise the result is heuristic. Review all outputs professionally before use.

## Contributing

See CONTRIBUTING.md and ROADMAP.md. No adoption or contributor metrics have been verified. License selection and public release require owner approval.
