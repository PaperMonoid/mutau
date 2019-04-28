import Generation from "./Generation";
import { Breeder } from "./breeder";
import { Killer } from "./killer";
import { Mutator } from "./mutator";
import {
  BiFunction,
  Comparator,
  Equals,
  Function,
  ParetoStruct,
  Frontier
} from "pareto-structs";
import { IEvolution } from "./evolution";
import { Random, SigmoidSelector, UniformSelector } from "./random";

export default class GeneticAlgorithm<T> {
  readonly evolution: IEvolution<T>;
  readonly objectives: Comparator<number>[];
  readonly equals: Equals<T>;

  constructor(
    evolution: IEvolution<T>,
    objectives: Comparator<number>[],
    equals: Equals<T>
  ) {
    this.evolution = evolution;
    this.objectives = objectives;
    this.equals = equals;
  }

  optimize(
    population: Iterable<T>,
    breedLimit: number,
    mutationLimit: number,
    killLimit: number
  ): Generation<T> {
    const evolution = this.evolution.setRandom(
      this.evolution.getRandom().copy()
    );
    let pareto = new ParetoStruct<number, T>(this.objectives, this.equals);
    for (let sample of population) {
      pareto = pareto.put(evolution.fitness(sample), sample);
    }
    return new Generation<T>(
      new Breeder<T>(
        breedLimit,
        new SigmoidSelector(evolution.getRandom()),
        evolution
      ),
      new Mutator<T>(
        mutationLimit,
        new UniformSelector(evolution.getRandom()),
        evolution
      ),
      new Killer<T>(killLimit),
      pareto
    );
  }
}
