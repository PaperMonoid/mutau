import { ParetoStruct } from "pareto-structs";

export default interface Killer<T> {
  kill(population: ParetoStruct<number, T>): ParetoStruct<number, T>;
}
