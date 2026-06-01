# Open Data Products Standards Family Website

This repository contains the static website for the Open Data Products standards family, published at [opendataproducts.org](https://opendataproducts.org/).

The site introduces the standards family for describing, cataloging, connecting, and interpreting data products across platforms, portfolios, and AI agent workflows.

## Standards

- **ODPS**: Open Data Product Specification, the foundation for data product metadata, access, quality, SLA, licensing, pricing, and strategy.
- **ODPC**: Open Data Product Catalogs, for organizing data products into catalogs, portfolios, use cases, objectives, KPIs, and signals.
- **ODPG**: Open Data Product Graphs, for connecting products, use cases, objectives, KPIs, signals, and relationships.
- **ODPV**: Open Data Product Vocabulary, for shared terms and semantics across the standards family.

## Repository Structure

- `index.html`: Main website page.
- `css/`: Stylesheets for layout, responsive behavior, and animations.
- `js/`: JavaScript used by the website.
- `images/`: Images, icons, and web manifest assets.
- `llms.txt`: AI-readable site context.
- `old-site/`: Archived previous version of the website.

## Local Preview

This is a static site and does not require a build step.

Open `index.html` directly in a browser, or serve the repository root with any static HTTP server.

For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Contributing

Keep changes focused and minimal. For website updates, edit the relevant section in `index.html` and verify that links, layout, and responsive behavior still work as expected.

