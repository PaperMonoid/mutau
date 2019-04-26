import { ParetoStruct } from "pareto-structs";

export default interface IMutator<T> {
  mutate(population: ParetoStruct<number, T>): ParetoStruct<number, T>;
}
