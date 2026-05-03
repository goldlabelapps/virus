import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PACKAGE_NAME, PACKAGE_VERSION, renderPackageInfo } from '../src/index.js';

describe('package info renderer', () => {
  it('exports package metadata constants', () => {
    assert.equal(PACKAGE_NAME, '@goldlabelapps/virus');
    assert.equal(PACKAGE_VERSION, '1.0.1');
  });

  it('renders name and version text', () => {
    assert.equal(renderPackageInfo(), '@goldlabelapps/virus v1.0.1');
  });
});
