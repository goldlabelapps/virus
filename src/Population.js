/**
 * Represents a population that a virus can spread through.
 *
 * Compartment values are stored as floating-point numbers internally so that
 * the continuous SIR equations produce realistic dynamics even at small
 * infected counts. Call `toJSON()` for integer-rounded snapshots.
 */
export class Population {
  /**
   * @param {object} options
   * @param {number} options.size             - Total number of individuals.
   * @param {number} [options.initialInfected=1] - Number of initially infected individuals.
   * @param {number} [options.immunityRate=0]    - Fraction already immune (0–1).
   */
  constructor({ size, initialInfected = 1, immunityRate = 0 } = {}) {
    if (!size || size < 1) throw new Error('Population size must be a positive integer.');
    this.size = size;
    this.susceptible = size * (1 - immunityRate) - initialInfected;
    this.infected = initialInfected;
    this.recovered = size * immunityRate;
    this.deceased = 0;
  }

  /** Total individuals accounted for. */
  get total() {
    return this.susceptible + this.infected + this.recovered + this.deceased;
  }

  /**
   * Returns a plain-object snapshot of the current population state (integer-rounded).
   * @returns {object}
   */
  toJSON() {
    return {
      susceptible: Math.round(this.susceptible),
      infected: Math.round(this.infected),
      recovered: Math.round(this.recovered),
      deceased: Math.round(this.deceased),
      total: Math.round(this.total),
    };
  }
}
