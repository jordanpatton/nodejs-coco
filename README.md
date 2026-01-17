# Node.js Common Components

## Contributing
Requires [Node.js (latest LTS)](https://nodejs.org).
```shell
# Clone project OR download archive from GitHub.
git clone https://github.com/jordanpatton/nodejs-coco.git
cd nodejs-coco
npm install
# ...make changes...
npm run build
# Commit changes. (DO NOT skip the build step!)
```

## Repository Organization
- `dist`: Pre-built files.
- `ignore`: Git-ignored folder for transient data (cached sessions, downloaded files, etc.).
- `src`: Business logic.
  - `components`: Component tree containing large workflows, medium-sized tasks, and miniscule sub-tasks. This codebase favors composition over inheritance, and components may reference one another as needed. Structure changes to match relationships between components.
  - `index`: Entrypoint for this application.
- `tsd`: TypeScript definitions that are not specific to this application. Declares items that should not be type-checked and hosts type definitions for any packages that don't provide their own.

## Links
- [Node.js](https://nodejs.org)
- [TSDoc](https://tsdoc.org)
- [TypeScript](https://www.typescriptlang.org)

## Disclaimer
All product and company names are trademarks&trade; or registered&reg; trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. See [LICENSE](LICENSE) for limitation of liability.
