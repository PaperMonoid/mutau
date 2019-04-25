import { ParetoStruct, Frontier } from "pareto-structs";
import Breeder from "./Breeder";

export default class BestBreeder<T> extends Breeder<T> {
  readonly limit: number;
  readonly crossover: BiFunction<T, T, T>;
  readonly fitness: Function<T, number>;

  constructor(
    limit: number,
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
      let [keys, frontier] = population.frontiers.last();
      const iterator = population.frontiers.iterator(keys);
      let current = 0;
      while (count < this.limit) {
        const offspring = this.crossover(firstSample, secondSample);
        population = population.put(this.fitness(offspring), offspring);
        count++;
      }
    }
    return population;
  }
}
