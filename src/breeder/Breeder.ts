import IBreeder from "./IBreeder";
import { IEvolution } from "../evolution";
import { ISelector } from "../random";
import { BiFunction, Function, ParetoStruct } from "pareto-structs";

export default class Breeder<T> implements IBreeder<T> {
  readonly limit: number;
  readonly selector: ISelector<T>;
  readonly evolution: IEvolution<T>;

  constructor(limit: number, selector: ISelector<T>, evolution: IEvolution<T>) {
    this.limit = limit;
    this.selector = selector;
    this.evolution = evolution;
  }

  breed(population: ParetoStruct<number, T>): ParetoStruct<number, T> {
    let count = 0;
    while (count < this.limit && !population.frontiers.isEmpty()) {
      const [_, first] = this.selector.select(population);
      const [__, second] = this.selector.select(population);
      const offspring = this.evolution.crossover(first, second);
      population = population.put(this.evolution.fitness(offspring), offspring);
      count++;
    }
    return population;
  }
}
