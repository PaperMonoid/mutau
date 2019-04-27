import seedrandom from "seedrandom";

export default class Random implements Iterable<number> {
  readonly rng: seedrandom.prng;

  constructor(seed: string, state?: seedrandom.State) {
    this.rng = seedrandom(seed, state || { state: true });
  }

  [Symbol.iterator](): Iterator<number> {
    function* iterator(rng) {
      while (true) {
        yield rng.quick();
      }
    }
    return iterator(this.rng);
  }

  copy(): Random {
    return new Random("", { state: this.rng.state() });
  }
}
