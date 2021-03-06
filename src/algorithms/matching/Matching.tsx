import { NewGraphAlgorithm, ParameterDescriptor, Step } from "@/GraphAlgorithm";
import { AdjacencyList, hasMultipleEdges, hasSelfLoop, Edge, Graph, Node, NodeEdgeList } from "@/GraphStructure";
import { Queue } from "@/utils/DataStructure";
import NetworkGraphRenderer from "@/ui/render/NetworkGraphRenderer";
import GraphMatrixInput from "@/ui/input/GraphMatrixInput";
import { EdgeListFormatter } from "@/ui/input/GraphFormatter";
import { GraphRenderer } from "@/ui/render/GraphRenderer";

// !!! alpha version !!!
export class EdmondsGabow_alpha implements NewGraphAlgorithm {
  category: string = "Matching";
  name: string = "mm_gabow";
  description: string = "[alpha version] Edmonds-Gabow algorithm for Maximum Matching in General Graph";

  // TODO: no self loop, no multiple edges
  graphInputComponent = (
    <GraphMatrixInput
      checker={g => g}
      formatters={[new EdgeListFormatter(false, false)]}
      description={"Please input a graph without self loop and multiple edges"}
    />
  );
  graphRenderer: GraphRenderer = new NetworkGraphRenderer(false, "generic", {
    node: {
      borderColor: node => (node.datum.label === 0 ? "#333333" : node.datum.label === 1 ? "#77ff77" : "#7777ff"),
      fillingColor: node => (node.datum.label === 0 ? "#cccccc" : "#ffffff"),
      floatingData: node => node.id.toString()
    },
    edge: {
      thickness: edge => (edge.datum.matched || edge.datum.marked ? 5 : 3),
      color: edge => {
        if (edge.datum.matched) return "#333333";
        if (edge.datum.marked) return "#ff3333";
        return "#cccccc";
      }
    }
  });
  parameters: ParameterDescriptor[] = [];

  // old code
  private n: number = 0;
  private nodes: Node[] = [];
  private edges: Edge[] = [];
  private adjlist: AdjacencyList;
  private matched: number = 0;

  private mark: number[] = [];
  private match: number[] = [];
  private label: number[] = [];
  private path: number[][] = [];
  private first: number[] = [];
  private visit: boolean[] = [];

  private que: Queue<number> = new Queue<number>();

  clear(buf: any[], val: any = -1, cnt: number = this.n) {
    for (let _ = 0; _ < cnt; ++_) buf[_] = val;
  }

  reverse(buf: any[], l: number = 0, r: number = buf.length) {
    for (let i = l, j = r - 1; i < j; ++i, --j) {
      let tmp = buf[i];
      buf[i] = buf[j];
      buf[j] = tmp;
    }
  }

  gen1(p: number, x: number, z: number) {
    this.path[z] = [-1];
    this.path[z].push(z);
    this.path[z].push(this.match[z]);
    for (let i = 1; ; ++i) {
      this.path[z].push(this.path[x][i]);
      if (this.path[x][i] === p) break;
    }
  }

  gen2(p: number, y: number, z: number, t: number) {
    this.path[t] = [-1];
    for (let i = 1; ; ++i) {
      this.path[t].push(this.path[y][i]);
      if (this.path[y][i] === t) break;
    }
    this.reverse(this.path[t], 1);
    for (let i = 1; ; ++i) {
      this.path[t].push(this.path[z][i]);
      if (this.path[z][i] === p) break;
    }
  }

  is_matched(e: Edge): boolean {
    return this.match[e.source] === e.target;
  }

  is_marked(e: Edge): boolean {
    return this.mark[e.source] === e.target;
  }

  report(): NodeEdgeList {
    this.nodes.forEach((node, i) =>
      Object.assign(node.datum, {
        match: this.match[i],
        label: this.label[i],
        first: this.first[i]
      })
    );
    this.edges.forEach(edge =>
      Object.assign(edge.datum, {
        marked: this.is_marked(edge),
        matched: this.is_matched(edge)
      })
    );
    this.clear(this.mark);

    return new NodeEdgeList(this.nodes, this.edges);
  }

  getStep(lineId: number): Step {
    return {
      graph: this.report(),
      codePosition: new Map<string, number>([["pseudo", lineId]]),
      extraData: [
        ["$matched$", "number", this.matched],
        ["$first$", "array", this.first]
      ]
    };
  }

  *rematch(p: number, x: number, y: number) {
    this.path[x][0] = y;
    // path[x] is the augmenting path to be fliped
    for (let i = 0; ; ++i) {
      this.mark[this.path[x][i]] = this.path[x][i ^ 1];
      if (this.path[x][i] === p) break;
    }
    yield this.getStep(25); // found augmenting path
    for (let i = 0; ; ++i) {
      this.match[this.path[x][i]] = this.path[x][i ^ 1];
      if (this.path[x][i] === p) break;
    }
    yield this.getStep(27); // augmented
  }

  next(pos: number): number {
    return this.first[this.path[this.match[pos]][3]];
  }

