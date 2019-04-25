import { ParetoStruct, Frontier } from "pareto-structs";
import Killer from "./Killer";

class FrontierIterator extends Iterable<MultiMap<number[], T>> {
  dimentions: MultiMap<number[], T>[];

  constructor(dimentions: MultiMap<number[], T>[]) {
    this.dimentions = dimentions;
  }

  setDimentions(dimentions: MultiMap<number[], T>[]): void {
    this.dimentions = dimentions;
  }

  [Symbol.iterator](): Iterator<MultiMap<number[], T>> {
    function iterator() {
      while (true) {
        for (let i = 0; i < this.dimentions.length; i++) {
          if (!this.dimentions[i].isEmpty()) {
            yield this.dimentions[i];
          }
        }
      }
    }
  }
}

export default class WorstKiller<T> extends Killer<T> {
  kill(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let killCount = 0;
    let population = this.population;
    while (killCount < amount && !population.frontiers.isEmpty()) {
      let [keys, frontier] = population.frontiers.head();
      let nonEmptyDimentions = false;
      let current = 0;
      while (killCount < amount && nonEmptyDimentions) {
        let index = this.firstNonEmptyDimention(current, frontier.dimentions);
        nonEmptyDimentions = index > -1;
        if (nonEmptyDimentions) {
          let [_keys, _value] = frontier.dimentions[index].head();
          population = population.remove(_keys, _value);
          killCount++;
        }
      }
      if (!nonEmptyDimentions) {
        population = population.removeAll(keys);
      }
    }
    return population;
  }

  private firstNonEmptyDimention(
    current: number,
    dimentions: MultiMap<number[], T>[]
  ): number {
    for (let i = 0; i < dimentions.length; i++) {
      const index = (current + i) % dimentions.length;
      if (!dimentions[index].isEmpty()) {
        return index;
      }
    }
    return -1;
  }
}
