import GeneticAlgorithm from "./GeneticAlgorithm";
import { Random } from "./random";
import { IEvolution } from "./evolution";

function maximize(first: number, second: number): number {
  return first - second;
}

function minimize(first: number, second: number): number {
  return second - first;
}

function eq(first: number[], second: number[]) {
  const size = Math.min(first.length, second.length);
  for (let i = 0; i < size; i++) {
    if (first[i] != second[i]) {
      return false;
    }
  }
  return true;
}

class Evolution implements IEvolution<number[]> {
  random: Random;

  constructor(random?: Random) {
    this.random = random || new Random("");
  }

  getRandom(): Random {
    return this.random;
  }

  setRandom(random: Random): IEvolution<number[]> {
    return new Evolution(random);
  }

  fitness(x: number[]): number[] {
    return [x[0], Math.abs(Math.PI - x[1])];
  }

  crossover(first: number[], second: number[]): number[] {
    return [(first[0] + second[0]) / 2, (first[1] + second[1]) / 2];
  }

  mutate(samples: number[]): number[] {
    const random = this.random;
    return samples.map(function(sample) {
      const [x, y] = random;
      return sample + (x > 0.5 ? 1 : -1) * 3 * y * sample;
    });
  }
}

const random = new Random("foo");
const initial = [];
for (let i = 0; i < 100; i++) {
  const [x, y] = random;
  initial.push([x, y]);
}

const algorithm = new GeneticAlgorithm<number[]>(
  new Evolution(random),
  [maximize, minimize],
  eq
);

let generation = algorithm.optimize(initial, 10, 10, 10);

let [keys, frontier] = generation.population.frontiers.last();
let optimals = frontier.optimals.values();

console.log("OPTIMIZING...");
console.log(`1:\tFITNESS ${keys}\tOPTIMALS ${optimals}`);
for (let i = 2; i <= 1000; i++) {
  generation = generation.search();
  [keys, frontier] = generation.population.frontiers.last();
  optimals = frontier.optimals.values();
  console.log(`${i}:\tFITNESS ${keys}\tOPTIMAL ${optimals}`);
}
