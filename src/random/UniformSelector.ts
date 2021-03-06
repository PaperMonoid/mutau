import ISelector from "./ISelector";
import Random from "./Random";
import { ParetoStruct } from "pareto-structs";

export default class UniformSelector<T> implements ISelector<T> {
  random: Random;

  constructor(random: Random) {
    this.random = random;
  }

  select(population: ParetoStruct<number, T>): [number[], T] {
    if (!population.frontiers.isEmpty()) {
      let [x] = this.random;
      let i = Math.floor(x * (population.frontiers.size() - 1));
      let [keys, frontier] = population.frontiers.nth(i);
      let nonEmptyDimentions = [frontier.optimals];
      for (let dimention of frontier.dimentions) {
        if (!dimention.isEmpty()) {
          nonEmptyDimentions.push(dimention);
        }
      }
      [x] = this.random;
      i = Math.floor(x * (nonEmptyDimentions.length - 1));
      let dimention = nonEmptyDimentions[i];
      [x] = this.random;
      i = Math.floor(x * (dimention.size() - 1));
      return dimention.nth(i);
    }
  }
}