  *check(pos: number) {
    this.clear(this.label, 0);
    this.clear(this.first);
    this.clear(this.path, []);
    this.que.clear();

    this.que.push(pos);
    this.path[pos] = [-1];
    this.path[pos].push(pos);
    this.label[pos] = 2;

    while (!this.que.empty()) {
      let x = this.que.front();
      this.que.pop();

      for (let e of this.adjlist.adjacentEdges(x)) {
        let y = e.target;
        if (this.label[y] === 0) {
          if (this.match[y] === -1) {
            // find an augmenting path
            yield* this.rematch(pos, x, y);
            return true;
          }
          let z = this.match[y];
          this.label[y] = 1;
          this.label[z] = 2;
          this.first[z] = y;
          this.que.push(z);
          this.gen1(pos, x, z);
        } else if (this.label[y] === 2) {
          if (this.first[x] === this.first[y]) continue;

          let t = -1;
          this.clear(this.visit, false);
          for (let j = this.first[x]; j !== -1; j = this.next(j)) this.visit[j] = true;
          for (let j = this.first[y]; j !== -1; j = this.next(j)) {
            if (this.visit[j]) {
              t = j;
              break;
            }
          }

          for (let j = this.first[x]; j !== t; j = this.next(j)) {
            // noinspection JSSuspiciousNameCombination
            this.gen2(pos, x, y, j);
            this.label[j] = 2;
            this.que.push(j);
            this.first[j] = t;
          }

          for (let j = this.first[y]; j !== t; j = this.next(j)) {
            this.gen2(pos, y, x, j);
            this.label[j] = 2;
            this.que.push(j);
            this.first[j] = t;
          }

          for (let j = 0; j < this.n; ++j)
            if (this.label[j] === 2 && this.label[this.first[j]] === 2) this.first[j] = t;
        }
      }
    }
    return false;
  }

  *run(graph: Graph): Generator<Step> {
    if (hasSelfLoop(graph)) throw new Error("algo Gabow : self loop");
    this.adjlist = AdjacencyList.from(graph, false);
    if (hasMultipleEdges(this.adjlist)) throw new Error("algo Gabow : mutiple edges");
    this.edges = graph.edges();
    this.nodes = graph.nodes();
    this.n = this.nodes.length;
    this.matched = 0;
    yield this.getStep(23); // inited
    this.clear(this.match);
    this.clear(this.mark);
    for (let i = 0; i < this.n; ++i) if (this.match[i] === -1 && (yield* this.check(i))) ++this.matched;
    //console.log(`algo Gabow : {matched: ${res}}`);
    yield this.getStep(28); // return
    return { matched: this.matched };
  }
}

/*
Reference:

void PROC_GEN1(int u,int x,int z){
  path[z][1] = z;
  path[z][2] = mate[z];
  for(int i = 1;;++i){
    path[z][i + 2] = path[x][i];
    if(path[x][i] == u) return;
  }
}//path(z)??????????????????z??????????????????mate(z)??????????????????path(x)

void PROC_GEN2(int u,int y,int z,int p){
  int i,j;
  for(i = 1;;++i){
    path[p][i] = path[y][i];
    if(path[y][i] == p) break;
  }
  for(j = 1;j < i + 1 - j;++j) swap(path[p][j],path[p][i + 1 - j]);
  //??????y~p???????????????????????????????????????????????????

  for(j = 1;;++j){
    path[p][j + i] = path[z][j];
    if(path[z][j] == u) return;
  }
}//path(p)??????????????????path(y)???????????????(???y???p?????????)???????????????????????????path(z)

void PROC_REMATCH(int u,int x,int y){
  path[x][0] = y;//?????????path(x)?????????0???????????????????????????y???u????????????
  for(int i = 0;;++i){
    mate[path[x][i]] = path[x][i ^ 1];
    //??????????????????????????????????????????????????????????????????
    //???????????????:math[x][0]???math[x][1]?????????math[x][2]???math[x][3]????????????
    if(path[x][i] == u) return;
  }
}

bool PROC_FIND(int u){
  int i,j,x,y,z,join;
  for(i = 1;i <= n;++i) label[i] = path[i][0] = path[i][1] = path[i][2] = path[i][3] = first[i] = 0;
  h = t = 0;//??????????????????
  queue[++t] = u;path[u][1] = u;label[u] = 2;
  while(h < t){//??????bfs????????????
    x = queue[++h];
    for(i = fir[x];i;i = e[i].nxt){
      y = e[i].to;//?????????(x,y)
      if(!label[y]){
        if(!mate[y]){//??????1???y???????????????
          PROC_REMATCH(u,x,y);//???????????????????????????????????????
          return 1;
        }
        //??????2???y??????????????????????????????
        //???????????????y???????????????????????????????????????z????????????
        label[y] = 1;
        z = mate[y];
        queue[++t] = z;label[z] = 2;first[z] = y;
        PROC_GEN1(u,x,z);//??????z?????????????????????
      }
      else if(label[y] == 2){//??????3???y?????????????????????????????????????????????????????????
        if(first[x] == first[y]) continue;//????????????????????????????????????????????????????????????
        join = 0;
        for(j = first[x];j;j = first[path[mate[j]][3]]) visit[j] = 1;
        for(j = first[y];j;j = first[path[mate[j]][3]]) if(visit[j]){
          join = j;break;
        }
        for(j = first[x];j;j = first[path[mate[j]][3]]) visit[j] = 0;
        //????????????????????????join
        //??????????????????x??????????????????????????????????????????????????????????????????
        //??????y?????????????????????????????????????????????????????????????????????????????????????????????join

        //???x~join?????????????????????????????????????????????????????????????????????????????????
        for(j = first[x];j != join;j = first[path[mate[j]][3]]){
          PROC_GEN2(u,x,y,j);
          label[j] = 2;queue[++t] = j;first[j] = join;
        }

        //???y~join?????????????????????????????????????????????????????????????????????????????????
        for(j = first[y];j != join;j = first[path[mate[j]][3]]){
          PROC_GEN2(u,y,x,j);
          label[j] = 2;queue[++t] = j;first[j] = join;
        }

        //??????first???????????????????????????first??????????????????????????????join
        for(j = 1;j <= n;++j) if(label[j] == 2 && label[first[j]] == 2) first[j] = join;
      }
    }
  }
  return 0;
}
*/
