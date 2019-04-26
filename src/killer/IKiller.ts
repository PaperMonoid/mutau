import { ParetoStruct } from "pareto-structs";

export default interface IKiller<T> {
  kill(population: ParetoStruct<number, T>): ParetoStruct<number, T>;
}
