import { IBreeder } from "./breeder";
import { IKiller } from "./killer";
import { IMutator } from "./mutator";
import { ParetoStruct, Frontier } from "pareto-structs";

export default class Generation<T> {
  readonly breeder: IBreeder<T>;
  readonly mutator: IMutator<T>;
  readonly killer: IKiller<T>;
  readonly population: ParetoStruct<number, T>;
  readonly count: number;

  constructor(
    breeder: IBreeder<T>,
    mutator: IMutator<T>,
    killer: IKiller<T>,
    population: ParetoStruct<number, T>,
    count?: number
  ) {
    this.breeder = breeder;
    this.mutator = mutator;
    this.killer = killer;
    this.population = population;
    this.count = count;
  }

  search(): Generation<T> {
    let population = this.population;
    console.log(`POPULATION SIZE: ${this.populationSize(population)}`);
    population = this.breeder.breed(population);
    console.log(
      `POPULATION SIZE AFTER BREED: ${this.populationSize(population)}`
    );
    population = this.mutator.mutate(population);
    console.log(
      `POPULATION SIZE AFTER MUTATE: ${this.populationSize(population)}`
    );
    population = this.killer.kill(population);
    console.log(
      `POPULATION SIZE AFTER KILL: ${this.populationSize(population)}`
    );
    return new Generation<T>(
      this.breeder,
      this.mutator,
      this.killer,
      population,
      this.count + 1
    );
  }

  private populationSize(population: ParetoStruct<number, T>) {
    let size = 0;
    for (let [__, frontier] of population.frontiers) {
      size += 1;
      for (let dimention of frontier.dimentions) {
        size += dimention.size();
      }
    }
    return size;
  }
}
