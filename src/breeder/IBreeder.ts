import { ParetoStruct } from "pareto-structs";

export default interface IBreeder<T> {
  breed(population: ParetoStruct<number, T>): ParetoStruct<number, T>;
}
