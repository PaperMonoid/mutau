import Random from "./Random";
import { ParetoStruct } from "pareto-structs";

export default interface ISelector {
  select(population: ParetoStruct<number, T>): [number[], T];
}
