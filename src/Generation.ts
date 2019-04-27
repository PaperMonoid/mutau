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
    population = this.breeder.breed(population);
    population = this.mutator.mutate(population);
    population = this.killer.kill(population);
    return new Generation<T>(
      this.breeder,
      this.mutator,
      this.killer,
      population,
      this.count + 1
    );
  }
}
