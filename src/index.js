/**
 * Minimal workflow verification output.
 *
 * Exposes the package metadata as text so consuming apps can validate
 * end-to-end install/build/import/publish flow.
 */

import pkg from '../package.json' with { type: 'json' };

export const PACKAGE_NAME = pkg.name;
export const PACKAGE_VERSION = pkg.version;

export function renderPackageInfo() {
	return `${PACKAGE_NAME} v${PACKAGE_VERSION}`;
}
