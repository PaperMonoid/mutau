import { ParetoStruct, Frontier } from "pareto-structs";
import { RandomSelector } from "../random";
import IMutator from "./IMutator";

export default class Mutator<T> extends IMutator<T> {
  readonly limit: number;
  readonly selector: RandomSelector;
  readonly mutate: Function<T, T>;
  readonly fitness: Function<T, number>;

  constructor(
    limit: number,
    selector: RandomSelector,
    mutate: Function<T, T>,
    fitness: Function<T, number>
  ) {
    this.limit = limit;
    this.crossover = crossover;
    this.fitness = fitness;
  }

  mutate(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    let population = this.population;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [keys, sample] = this.selector.select(population);
      const mutated = this.mutate(sample);
      population = population.remove(keys, sample);
      population = population.put(this.fitness(mutated), mutated);
      count++;
    }
    return population;
  }
}
