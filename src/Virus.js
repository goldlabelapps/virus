/**
 * Represents a virus with configurable properties that govern its spread.
 */
export class Virus {
  /**
   * @param {object} options
   * @param {string} options.name         - Display name of the virus.
   * @param {number} [options.r0=2.5]     - Basic reproduction number (avg new infections per case).
   * @param {number} [options.mortality=0.01] - Case fatality rate (0–1).
   * @param {number} [options.incubation=5]   - Incubation period in days.
   * @param {number} [options.infectious=10]  - Infectious period in days.
   */
  constructor({
    name,
    r0 = 2.5,
    mortality = 0.01,
    incubation = 5,
    infectious = 10,
  } = {}) {
    if (!name) throw new Error('Virus must have a name.');
    this.name = name;
    this.r0 = r0;
    this.mortality = mortality;
    this.incubation = incubation;
    this.infectious = infectious;
  }

  /**
   * Returns a plain-object representation suitable for serialisation.
   * @returns {object}
   */
  toJSON() {
    return {
      name: this.name,
      r0: this.r0,
      mortality: this.mortality,
      incubation: this.incubation,
      infectious: this.infectious,
    };
  }
}
