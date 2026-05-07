## npmjs.com/@goldlabelapps/virus


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
// @goldlabelapps/virus v1.0.3
```

#### API

`PACKAGE_NAME`

- Type: `string`
- Value: `@goldlabelapps/virus`

`PACKAGE_VERSION`

- Type: `string`
- Value: current package version (for example `1.0.3`)

#### `renderPackageInfo()`

- Returns: `string`
- Format: `<package-name> v<package-version>`

## License

[MIT](./LICENSE) (c) Goldlabel°


# Virus°

v2.0.0 - A client-side Virus module for Next.js + React using Firebase and FingerprintJS.

## Overview

Virus° is a self-contained feature module that provides:

- A fingerprint-aware visitor flow (new vs returning visitor)
- Firestore-backed virus creation and live listings
- A score mechanic where viewing a virus increments its score
- A floating UI entry point (`VirusButton`) and modal (`VirusDialog`)

The term "virus" here is thematic/game-like, not a medical simulation.

## What It Does

1. On mount, `Virus.tsx` dispatches `initVirus()`.
2. `initVirus()` loads FingerprintJS and stores `visitorId` in `redux.virus.fingerprint`.
3. When a fingerprint is available, `checkFingerprint()` creates or updates `fingerprints/{fingerprint}` in Firestore.
4. `useSubFingerprint()` subscribes to that fingerprint doc in real time.
5. Users can create new virus records in `viruses` via `newVirus()`.
6. `VirusPage` increments `viruses/{id}.score` with Firestore `increment(1)` on page visit.

## File Map

```
Virus/
|- Virus.tsx
|- index.tsx
|- config.json
|- types.d.ts
|- actions/
|  |- initVirus.tsx
|  |- newVirus.tsx
|  |- setVirus.tsx
|  `- fingerprint/
|     |- checkFingerprint.tsx
|     |- updateFingerprint.tsx
|     |- deleteFingerprint.tsx
|     |- forgetFingerprint.tsx
|     `- subFingerprint.tsx
|- components/
|  |- VirusButton.tsx
|  |- VirusDialog.tsx
|  |- Fingerprint.tsx
|  |- Viruses.tsx
|  |- VirusPage.tsx
|  |- NewVirus.tsx
|  |- Score.tsx
|  |- Share.tsx
|  |- Favourites.tsx
|  `- Debug.tsx
|- hooks/
|  |- useVirus.tsx
|  |- useFingerprint.tsx
|  |- useSubFingerprint.tsx
|  `- useDoc.tsx
`- utils/
     |- index.tsx
    |- firebase.ts
     |- randomVirus.tsx
     |- parseDevice.tsx
     |- virusOutbreak.tsx
     |- utils.ts
     `- deviceModels.json
```

## Public Exports

The module barrel (`index.tsx`) exports:

- Component: `Virus`
- Actions: `initVirus`, `newVirus`, `setVirus`, `checkFingerprint`, `deleteFingerprint`, `forgetFingerprint`, `subFingerprint`, `updateFingerprint`
- Hooks: `useVirus`, `useFingerprint`, `useSubFingerprint`, `useDoc`
- Utils: `parseDevice`, `randomVirus`, `virusOutbreak`
- Firebase helpers: `getFirebaseApp`, `getFirebaseAuth`, `getFirebaseFirestore`, `getFirebaseStorage`, `getFirebaseMessaging`
- UI: `Debug`, `Favourites`, `Fingerprint`, `NewVirus`, `Score`, `Share`, `VirusButton`, `VirusDialog`, `VirusPage`, `Viruses`

## Firestore Shape

### Collection: `fingerprints`

Document ID: FingerprintJS visitor ID

Typical fields:

- `created: number` (ms timestamp)
- `updated: number` (ms timestamp)
- Optional device metadata keys (written by `parseDevice` / `updateFingerprint`)

### Collection: `viruses`

Typical fields created by `newVirus()`:

- `name: string`
- `message: string`
- `score: number` (starts at 1 in current form flow)
- `created: number`
- `updated: number`

## Environment Variables

`utils/firebase.ts` expects these client env vars:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Quick Start

1. Add Firebase env vars (above) and confirm your app has Firebase + Uberedux wired.
2. Mount the root Virus UI in any client page/layout:

```tsx
import Virus from './Virus/Virus';

export default function AppShell() {
    return <Virus />;
}
```

3. Add route pages that render Virus module screens:
   - `/viruses` -> `Viruses`
   - `/viruses/new` -> `NewVirus`
   - `/viruses/[id]` -> `VirusPage`

Example route components:

```tsx
// app/viruses/page.tsx
import { Viruses } from '../Virus';
export default function Page() {
    return <Viruses />;
}
```

```tsx
// app/viruses/new/page.tsx
import { NewVirus } from '../../Virus';
export default function Page() {
    return <NewVirus />;
}
```

```tsx
// app/viruses/[id]/page.tsx
import { VirusPage } from '../../Virus';
export default function Page() {
    return <VirusPage />;
}
```

4. Ensure Firestore has read/write rules for collections used by this module:
   - `fingerprints`
   - `viruses`

5. Open the app and verify:
   - Fingerprint doc is created/updated in `fingerprints/{visitorId}`
   - Creating a new virus writes a doc in `viruses`
   - Opening a virus detail page increments its `score`

## Usage

Render the root UI entry point in a client component:

```tsx
import Virus from './Virus/Virus';

export default function Page() {
    return <Virus />;
}
```

The module expects your app to already provide:

- Uberedux store wiring (`NX/Uberedux`)
- Design system utilities used by components (`NX/DesignSystem`)
- Firebase SDK packages and initialized project credentials

## Privacy + Behavior Notes

- Fingerprinting uses FingerprintJS visitor IDs, not direct personal identifiers.
- `deleteFingerprint()` removes fingerprint doc and sets a session flag to avoid instant recreation.
- `forgetFingerprint()` deletes the fingerprint and redirects to Google in the current implementation.
- `getFirebaseMessaging()` safely returns `null` when unsupported (SSR or browser limitations).

## Developer Notes

- Inside this module, prefer relative imports rather than importing from its own barrel (`index.tsx`) to avoid circular dependencies.
- Firestore writes are handled via actions (`newVirus`, `checkFingerprint`, `updateFingerprint`, `deleteFingerprint`, `forgetFingerprint`, `parseDevice` action flow).
- `VirusButton` briefly shows `toggleText` then clears it after 2.5s.
- `Score` is currently visualized as a 0-100 style badge while stored values can exceed 100 over time.

---
Last updated: 7 May 2026