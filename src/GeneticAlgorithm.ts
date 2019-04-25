class GeneticAlgorithm<T> {
  readonly population: ParetoStruct<number, T>;
  readonly objectives: Comparator<number>[];
}
