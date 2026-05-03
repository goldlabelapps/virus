import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PACKAGE_NAME, PACKAGE_VERSION, renderPackageInfo } from '../src/index.js';
import pkg from '../package.json' with { type: 'json' };

describe('package info renderer', () => {
  it('exports package metadata constants', () => {
    assert.equal(PACKAGE_NAME, pkg.name);
    assert.equal(PACKAGE_VERSION, pkg.version);
  });

  it('renders name and version text', () => {
    assert.equal(renderPackageInfo(), `${pkg.name} v${pkg.version}`);
  });
});
