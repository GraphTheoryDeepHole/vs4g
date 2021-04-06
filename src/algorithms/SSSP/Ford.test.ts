import { Ford } from "./Ford";
import { AdjacencyMatrix } from "../../GraphStructure";

test("Ford", () => {
  let mat = [
    [0, 7, 1, 0, 0, 0],
    [0, 0, 0, 4, 0, 1],
    [0, 6, 0, 0, 2, 7],
    [0, 0, 0, 0, 0, 0],
    [0, 3, 0, 5, 0, 0],
    [0, 0, 0, 0, 3, 0]
  ].map(line => line.map(weight => (weight == 0 ? undefined : { weight: weight })));
  let graph = new AdjacencyMatrix(mat, true);
  let res: number[][] = [];
  for (let step of new Ford().run(graph, 0)) {
    res.push(step.graph.nodes().map(n => n.datum.dist));
  }
  console.table(res);
});
