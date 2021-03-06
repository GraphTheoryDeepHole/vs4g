import { Graph } from "./GraphStructure";
import { EdgeRenderHint, NodeRenderHint } from "@/ui/render/NetworkGraphRenderer";
import { GraphRenderer } from "@/ui/render/GraphRenderer";

// check if res = Number(text) is an integer and res \in [lowerbound, upperbound)
export function parseRangedInt(text: string, lowerbound: number, upperbound: number): number {
  let res = Number(text);
  if (res !== parseInt(text) || isNaN(res)) throw new Error(".input.error.not_an_integer");
  if (res < lowerbound || res >= upperbound) throw new Error(".input.error.out_of_range");
  return res;
}

export function rangedIntParser(lower_bound: number | ((text: string, graph: Graph) => number),
                                upper_bound: number | ((text: string, graph: Graph) => number))
  : (text: string, graph: Graph) => number {
  return (text, graph) => {
    const lb = typeof lower_bound === "number" ? lower_bound : lower_bound(text, graph);
    const ub = typeof upper_bound === "number" ? upper_bound : upper_bound(text, graph);
    return parseRangedInt(text, lb, ub);
  };
}

export interface ParameterDescriptor {
  readonly name: string;
  readonly parser: (text: string, graph: Graph) => any;
}

class Step {
  /**
   * @param graph The intermediate results of the step of algorithm.
   * @param codePosition Point out the position of code line when executing ot this step. This map contains the [name, position] pairs.
   * For example, the 4th step of pseudocode can be ["pseudo", 4].
   * @param extraData Extra data produced by the algorithm. This array contains the [name, type, data] tuples .name can be a valid markdown string.
   * type suggests the display method of data, such as "map", "stack", "list".
   */
  constructor(
    public readonly graph: Graph,
    public readonly codePosition?: Map<string, number>,
    public readonly extraData?: [string, string, any][]
  ) {
  }
}

abstract class GraphAlgorithm {
  /**
   * check a graph if it can be a valid input for this algorithm.
   * @return the l18n key of error message or null if input is valid
   */
  graphPreCheck(graph: Graph): string {
    return null;
  }

  abstract id(): string;

  abstract run(graph: Graph, ...args: any[]): Generator<Step>;

  // TODO: can be static
  parameters(): ParameterDescriptor[] {
    return [];
  }

  abstract nodeRenderPatcher(): Partial<NodeRenderHint>;

  abstract edgeRenderPatcher(): Partial<EdgeRenderHint>;
}

export interface NewGraphAlgorithm {
  category: string;
  name: string;
  description: string;
  run: (graph: Graph, ...args: any[]) => Generator<Step>;
  graphInputComponent: JSX.Element;
  graphRenderer: GraphRenderer;
  parameters: ParameterDescriptor[];
}

export { GraphAlgorithm, Step };
