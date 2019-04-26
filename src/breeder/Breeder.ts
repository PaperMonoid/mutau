import { ParetoStruct, Frontier } from "pareto-structs";
import { ISelector } from "../random";
import IBreeder from "./IBreeder";

export default class Breeder<T> extends IBreeder<T> {
  readonly limit: number;
  readonly selector: ISelector;
  readonly crossover: BiFunction<T, T, T>;
  readonly fitness: Function<T, number>;

  constructor(
    limit: number,
    selector: ISelector,
    crossover: BiFunction<T, T, T>,
    fitness: Function<T, number>
  ) {
    this.limit = limit;
    this.crossover = crossover;
    this.fitness = fitness;
  }

  breed(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    let population = this.population;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [_, first] = this.selector.select(population);
      const [_, second] = this.selector.select(population);
      const offspring = this.crossover(first, second);
      population = population.put(this.fitness(offspring), offspring);
      count++;
    }
    return population;
  }
}
