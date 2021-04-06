import React from "react";
import { MethodComponent } from "@/ui/GraphInputPanel";
import { AdjacencyMatrix, Graph } from "@/GraphStructure";
import MatrixInputComponent from "@/ui/input-methods/MatrixInputComponent";

let AdjacencyMatrixComponent: MethodComponent = props => {
  let { graph, setGraph, setRenderType } = props;
  let options: [string, boolean][] = [
    ["directed", props.renderType?.directed || true],
    ["weighted", graph.edges()[0]?.datum.weight != null]
  ];
  const toString = (g: Graph) => {
    let graph = AdjacencyMatrix.from(g, options[0][1]);
    return graph.mat
      .map(line =>
        line
          .map(datum => {
            if (datum === undefined) return "0";
            if (datum.weight === undefined) return "1";
            return String(datum.weight);
          })
          .join(" ")
      )
      .join("\n");
  };
  let content, error;
  try {
    content = toString(graph);
  } catch (e) {
    error = e.message;
  }
  const onSync = (numbers, options) => {
    let mat: any[][] = numbers.map(line =>
      line.map(v => {
        if (v === 0) return undefined;
        if (options[1]) return { weight: v };
        if (v !== 1) throw new Error(".input.error.zero_or_one");
        return {};
      })
    );
    let graph = new AdjacencyMatrix(mat, options[0]);
    setGraph(graph);
    setRenderType({
      directed: options[0],
      bipartite: false,
      dmp: false
    });
  };

  return <MatrixInputComponent initContent={content} initError={error} options={options} onSync={onSync} />;
};

export default AdjacencyMatrixComponent;
