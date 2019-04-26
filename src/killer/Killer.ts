import { ParetoStruct, Frontier } from "pareto-structs";
import IKiller from "./IKiller";

class WorstIterator<T> extends Iterable<[number[], T]> {
  dimentions: MultiMap<number[], T>[];

  constructor(dimentions: MultiMap<number[], T>[]) {
    this.dimentions = dimentions;
  }

  [Symbol.iterator](): Iterator<[number[], T]> {
    function* iterator() {
      while (true) {
        for (let i = 0; i < this.dimentions.length; i++) {
          if (!this.dimentions[i].isEmpty()) {
            yield this.dimentions[i].head();
          }
        }
      }
    }
    return iterator().bind(this);
  }
}

export default class Killer<T> extends IKiller<T> {
  readonly limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  kill(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    let population = this.population;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      let [keys, frontier] = population.frontiers.head();
      const samples = new WorstIterator<T>(frontier.dimentions);
      for (let worst of samples) {
        if (count < this.limit) {
          population = population.remove(
            dimention.value.keys,
            dimention.value.value
          );
          samples.dimentions = population.dimentions;
          count++;
        } else {
          break;
        }
      }
      if (count < this.limit) {
        population = population.removeAll(keys);
        count++;
      }
    }
    return population;
  }
}
