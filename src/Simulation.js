import { Virus } from './Virus.js';
import { Population } from './Population.js';

/**
 * Runs a discrete-time SIR-style simulation of a virus spreading through a population.
 */
export class Simulation {
  /**
   * @param {object} options
   * @param {Virus}      options.virus      - The virus to simulate.
   * @param {Population} options.population - The population to simulate.
   */
  constructor({ virus, population } = {}) {
    if (!(virus instanceof Virus)) throw new Error('virus must be an instance of Virus.');
    if (!(population instanceof Population)) throw new Error('population must be an instance of Population.');
    this.virus = virus;
    this.population = population;
    this.day = 0;
    this.history = [{ day: 0, ...population.toJSON() }];
  }

  /**
   * Advance the simulation by one day.
   * Uses a continuous discrete SIR model with floating-point compartments.
   * @returns {object} State snapshot for the new day.
   */
  step() {
    const { virus, population } = this;
    const { susceptible, infected, recovered, deceased } = population;
    const N = population.total;

    if (N === 0 || infected < 0.5) {
      population.infected = 0;
      return this.history[this.history.length - 1];
    }

    // Daily transmission rate derived from R0 and infectious period.
    const beta = virus.r0 / virus.infectious;
    const gamma = 1 / virus.infectious;

    const newInfected = (beta * infected * susceptible) / N;
    const totalRecovering = gamma * infected;
    const newRecovered = totalRecovering * (1 - virus.mortality);
    const newDeceased = totalRecovering * virus.mortality;

    population.susceptible = Math.max(0, susceptible - newInfected);
    population.infected = Math.max(0, infected + newInfected - newRecovered - newDeceased);
    population.recovered = recovered + newRecovered;
    population.deceased = deceased + newDeceased;

    this.day += 1;
    const snapshot = { day: this.day, ...population.toJSON() };
    this.history.push(snapshot);
    return snapshot;
  }

  /**
   * Run the simulation for a given number of days (or until no infected remain).
   * @param {number} [days=365] - Maximum number of days to simulate.
   * @returns {object[]} Full history array.
   */
  run(days = 365) {
    for (let i = 0; i < days; i++) {
      const state = this.step();
      if (state.infected === 0) break;
    }
    return this.history;
  }
}
