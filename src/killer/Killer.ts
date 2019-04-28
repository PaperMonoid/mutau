import IKiller from "./IKiller";
import { MultiMap, ParetoStruct, Frontier } from "pareto-structs";

class WorstIterator<T> implements Iterable<[number[], T]> {
  dimentions: MultiMap<number[], T>[];

  constructor(dimentions: MultiMap<number[], T>[]) {
    this.dimentions = dimentions;
  }

  [Symbol.iterator](): Iterator<[number[], T]> {
    function* iterator(self: WorstIterator<T>) {
      let allEmpty = false;
      while (!allEmpty) {
        allEmpty = true;
        for (let i = 0; i < self.dimentions.length; i++) {
          if (!self.dimentions[i].isEmpty()) {
            allEmpty = false;
            yield self.dimentions[i].head();
          }
        }
      }
    }
    return iterator(this);
  }
}

export default class Killer<T> implements IKiller<T> {
  readonly limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  kill(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      let [keys, frontier] = population.frontiers.head();
      const samples = new WorstIterator<T>(frontier.dimentions);
      for (let worst of samples) {
        if (count < this.limit) {
          population = population.remove(worst[0], worst[1]);
          [keys, frontier] = population.frontiers.head();
          samples.dimentions = frontier.dimentions;
          count++;
        } else {
          break;
        }
      }
      for (let sample of frontier.optimals) {
        if (count < this.limit) {
          population = population.remove(sample[0], sample[1]);
          count++;
        }
      }
    }
    return population;
  }
}
