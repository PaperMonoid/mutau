import IBreeder from "./IBreeder";
import { ISelector } from "../random";
import { BiFunction, Function, ParetoStruct } from "pareto-structs";

export default class Breeder<T> implements IBreeder<T> {
  readonly limit: number;
  readonly selector: ISelector<T>;
  readonly crossover: BiFunction<T, T, T>;
  readonly fitness: Function<T, number[]>;

  constructor(
    limit: number,
    selector: ISelector<T>,
    crossover: BiFunction<T, T, T>,
    fitness: Function<T, number[]>
  ) {
    this.limit = limit;
    this.selector = selector;
    this.crossover = crossover;
    this.fitness = fitness;
  }

  breed(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [_, first] = this.selector.select(population);
      const [__, second] = this.selector.select(population);
      const offspring = this.crossover(first, second);
      population = population.put(this.fitness(offspring), offspring);
      count++;
    }
    return population;
  }
}
