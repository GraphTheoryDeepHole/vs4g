module.exports = {
  mf_ff: "",
  mf_ek:
    '<font color="#dddddd">灰色</font>点 $\\color{#dddddd}\\bullet$：[BFS] 未访问节点；  \n' +
    '<font color="#3333ff">蓝色</font>点 $\\color{#3333ff}\\bullet$：[BFS] 已访问，在队中；  \n' +
    '<font color="#dddd00">黄色</font>点 $\\color{#dddd00}\\bullet$：[BFS] 队首节点；  \n' +
    '<font color="#33ff33">绿色</font>点 $\\color{#33ff33}\\bullet$：[BFS] 已出队；  \n' +
    "**加粗**边：在增广路中；  \n" +
    '<font color="#33ff33">绿色</font>边 $\\color{#33ff33}\\rightarrow$：**正向**出现在增广路中；  \n' +
    '<font color="#ff3333">红色</font>边 $\\color{#ff3333}\\rightarrow$：**反向**出现在增广路中；  \n' +
    '<font color="#dddddd">灰色</font>边 $\\color{#dddddd}\\rightarrow$：不在增广路中；   \n' +
    "边数据 $(x,y)$：$x$ 为容量，$y$ 为流量。",
  mf_dinic: "",

  mcf_classic: "",
  mcf_zkw: "",

  mbm_hungarian: "",
  mwbm_km: "",
  mm_gabow: "",

  pt_dmp: "",

  DFS:
    "灰色点：尚未被访问  \n\
蓝色点：已被访问  \n\
黄色点：当前正被访问的点，且当前正在前进寻找未被访问的点  \n\
绿色点：当前正被访问的点，且当前由于无法前进正在后退",
  BFS:
    "灰色点：尚未被访问  \n\
蓝色点：已被访问并入队  \n\
黄色点：点在队首，正在进行遍历其所有后继节点的操作  \n\
绿色点：已出队，不会被再次访问",
  CriticalPath:
    "灰色点：尚未进行拓扑排序  \n\
蓝色点：已进行拓扑排序  \n\
黄色点：已计算出到该节点的最长路径  \n\n\
蓝色边：未被访问  \n\
粉色边：已被访问",
  EulerPath: "灰色点：当前未被访问  \n\
蓝色点：当前正在被访问  \n\n\
蓝色边：未被访问  \n\
粉色边：已被访问",
  HamiltonPath:
    "灰色点：点不在当前的搜索路径上  \n\
蓝色点：点在当前的搜索路径上  \n\
黄色点：该点当前正在被访问  \n\n\
蓝色边：边不再当前的搜索路径上  \n\
粉色边：边在当前的搜索路径上",
  Dijkstra:
    "灰色点：点未被访问  \n\
蓝色点：该点为所有未被访问的点中dist值最小的点，当前正被访问  \n\
黄色点：该点为当前被访问的点的后继  \n\
绿色点：该点为当前被访问的点的后继且dist值已更新  \n\
淡粉色点：点已被访问  \n\n\
蓝色边：未被访问  \n\
粉色边：已被访问",
  Ford:
    "灰色点：当前未被访问  \n\
黄色点：当前与该点相连接的一条边正在被访问  \n\n\
蓝色边：当前未被访问  \n\
粉色边：当前正在被访问",
  Kruskal:
    "蓝色边：未被访问  \n\
黄色边：正在被访问  \n\
粉色边：已被访问且是最小生成树中的边  \n\
绿色边：已被访问且不是最小生成树中的边",
  Prim: "蓝色边：未被访问  \n\
粉色边：已被访问且是最小生成树中的边",
  SalesmanProblem: "蓝色边：当前未被选择  \n\
粉色边：根据分支限界法思路，当前被选择的边",
  SalesmanCheaperAlgorithm: "蓝色边：当前未被选择  \n\
粉色边：当前回路中的边"
};
