import { ParetoStruct, Frontier } from "pareto-structs";
import { BiFunction, Comparator, Function } from "pareto-structs/function";

export default class Generation<T> {
  readonly algorithm: GeneticAlgorithm<T>;
  readonly population: ParetoStruct<number, T>;

  constructor(
    algorithm: GeneticAlgorithm<T>,
    population: ParetoStruct<number, T>
  ) {
    this.population = population;
    this.fitness = fitness;
  }

  search(): Generation<T> {
    const algorithm = this.algorithm;
    let population = this.population;
    population = algorithm.breeder.breed(population);
    population = algorithm.mutator.mutate(population);
    population = algorithm.killer.kill(population);
    return new Generation<T>(this.algorithm, population);
  }
}
