# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-07-19

### Changed
- **BREAKING**: Migrated from Yarn to pnpm v10.13.1
- **BREAKING**: Updated to Node.js v22 LTS (minimum requirement)
- Upgraded Remotion from v2.6.11 to v4.0.324
- Upgraded React from v17.0.2 to v19.1.0
- Upgraded TypeScript from v4 to v5.8.3
- Upgraded Tailwind CSS from v2 to v4.1.11
- Upgraded ESLint from v7 to v9.31.0 with flat config format
- Migrated to ESM modules (`"type": "module"`)
- Updated all other dependencies to their latest versions

### Added
- `.nvmrc` file for Node.js version management
- `packageManager` field in package.json for pnpm
- Proper error handling in GitHub Actions workflow

### Fixed
- GitHub Actions workflow to use correct fetch command
- Tailwind CSS v4 compatibility with proper @import syntax
- Aspect ratio styling using native CSS instead of plugin

### Removed
- Deprecated Tailwind CSS plugins (@tailwindcss/aspect-ratio, @tailwindcss/line-clamp)
- Old ESLint configuration files (.eslintrc.js)

## [1.0.0] - Initial Release
- Twitter bot that posts daily Product Hunt trending products
- Remotion-based video generation
- GitHub Actions automation
- Product Hunt GraphQL API integration
- Twitter API v2 integration