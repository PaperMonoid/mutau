import IMutator from "./IMutator";
import { ISelector } from "../random";
import { Function, ParetoStruct } from "pareto-structs";

export default class Mutator<T> implements IMutator<T> {
  readonly limit: number;
  readonly selector: ISelector<T>;
  readonly mutation: Function<T, T>;
  readonly fitness: Function<T, number[]>;

  constructor(
    limit: number,
    selector: ISelector<T>,
    mutation: Function<T, T>,
    fitness: Function<T, number[]>
  ) {
    this.limit = limit;
    this.selector = selector;
    this.mutation = mutation;
    this.fitness = fitness;
  }

  mutate(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [keys, sample] = this.selector.select(population);
      const mutated = this.mutation(sample);
      population = population.remove(keys, sample);
      population = population.put(this.fitness(mutated), mutated);
      count++;
    }
    return population;
  }
}
