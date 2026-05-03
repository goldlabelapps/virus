import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Virus } from '../src/Virus.js';
import { Population } from '../src/Population.js';
import { Simulation } from '../src/Simulation.js';

describe('Virus', () => {
  it('creates a virus with defaults', () => {
    const v = new Virus({ name: 'TestVirus' });
    assert.equal(v.name, 'TestVirus');
    assert.equal(v.r0, 2.5);
    assert.equal(v.mortality, 0.01);
  });

  it('throws when name is missing', () => {
    assert.throws(() => new Virus({}), /name/i);
  });

  it('serialises to JSON', () => {
    const v = new Virus({ name: 'X', r0: 3 });
    assert.deepEqual(v.toJSON(), { name: 'X', r0: 3, mortality: 0.01, incubation: 5, infectious: 10 });
  });
});

describe('Population', () => {
  it('creates a population', () => {
    const p = new Population({ size: 1000 });
    assert.equal(p.size, 1000);
    assert.equal(p.infected, 1);
    assert.equal(p.total, 1000);
  });

  it('respects immunityRate', () => {
    const p = new Population({ size: 1000, immunityRate: 0.5 });
    assert.equal(p.recovered, 500);
  });

  it('throws when size is missing', () => {
    assert.throws(() => new Population({}), /size/i);
  });
});

describe('Simulation', () => {
  it('creates and runs a simulation', () => {
    const virus = new Virus({ name: 'TestVirus', r0: 2.5 });
    const population = new Population({ size: 1000 });
    const sim = new Simulation({ virus, population });
    const history = sim.run(100);
    assert.ok(history.length > 1);
    assert.equal(history[0].day, 0);
    assert.ok(history[history.length - 1].day >= 1);
  });

  it('stops when infected reaches 0', () => {
    const virus = new Virus({ name: 'Mild', r0: 0.5, mortality: 0 });
    const population = new Population({ size: 100, initialInfected: 5 });
    const sim = new Simulation({ virus, population });
    const history = sim.run(365);
    const last = history[history.length - 1];
    assert.equal(last.infected, 0);
  });

  it('throws on invalid arguments', () => {
    assert.throws(() => new Simulation({ virus: {}, population: {} }), /virus/i);
  });
});
