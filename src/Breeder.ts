import { ParetoStruct } from "pareto-structs";

export default interface Breeder<T> {
  breed(population: ParetoStruct<number, T>): ParetoStruct<number, T>;
}
