import ISelector from "./ISelector";
import Random from "./Random";
import { ParetoStruct } from "pareto-structs";

function* sigmoid(random: Random) {
  while (true) {
    let [x] = random;
    yield 0.5 + 0.5 * Math.tanh(5 * (x - 0.5));
  }
}

export default class SigmoidSelector<T> implements ISelector<T> {
  random: Random;

  constructor(random: Random) {
    this.random = random;
  }

  select(population: ParetoStruct<number, T>): [number[], T] {
    if (!population.frontiers.isEmpty()) {
      let [x] = sigmoid(this.random);
      let i = Math.floor(x * (population.frontiers.size() - 1));
      let [keys, frontier] = population.frontiers.nth(i);
      let nonEmptyDimentions = [];
      for (let dimention of frontier.dimentions) {
        if (!dimention.isEmpty()) {
          nonEmptyDimentions.push(dimention);
        }
      }
      if (nonEmptyDimentions.length == 0) {
        return [keys, frontier.optimal];
      } else {
        [x] = this.random;
        i = Math.floor(x * (nonEmptyDimentions.length - 1));
        let dimention = nonEmptyDimentions[i];
        [x] = this.random;
        i = Math.floor(x * (dimention.size() - 1));
        return dimention.nth(i);
      }
    }
  }
}
