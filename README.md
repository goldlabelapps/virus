## npmjs.com/@goldlabelapps/virus

> Minimal package used to verify build and publish workflows.

[![SVG](https://shieldcn.dev/npm/@goldlabelapps/virus.svg)](https://www.npmjs.com/package/@goldlabelapps/virus)


#### Installation

```bash
# npm
npm i @goldlabelapps/virus

# yarn
yarn add @goldlabelapps/virus
```

#### Quick start

```js
import { renderPackageInfo } from '@goldlabelapps/virus';

console.log(renderPackageInfo());
// @goldlabelapps/virus v1.0.2
```

#### API

`PACKAGE_NAME`

- Type: `string`
- Value: `@goldlabelapps/virus`

`PACKAGE_VERSION`

- Type: `string`
- Value: current package version (for example `1.0.2`)

#### `renderPackageInfo()`

- Returns: `string`
- Format: `<package-name> v<package-version>`

## License

[MIT](./LICENSE) (c) Goldlabel°
