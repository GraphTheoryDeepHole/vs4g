import { NewGraphAlgorithm, ParameterDescriptor, Step } from "@/GraphAlgorithm";
import CanvasGraphRenderer from "@/ui/render/NetworkGraphRenderer";
import { AdjacencyMatrix, Graph } from "@/GraphStructure";
import { GraphRenderer } from "@/ui/render/GraphRenderer";
import GraphMatrixInput from "@/ui/input/GraphMatrixInput";
import { EdgeListFormatter } from "@/ui/input/GraphFormatter";

export class Kruskal implements NewGraphAlgorithm {
  category: string = "MST";
  name: string = "Kruskal";
  description: string = "Kruskal";
  graphInputComponent = (
    <GraphMatrixInput
      checker={g => g}
      description={"Please input an weighted & undirected graph"}
      formatters={[new EdgeListFormatter(true, false)]}
    />
  );
  graphRenderer: GraphRenderer = new CanvasGraphRenderer(true, "generic", {
    node: {
      fillingColor: undefined,
      floatingData: undefined
    },
    edge: {
      color: edge => {
        if (edge.datum.chosen == 1) {
          return "#db70db";
        } else if (edge.datum.chosen == 2) {
          return "#ffff00";
        } else if (edge.datum.chosen == 3) {
          return "#adff2f";
        } else {
          return undefined;
        }
      },
      floatingData: edge => edge.datum.weight
    }
  });
  parameters: ParameterDescriptor[] = [];

  father = [];

  //并查集
  getFather(node: number) {
    if (this.father[node] != node) {
      this.father[node] = this.getFather(this.father[node]);
    }
    return this.father[node];
  }

  *run(graph: Graph): Generator<Step> {
    let edges = [];
    let counter = 0;
    Object.assign(edges, AdjacencyMatrix.from(graph, false).edges());

    //排序（冒泡排序）
    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < edges.length - 1; j++) {
        if (edges[j].datum.weight > edges[j + 1].datum.weight) {
          let tmp = edges[j];
          edges[j] = edges[j + 1];
          edges[j + 1] = tmp;
        }
      }
      graph.edges()[i].datum.chosen = 0;
    }

    //并查集初始化
    for (let i = 0; i < graph.nodes().length; i++) {
      this.father[i] = i;
    }

    //Kruskal
    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < graph.edges().length; j++) {
        if (graph.edges()[j].source == edges[i].source && graph.edges()[j].target == edges[i].target) {
          graph.edges()[j].datum.chosen = 2;
        }
      }

      yield {
        graph: graph,
        codePosition: new Map<string, number>([["pseudo", 0]])
      };

      this.father[edges[i].source] = this.getFather(edges[i].source);
      this.father[edges[i].target] = this.getFather(edges[i].target);
      if (this.father[edges[i].source] != this.father[edges[i].target]) {
        this.father[this.father[edges[i].source]] = this.father[edges[i].target];
        counter++;
        for (let j = 0; j < graph.edges().length; j++) {
          if (graph.edges()[j].source == edges[i].source && graph.edges()[j].target == edges[i].target) {
            graph.edges()[j].datum.chosen = 1;
          }
        }
      }

      for (let j = 0; j < graph.edges().length; j++) {
        if (graph.edges()[j].datum.chosen == 2) {
          graph.edges()[j].datum.chosen = 3;
        }
      }

      yield {
        graph: graph,
        codePosition: new Map<string, number>([["pseudo", 1]])
      };

      if (counter == graph.nodes().length - 1) {
        break;
      }
    }

    yield {
      graph: graph,
      codePosition: new Map<string, number>([["pseudo", 2]])
    };
  }
}
