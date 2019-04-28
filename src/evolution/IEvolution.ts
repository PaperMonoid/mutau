import { Random } from "../random";

export default interface IEvolution<T> {
  getRandom(): Random;
  setRandom(random: Random): IEvolution<T>;
  fitness(sample: T): number[];
  crossover(first: T, second: T): T;
  mutate(sample: T): T;
}
