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
import { Random, SigmoidSelector, UniformSelector } from "./random";

export default class GeneticAlgorithm<T> {
  readonly seed: string;
  readonly objectives: Comparator<number>[];
  readonly equals: Equals<T>;
  readonly fitness: Function<T, number[]>;
  readonly crossover: BiFunction<T, T, T>;
  readonly mutate: Function<T, T>;
  readonly breedLimit: number;
  readonly mutationLimit: number;
  readonly killLimit: number;

  constructor(
    seed: string,
    objectives: Comparator<number>[],
    equals: Equals<T>,
    fitness: Function<T, number[]>,
    crossover: BiFunction<T, T, T>,
    mutate: Function<T, T>,
    breedLimit: number,
    mutationLimit: number,
    killLimit: number
  ) {
    this.seed = seed;
    this.objectives = objectives;
    this.equals = equals;
    this.fitness = fitness;
    this.crossover = crossover;
    this.mutate = mutate;
    this.breedLimit = breedLimit;
    this.mutationLimit = mutationLimit;
    this.killLimit = killLimit;
  }

  optimize(population: Iterable<T>): Generation<T> {
    let pareto = new ParetoStruct<number, T>(this.objectives, this.equals);
    for (let sample of population) {
      pareto = pareto.put(this.fitness(sample), sample);
    }
    const random = new Random(this.seed);
    return new Generation<T>(
      new Breeder<T>(
        this.breedLimit,
        new SigmoidSelector(random),
        this.crossover,
        this.fitness
      ),
      new Mutator<T>(
        this.mutationLimit,
        new UniformSelector(random),
        this.mutate,
        this.fitness
      ),
      new Killer<T>(this.killLimit),
      pareto
    );
  }
}
