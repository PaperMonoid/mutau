import seedrandom from "seedrandom";

export default class Random implements Iterator<number> {
  readonly rng: () => number;

  constructor(seed: string, state?: State) {
    this.rng = seedrandom(seed, state || { state: true });
  }

  next(): { value: number; done: boolean } {
    return { value: this.rng.quick(), done: false };
  }

  copy(): Random {
    return new Random("", { state: this.rng.state() });
  }
}
