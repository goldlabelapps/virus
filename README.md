# @goldlabelapps/virus

> Minimal package used to verify build and publish workflows.

[![npm version](https://img.shields.io/npm/v/@goldlabelapps/virus)](https://www.npmjs.com/package/@goldlabelapps/virus)
[![license](https://img.shields.io/npm/l/@goldlabelapps/virus)](./LICENSE)

## Installation

```bash
npm i @goldlabelapps/virus
```

## Quick start

```js
import { renderPackageInfo } from '@goldlabelapps/virus';

console.log(renderPackageInfo());
// @goldlabelapps/virus v1.0.2
```

## API

### `PACKAGE_NAME`

- Type: `string`
- Value: `@goldlabelapps/virus`

### `PACKAGE_VERSION`

- Type: `string`
- Value: current package version (for example `1.0.2`)

### `renderPackageInfo()`

- Returns: `string`
- Format: `<package-name> v<package-version>`

## Development

```bash
# Build (ESM + CJS)
npm run build

# Test (Node built-in test runner)
npm test
```

## Publishing

```bash
npm run build
npm publish --access public
```

## License

[MIT](./LICENSE) (c) Goldlabel°
