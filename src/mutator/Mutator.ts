import IMutator from "./IMutator";
import { IEvolution } from "../evolution";
import { ISelector } from "../random";
import { Function, ParetoStruct } from "pareto-structs";

export default class Mutator<T> implements IMutator<T> {
  readonly limit: number;
  readonly selector: ISelector<T>;
  readonly evolution: IEvolution<T>;

  constructor(limit: number, selector: ISelector<T>, evolution: IEvolution<T>) {
    this.limit = limit;
    this.selector = selector;
    this.evolution = evolution;
  }

  mutate(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [keys, sample] = this.selector.select(population);
      const mutated = this.evolution.mutate(sample);
      population = population.remove(keys, sample);
      population = population.put(this.evolution.fitness(mutated), mutated);
      count++;
    }
    return population;
  }
}
