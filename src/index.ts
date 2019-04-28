import GeneticAlgorithm from "./GeneticAlgorithm";

function maximize(first: number, second: number): number {
  return first - second;
}

function minimize(first: number, second: number): number {
  return second - first;
}

function fitness(x: number[]): number[] {
  return [x[0], Math.abs(Math.PI - x[1])];
}

function crossover(first: number[], second: number[]): number[] {
  return [(first[0] + second[0]) / 2, (first[1] + second[1]) / 2];
}

function mutate(samples: number[]): number[] {
  return samples.map(
    sample =>
      sample + (Math.random() > 0.5 ? 1 : -1) * 3 * Math.random() * sample
  );
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

const algorithm = new GeneticAlgorithm<number[]>(
  "foo",
  [maximize, minimize],
  eq,
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
let optimals = frontier.optimals.values();

console.log("OPTIMIZING...");
console.log(`1:\tFITNESS ${keys}\tOPTIMALS ${optimals}`);
for (let i = 2; i <= 100000; i++) {
  generation = generation.search();
  [keys, frontier] = generation.population.frontiers.last();
  optimals = frontier.optimals.values();
  console.log(`${i}:\tFITNESS ${keys}\tOPTIMAL ${optimals}`);
}
