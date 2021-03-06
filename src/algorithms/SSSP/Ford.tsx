import { NewGraphAlgorithm, ParameterDescriptor, rangedIntParser, Step } from "@/GraphAlgorithm";
import NetworkGraphRenderer from "@/ui/render/NetworkGraphRenderer";
import { Graph } from "@/GraphStructure";
import { GraphRenderer } from "@/ui/render/GraphRenderer";
import GraphMatrixInput from "@/ui/input/GraphMatrixInput";
import { EdgeListFormatter } from "@/ui/input/GraphFormatter";

export class Ford implements NewGraphAlgorithm {
  category: string = "SSSP";
  name: string = "Ford";
  description: string = "Ford";
  graphInputComponent = (
    <GraphMatrixInput
      checker={g => g}
      description={"Please input a weighted & directed graph"}
      formatters={[new EdgeListFormatter(true, true)]}
    />
  );
  graphRenderer: GraphRenderer = new NetworkGraphRenderer(true, "generic", {
    node: {
      fillingColor: node => (node.datum.visited == true ? "#ffff00" : undefined),
      floatingData: node =>
        `(${node.id},${node.datum.dist != Infinity && node.datum.dist != undefined ? node.datum.dist : "?"})`
    },
    edge: {
      color: edge => (edge.datum.chosen == true ? "#db70db" : undefined),
      floatingData: edge => edge.datum.weight
    }
  });
  parameters: ParameterDescriptor[] = [
    {
      name: "start_point",
      parser: rangedIntParser(0, (_: string, graph: Graph) => graph.nodes().length)
    }
  ];

  * run(graph: Graph, startPoint: number): Generator<Step> {
    graph.nodes().forEach(n => ((n.datum.dist = Infinity), (n.datum.visited = false)));
    graph.edges().forEach(e => (e.datum.chosen = false));
    graph.nodes()[startPoint].datum.dist = 0;

    yield {
      graph: graph,
      codePosition: new Map<string, number>([["pseudo", 0]])
    };

    for (let flag = 0; ; flag = 0) {
      for (let edge of graph.edges()) {
        yield {
          graph: graph,
          codePosition: new Map<string, number>([["pseudo", 1]])
        };
        edge.datum.chosen = true;
        graph.nodes()[edge.source].datum.visited = true;
        graph.nodes()[edge.target].datum.visited = true;
        if (graph.nodes()[edge.source].datum.dist + edge.datum.weight < graph.nodes()[edge.target].datum.dist) {
          graph.nodes()[edge.target].datum.dist = graph.nodes()[edge.source].datum.dist + edge.datum.weight;
          flag = 1;
        }
        yield {
          graph: graph,
          codePosition: new Map<string, number>([["pseudo", 2]])
        };
        edge.datum.chosen = false;
        graph.nodes()[edge.source].datum.visited = false;
        graph.nodes()[edge.target].datum.visited = false;
      }
      yield {
        graph: graph,
        codePosition: new Map<string, number>([["pseudo", 1]])
      };
      yield {
        graph: graph,
        codePosition: new Map<string, number>([["pseudo", 3]])
      };
      if (flag == 0) {
        break;
      }
    }
    yield {
      graph: graph,
      codePosition: new Map<string, number>([["pseudo", 4]])
    };
  }
}
