/**
 * Minimal workflow verification output.
 *
 * Exposes the package metadata as text so consuming apps can validate
 * end-to-end install/build/import/publish flow.
 */

export const PACKAGE_NAME = '@goldlabelapps/virus';
export const PACKAGE_VERSION = '1.0.1';

export function renderPackageInfo() {
	return `${PACKAGE_NAME} v${PACKAGE_VERSION}`;
}
