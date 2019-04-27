import GeneticAlgorithm from "./GeneticAlgorithm";

function maximize(first: number, second: number): number {
  return first - second;
}

function minimize(first: number, second: number): number {
  return second - first;
}

function fitness(x: number[]): number[] {
  return [x[0] * x[0], 4 * x[1]];
}

function crossover(first: number[], second: number[]): number[] {
  return [(first[0] + second[0]) / 2, (first[1] + second[1]) / 2];
}

function mutate(samples: number[]): number[] {
  if (Math.random() > 0.5) {
    return samples.map(sample => sample - Math.random());
  } else {
    return samples.map(sample => sample + Math.random());
  }
}

const algorithm = new GeneticAlgorithm<number[]>(
  "foo",
  [maximize, minimize],
  fitness,
  crossover,
  mutate,
  10,
  10,
  10
);

const initial = [];
for (let i = 0; i < 100; i++) {
  initial.push([Math.random(), Math.random()]);
}

let generation = algorithm.optimize(initial);

let [keys, frontier] = generation.population.frontiers.last();
let optimal = frontier.optimal;

console.log(`GENERATION 1 FITNESS ${keys} OPTIMAL ${optimal}`);
console.log("OPTIMIZING...");
for (let i = 2; i <= 10; i++) {
  generation = generation.search();
  [keys, frontier] = generation.population.frontiers.last();
  optimal = frontier.optimal;
  console.log(`GENERATION ${i} FITNESS ${keys} OPTIMAL ${optimal}`);
}
