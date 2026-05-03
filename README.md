# @goldlabelapps/virus

> A modular, interactive, data-driven simulation of a virus and its spread — designed for Next.js / React applications.

The **Virus** concept is a metaphorical / gamified construct for educational, entertainment, or experimental purposes. It is **not** a real biological-virus model.

[![npm version](https://img.shields.io/npm/v/@goldlabelapps/virus)](https://www.npmjs.com/package/@goldlabelapps/virus)
[![license](https://img.shields.io/npm/l/@goldlabelapps/virus)](./LICENSE)

## Installation

```bash
npm i @goldlabelapps/virus
```

## Quick start

```js
import { Virus, Population, Simulation } from '@goldlabelapps/virus';

const virus = new Virus({ name: 'Alpha', r0: 2.5, mortality: 0.01 });
const population = new Population({ size: 10_000, initialInfected: 5 });
const sim = new Simulation({ virus, population });

const history = sim.run(180); // simulate up to 180 days
console.log(history.at(-1));
// { day: N, susceptible: ..., infected: ..., recovered: ..., deceased: ..., total: 10000 }
```

## API

### `new Virus(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | *(required)* | Display name |
| `r0` | `number` | `2.5` | Basic reproduction number |
| `mortality` | `number` | `0.01` | Case-fatality rate (0-1) |
| `incubation` | `number` | `5` | Incubation period (days) |
| `infectious` | `number` | `10` | Infectious period (days) |

### `new Population(options)`

| Option | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | *(required)* | Total individuals |
| `initialInfected` | `number` | `1` | Initially infected count |
| `immunityRate` | `number` | `0` | Fraction already immune (0-1) |

### `new Simulation({ virus, population })`

| Method | Returns | Description |
|---|---|---|
| `.step()` | `object` | Advance one day, returns day snapshot |
| `.run(days?)` | `object[]` | Run up to `days` days (default 365), returns full history |

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
