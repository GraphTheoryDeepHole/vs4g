module.exports = {
  mf_ff: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>FordFulkerson</u> ($\\mathrm{G}$, $s$, $t$):",
      [
        "**comment**:",
        [
          "Ford-Fulkerson Algorithm for Maximum Flow, **return** maximum *flow* of $\\mathrm{G}$ from $s$ to $t$.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *network flow graph*;  $\\mathrm{E}\\subset\\left\\{\\left(u,v,c\\right)\\middle|u,v\\in\\mathrm{V}\\right\\}$: *set* of *edge*;  $c$: *capacity* of *edge*;  $s,t\\in\\mathrm{V}$: *source vertex* and *sink vertex*;  $\\mathrm{G}_r=\\left(\\mathrm{V},\\mathrm{E}_r\\right)$: *residual graph* of $\\mathrm{G}$;  $\\mathrm{E}_r\\subset\\left\\{e=\\left(u,v,r_e\\right)\\right\\}$: *set* of *residual edge*, $\\forall \\left(u,v,c\\right)\\in\\mathrm{E}:\\ e=\\left(u,v,r_e\\right),\\bar{e}=(v,u,r_{\\bar{e}})\\in\\mathrm{E}_r,r_e+r_{\\bar{e}}=c$;  $r_e$: *residual capacity*, *capacity* of $e$;  $\\bar{e}$: *reverse edge* of $e$;  *valid edge* $e\\in\\mathrm{E}_r$: $r_e>0$;  *augmenting path*: *path* through ONLY *valid edge*;  $\\mathrm{P}_{st}$: *augmenting path* from $s$ to $t$."
        ],
        "**function** <u>dfsFindAugmentingPathFrom</u> ($v$):",
        [
          "**comment**:",
          [
            "find *augmenting path* using **DFS**, **return** whether $\\exists$ *augmenting path* from $v$ to $t$.",
            "$v$: current *vertex*."
          ],
          "mark $v$ as *visited*.",
          "**if** $v=t$:  **return** **true**.    **comment**:  found $\\mathrm{P}_{st}.$",
          "**for each** *valid edge* $\\left(v,u,r_e\\right)\\in\\mathrm{E}_r$:",
          ["**if** $u$ is not *visited* **and** <u>dfsFindAugmentingPathFrom</u> ($u$):  **return** **true**."],
          "**return** **false**."
        ],
        "**for each** $\\left(u,v,c\\right)\\in\\mathrm{E}$:  $r_e:=c$, $r_{\\bar{e}}:=0$.",
        "$maxflow:=0$.  $\\color\\red{\\bullet}$",
        "**while** <u>dfsFindAugmentingPathFrom</u> ($s$):  $\\color\\red{\\bullet}$",
        [
          "$\\delta:=$ **minimum** of $r_e$ **for each** $e\\in\\mathrm{P}_{st}$.",
          "**for each** $e\\in\\mathrm{P}_{st}$:  $r_e:=r_e-\\delta$, $r_{\\bar{e}}:=r_{\\bar{e}}+\\delta$.",
          "$maxflow:=maxflow+\\delta$.  $\\color\\red{\\bullet}$",
          "clear *visited* mark **for each** $v\\in\\mathrm{V}$."
        ],
        "$\\color\\red{\\bullet}$  **return** $maxflow$."
      ]
    ]
  },
  mf_ek: {
    pseudo: [
      "伪代码中用到的一些概念：",
      "- **残量网络**：节点与原网络流图相同；原图中一条有向边 $e=(u,v)$ 对应着参量网络中 $e_1 = (u,v),e_2=(v,u)$ 两条**残量边**，其中 $e_1$ 的**剩余容量**为 $e$ 的容量减去流量，$e_2$ 的**剩余容量**为 $e$ 的流量。",
      "- **增广路**：这里定义为残量网络中从源点到汇点的、各残量边剩余容量均 $>0$ 的路径，它也对应着一条原网络流图中的路径（允许原图中的边反向出现在此路径中）",
      "`1` （找增广路）使用BFS在残量网络中寻找增广路，若找到了一条增广路，转步骤`2`；若无法找到，转步骤`4`；",
      "`2` （计算增广流量）对增广路上所有残量边的剩余容量求最小值，得到能够增广的最大流量 $\\delta$，将$maxflow$ 增大 $\\delta$，转步骤`3`；",
      "`3` （增广）枚举增广路中每条边，若它正向出现在增广路中则将他的流量减去 $\\delta$，若反向则增加 $\\delta$，转步骤`1`；",
      "`4` 算法结束。"
    ],
    pseudo_en: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>EdmondsKarp</u> ($\\mathrm{G}$, $s$, $t$):",
      [
        "**comment**:",
        [
          "Edmonds-Karp Algorithm for Maximum Flow, **return** maximum *flow* of $\\mathrm{G}$ from $s$ to $t$.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *network flow graph*;  $\\mathrm{E}\\subset\\left\\{\\left(u,v,c\\right)\\middle|u,v\\in\\mathrm{V}\\right\\}$: *set* of *edge*;  $c$: *capacity* of *edge*;  $s,t\\in\\mathrm{V}$: *source vertex* and *sink vertex*;  $\\mathrm{G}_r=\\left(\\mathrm{V},\\mathrm{E}_r\\right)$: *residual graph* of $\\mathrm{G}$;  $\\mathrm{E}_r\\subset\\left\\{e=\\left(u,v,r_e\\right)\\right\\}$: *set* of *residual edge*, $\\forall \\left(u,v,c\\right)\\in\\mathrm{E}:\\ e=\\left(u,v,r_e\\right),\\bar{e}=(v,u,r_{\\bar{e}})\\in\\mathrm{E}_r,r_e+r_{\\bar{e}}=c$;  $r_e$: *residual capacity*, *capacity* of $e$;  $\\bar{e}$: *reverse edge* of $e$;  *valid edge* $e\\in\\mathrm{E}_r$: $r_e>0$;  *augmenting path*: *path* through ONLY *valid edge*;  $\\mathrm{P}_{st}$: *augmenting path* from $s$ to $t$."
        ],
        "**function** <u>bfsFindAugmentingPath</u> ():",
        [
          "**comment**:",
          [
            "find *augmenting path* using **BFS**, **return** whether $\\exists$ $\\mathrm{P}_{st}$.",
            "$\\mathrm{Q}$: *queue*."
          ],
          "clear $\\mathrm{Q}$, clear *visited* mark **for each** $v\\in\\mathrm{V}$",
          "mark $s$ as *visited*, push $s$ into $\\mathrm{Q}$.",
          "**while** $\\mathrm{Q}$ is not *empty*:",
          [
            "$v:=$ *front* of $\\mathrm{Q}$, pop $v$ from $\\mathrm{Q}$.",
            "**if** $v=t$:  **return** **true**.    **comment**:  found $\\mathrm{P}_{st}$",
            "**for each** *valid edge* $\\left(v,u,r_e\\right)\\in\\mathrm{E}_r$:",
            ["**if** $u$ is not *visited*:", ["mark $u$ as *visited*, push $u$ into $\\mathrm{Q}$."]]
          ],
          "**return** **false**."
        ],
        "**for each** $\\left(u,v,c\\right)\\in\\mathrm{E}$:  $r_e:=c$, $r_{\\bar{e}}:=0$.",
        "$maxflow:=0$.  $\\color\\red{\\bullet}$",
        "**while** <u>bfsFindAugmentingPath</u> ():  $\\color\\red{\\bullet}$",
        [
          "$\\delta:=$ **minimum** of $r_e$ **for each** $e\\in\\mathrm{P}_{st}$.",
          "**for each** $e\\in\\mathrm{P}_{st}$:  $r_e:=r_e-\\delta$, $r_{\\bar{e}}:=r_{\\bar{e}}+\\delta$.",
          "$maxflow:=maxflow+\\delta$.  $\\color\\red{\\bullet}$"
        ],
        "$\\color\\red{\\bullet}$  **return** $maxflow$."
      ]
    ]
  },
  mf_dinic: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>Dinic</u> ($\\mathrm{G}$, $s$, $t$):",
      [
        "**comment**:",
        [
          "Dinic Algorithm for Maximum Flow, **return** maximum *flow* of $\\mathrm{G}$ from $s$ to $t$.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *network flow graph*;  $\\mathrm{E}\\subset\\left\\{\\left(u,v,c\\right)\\middle|u,v\\in\\mathrm{V}\\right\\}$: *set* of *edge*;  $c$: *capacity* of *edge*;  $s,t\\in\\mathrm{V}$: *source vertex* and *sink vertex*;  $\\mathrm{G}_r=\\left(\\mathrm{V},\\mathrm{E}_r\\right)$: *residual graph* of $\\mathrm{G}$;  $\\mathrm{E}_r\\subset\\left\\{e=\\left(u,v,r_e\\right)\\right\\}$: *set* of *residual edge*, $\\forall \\left(u,v,c\\right)\\in\\mathrm{E}:\\ e=\\left(u,v,r_e\\right),\\bar{e}=(v,u,r_{\\bar{e}})\\in\\mathrm{E}_r,r_e+r_{\\bar{e}}=c$;  $r_e$: *residual capacity*, *capacity* of $e$;  $\\bar{e}$: *reverse edge* of $e$;  *valid edge*: $e\\in\\mathrm{E}_r,r_e>0$;  *augmenting path*: *path* through ONLY *valid edge*;  $\\mathrm{P}_{st}$: *augmenting path* from $s$ to $t$;  $depth_v$: *minimum distance* of $v\\in\\mathrm{V}$ through *valid edge* from $s$."
        ],
        "**function** <u>bfsCalculateDepth</u> ():",
        [
          "**comment**:",
          [
            "calculate $depth_v$ for all *vertex* using **BFS**, **return** whether $t$ is *reachable* from $t$ in $\\mathrm{G}_l$.",
            "$\\mathrm{Q}$: *queue*."
          ],
          "clear $\\mathrm{Q}$, clear *visited* mark **for each** $v\\in\\mathrm{V}$.",
          "mark $s$ as *visited*, push $s$ into $\\mathrm{Q}$, $depth_s:=0$.",
          "**while** $\\mathrm{Q}$ is not *empty*:",
          [
            "$v:=$ *front* of $\\mathrm{Q}$, pop $v$ from $\\mathrm{Q}$.",
            "**if** $v=t$:  **return** **true**.    **comment**:  reached $t$.",
            "**for each** *valid edge* $e=\\left(v,u,r_e\\right)\\in\\mathrm{E}_r$:",
            [
              "**if** $u$ is not *visited*:",
              ["mark $u$ as *visited*, push $u$ into $\\mathrm{Q}$, $depth_u:=depth_v+1$."]
            ]
          ],
          "**return** **false**."
        ],
        "**function** <u>dfsAugment</u> ($v$, $limit$):",
        [
          "**comment**:",
          [
            "augment in $\\mathrm{G}_r$ using **DFS**, **return** *flow* augmented.",
            "$v$: current *vertex*;  $limit$: *upperbound* of *flow* to be augmented."
          ],
          "**if** $v=t$:  $\\color\\red{\\bullet}$  **return** $limit$.    **comment**:  reach $t$, augment by $limit$.",
          "$\\sigma:=0$.",
          "**for each** *unchecked valid edge* $e=\\left(v,u,r_e\\right)\\in\\mathrm{E}_r$:",
          [
            "**if** $depth_u=depth_v+1$:    **comment**:  $e$ is in *level graph* of $\\mathrm{G}_r$ with respect to $depth_\\mathrm{V}$.",
            [
              "$\\delta:=$ <u>dfsAugment</u> ($u$, **minimum** of $limit$ and $r_e$).",
              "$r_e:=r_e-\\delta$, $r_{\\bar{e}}:=r_{\\bar{e}}+\\delta$.",
              "$limit:=limit-\\delta$, $\\sigma:=\\sigma+\\delta$.",
              "**if** $limit=0$:  **return** $\\sigma$;",
              "mark $e$ as *checked*."
            ]
          ],
          "**return** $\\sigma$."
        ],
        "**for each** $\\left(u,v,c\\right)\\in\\mathrm{E}$:  $r_e:=c$, $r_{\\bar{e}}:=0$.",
        "$maxflow:=0$.  $\\color\\red{\\bullet}$",
        "**while** <u>bfsCalculateDepth</u> ():  $\\color\\red{\\bullet}$",
        [
          "**for each** $e\\in\\mathrm{E}_r$:  mark $e$ as *unchecked*.",
          "$\\delta:=$ <u>dfsAugment</u> ($s$, $+\\infty$).",
          "$maxflow:=maxflow+\\delta$.  $\\color\\red{\\bullet}$"
        ],
        "$\\color\\red{\\bullet}$  **return** $maxflow$."
      ]
    ]
  },
  mcf_classic: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>ClassicMCF</u> ($\\mathrm{G}$, $s$, $t$, $flowlimit$):",
      [
        "**comment**:",
        [
          "Classic Algorithm for Minimum-Cost maximum Flow, **return** maximum *flow* ($\\leq flowlimit$) of $\\mathrm{G}$ from $s$ to $t$ and its minimum *cost*.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *weighted network flow graph*;  $\\mathrm{E}\\subset\\left\\{\\left(u,v,c_a,c_o\\right)\\middle|u,v\\in\\mathrm{V}\\right\\}$: *set* of *edge*;  $c_a$: *capacity* of *edge*;  $c_o$: *cost* of *edge*;  $s,t\\in\\mathrm{V}$: *source vertex* and *sink vertex*;  $flowlimit$: *upperbound* of maximum *flow*;  $\\mathrm{G}_r=\\left(\\mathrm{V},\\mathrm{E}_r\\right)$: *residual graph* of $\\mathrm{G}$;  $\\mathrm{E}_r\\subset\\left\\{e=\\left(u,v,r_e,c_e\\right)\\right\\}$: *set* of *residual edge*, $\\forall \\left(u,v,c_a,c_o\\right)\\in\\mathrm{E}:\\ e=\\left(u,v,r_e,c_o\\right),\\bar{e}=(v,u,r_{\\bar{e}},-c_o)\\in\\mathrm{E}_r,r_e+r_{\\bar{e}}=c$;  $r_e$: *residual capacity*, *capacity* of $e$;  $\\bar{e}$: *reverse edge* of $e$;  *valid edge* $e\\in\\mathrm{E}_r$: $r_e>0$;  *augmenting path*: *minimum-cost path* through ONLY *valid edge*;  $\\mathrm{P}_{st}$: *augmenting path* from $s$ to $t$;  $dis_v$: minimum *cost* from $s$ to $v$."
        ],
        "**function** <u>spfaFindAugmentingPath</u> ():",
        [
          "**comment**:",
          [
            "find *minimum-cost* *augmenting path* using **SPFA**, **return** whether $\\exists$ $\\mathrm{P}_{st}$.",
            "$\\mathrm{Q}$: *queue*."
          ],
          "clear $\\mathrm{Q}$.",
          "**for each** $v\\in\\mathrm{V}$:  $dis_v:=+\\infty$.",
          "$dis_s:=0$, push $s$ into $\\mathrm{Q}$, mark $s$ as *inqueue*.",
          "**while** $\\mathrm{Q}$ is not *empty*:",
          [
            "$v:=$ *front* of $\\mathrm{Q}$, pop $v$ from $\\mathrm{Q}$, clear *inqueue* mark of $v$.",
            "**for each** *valid edge* $\\left(v,u,r_e,c_e\\right)\\in\\mathrm{E}_r$:",
            [
              "**if** $dis_u>dis_v+c_e$:",
              [
                "$dis_u:=dis_v+c_e$.",
                "**if** $u$ is not *inqueue*:",
                ["push $u$ into $\\mathrm{Q}$, mark $u$ as *inqueue*."]
              ]
            ]
          ],
          "**return** whether $dis_t\\neq+\\infty$.    **comment**:  $dis_t\\neq+\\infty\\Leftrightarrow$ $t$ is *reachable* through *valid edge* from $s\\Leftrightarrow\\exists\\ \\mathrm{P}_{st}$."
        ],
        "**for each** $\\left(u,v,c_a,c_o\\right)\\in\\mathrm{E}$:  $r_e:=c_a$, $r_{\\bar{e}}:=0$, $c_e:=c_o$, $c_{\\bar{e}}:=-c_o$.",
        "$maxflow:=0$, $mincost:=0$  $\\color\\red{\\bullet}$",
        "**while** <u>spfaFindAugmentingPath</u> ():  $\\color\\red{\\bullet}$",
        [
          "$\\delta:=$ **minimum** of $flowlimit$ and $r_e$ **for each** $e\\in\\mathrm{P}_{st}$.",
          "**for each** $e\\in\\mathrm{P}_{st}$:  $r_e:=r_e-\\delta$, $r_{\\bar{e}}:=r_{\\bar{e}}+\\delta$.",
          "$flowlimit:=flowlimit-\\delta$.",
          "$maxflow:=maxflow+\\delta$, $mincost:=mincost+\\delta\\cdot dis_t$  $\\color\\red{\\bullet}$"
        ],
        "$\\color\\red{\\bullet}$  **return** $maxflow$, $mincost$."
      ]
    ]
  },
  mcf_zkw: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>ZkwMCF</u> ($\\mathrm{G}$, $s$, $t$):",
      [
        "**comment**:",
        [
          "Zkw's Algorithm for Minimum-Cost maximum Flow, **return** maximum *flow* ($\\leq flowlimit$) of $\\mathrm{G}$ from $s$ to $t$ and its minimum *cost*.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *weighted network flow graph*;  $\\mathrm{E}\\subset\\left\\{\\left(u,v,c_a,c_o\\right)\\middle|u,v\\in\\mathrm{V}\\right\\}$: *set* of *edge*;  $c_a$: *capacity* of *edge*;  $c_o$: *cost* of *edge*;  $s,t\\in\\mathrm{V}$: *source vertex* and *sink vertex*;  $flowlimit$: *upperbound* of maximum *flow*;  $\\mathrm{G}_r=\\left(\\mathrm{V},\\mathrm{E}_r\\right)$: *residual graph* of $\\mathrm{G}$;  $\\mathrm{E}_r\\subset\\left\\{e=\\left(u,v,r_e,c_e\\right)\\right\\}$: *set* of *residual edge*, $\\forall \\left(u,v,c_a,c_o\\right)\\in\\mathrm{E}:\\ e=\\left(u,v,r_e,c_o\\right),\\bar{e}=(v,u,r_{\\bar{e}},-c_o)\\in\\mathrm{E}_r,r_e+r_{\\bar{e}}=c$;  $r_e$: *residual capacity*, *capacity* of $e$;  $\\bar{e}$: *reverse edge* of $e$;  *valid edge* $e\\in\\mathrm{E}_r$: $r_e>0$;  *augmenting path*: *minimum-cost path* through ONLY *valid edge*;  $\\mathrm{P}_{st}$: *augmenting path* from $s$ to $t$;  $dis_v$: minimum *cost* from $s$ to $v$."
        ],
        "**function** <u>spfaFindAugmentingPath</u> ():",
        [
          "**comment**:",
          [
            "find *minimum-cost* *augmenting path* using **SPFA**, **return** whether $\\exists$ $\\mathrm{P}_{st}$.",
            "$\\mathrm{Q}$: *queue*."
          ],
          "clear $\\mathrm{Q}$.",
          "**for each** $v\\in\\mathrm{V}$:  $dis_v:=+\\infty$.",
          "$dis_s:=0$, push $s$ into $\\mathrm{Q}$, mark $s$ as *inqueue*.",
          "**while** $\\mathrm{Q}$ is not *empty*:",
          [
            "$v:=$ *front* of $\\mathrm{Q}$, pop $v$ from $\\mathrm{Q}$, clear *inqueue* mark of $v$.",
            "**for each** *valid edge* $\\left(v,u,r_e,c_e\\right)\\in\\mathrm{E}_r$:",
            [
              "**if** $dis_u>dis_v+c_e$:",
              [
                "$dis_u:=dis_v+c_e$.",
                "**if** $u$ is not *inqueue*:",
                ["push $u$ into $\\mathrm{Q}$, mark $u$ as *inqueue*."]
              ]
            ]
          ],
          "**return** whether $dis_t\\neq+\\infty$.    **comment**:  $dis_t\\neq+\\infty\\Leftrightarrow$ $t$ is *reachable* through *valid edge* from $s\\Leftrightarrow\\exists\\ \\mathrm{P}_{st}$."
        ],
        "**function** <u>dfsAugment</u> ($v$, $limit$):",
        [
          "**comment**:",
          [
            "augment in $\\mathrm{G}_r$ using **DFS**, **return** *flow* augmented.",
            "$v$: current *vertex*;  $limit$: *upperbound* of *flow* to be augmented."
          ],
          "**if** $v=t$:  $\\color\\red{\\bullet}$  **return** $limit$.    **comment**:  reach $t$, augment by $limit$.",
          "mark $v$ as *visited*, $\\sigma:=0$.",
          "**for each** *valid edge* $e=\\left(v,u,r_e,c_e\\right)\\in\\mathrm{E}_r$:",
          [
            "**if** $u$ is not *visited* **and** $dis_u=dis_v+c_e$:    **comment**:  $e$ is in *SSSP graph* of $\\mathrm{G}_r$.",
            [
              "$\\delta:=$ <u>dfsAugment</u> ($u$, **minimum** of $limit$ and $r_e$).",
              "$r_e:=r_e-\\delta$, $r_{\\bar{e}}:=r_{\\bar{e}}+\\delta$.",
              "$limit:=limit-\\delta$, $\\sigma:=\\sigma+\\delta$.",
              "**if** $limit=0$:  **return** $\\sigma$;"
            ]
          ],
          "**return** $\\sigma$."
        ],
        "**for each** $\\left(u,v,c_a,c_o\\right)\\in\\mathrm{E}$:  $r_e:=c_a$, $r_{\\bar{e}}:=0$, $c_e:=c_o$, $c_{\\bar{e}}:=-c_o$.",
        "$maxflow:=0$, $mincost:=0$  $\\color\\red{\\bullet}$",
        "**while** <u>spfaFindAugmentingPath</u> ():  $\\color\\red{\\bullet}$",
        [
          "**do**:",
          [
            "clear *visited* mark **for each** $v\\in\\mathrm{V}$.",
            "$\\delta:=$ <u>dfsAugment</u> ($s$, $flowlimit$).",
            "$flowlimit:=flowlimit-\\delta$.",
            "$maxflow:=maxflow+\\delta$, $mincost:=mincost+\\delta\\cdot dis_t$  $\\color\\red{\\bullet}$"
          ],
          "**while** $\\delta>0$."
        ],
        "$\\color\\red{\\bullet}$  **return** $maxflow$, $mincost$."
      ]
    ]
  },
  mbm_hungarian: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>Hungarian</u> ($\\mathrm{G}$):",
      [
        "**comment**:",
        [
          "Hungarian Algorithm for Maximum Bipartite Matching, **return** maximum matching of $\\mathrm{G}$.",
          "$\\mathrm{G}=\\left(\\mathrm{X},\\mathrm{Y},\\mathrm{E}\\right)$: *bipartite graph*;  $\\mathrm{X},\\mathrm{Y}$: *set* of *vertex*;  $\\mathrm{E}\\subset\\left\\{e=\\left(x,y\\right)\\middle|x\\in\\mathrm{X},y\\in\\mathrm{Y}\\right\\}$: *set* of *edge*;  $\\mathrm{P}$: *augmenting path* in $\\mathrm{G}$."
        ],
        "**function** <u>dfsFindAugmentingPathFrom</u> ($x$):",
        [
          "**comment**:",
          [
            "find *augmenting path* using **DFS**, **return** whether $\\exists$ $\\mathrm{P}$ from $x$.",
            "$x$: current *vertex*."
          ],
          "**for each** $\\left(x,y\\right)\\in\\mathrm{E}$:",
          [
            "**if** $y$ is not *visited*:",
            [
              "mark $y$ as *visited*.",
              "**if** $y$ is *matched* with $x'$:",
              ["**if** <u>dfsFindAugmentingPathFrom</u> ($x'$):  **return** **true**."],
              "**else**:  $\\color\\red{\\bullet}$  **return** **true**.    **comment**:  found $\\mathrm{P}$ to $y$."
            ]
          ],
          "**return** **false**."
        ],
        "$matched:=0$.  $\\color\\red{\\bullet}$",
        "**for each** $x\\in\\mathrm{X}$:",
        [
          "clear *visited* mark **for each** $y\\in\\mathrm{Y}$.",
          "**if** <u>dfsFindAugmentingPathFrom</u> ($x$):",
          [
            "**for each** $e\\in\\mathrm{P}_l$: flip *matching status* of $e$ (*matched* $\\leftrightarrow$ *unmatched*).",
            "$matched:=matched+1$.  $\\color\\red{\\bullet}$"
          ]
        ],
        "$\\color\\red{\\bullet}$  **return** $matched$."
      ]
    ]
  },
  mwbm_km: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>KuhnMunkres</u> ($\\mathrm{G}$):",
      [
        "**comment**:",
        [
          "Kuhn-Munkres Algorithm for Maximum Weighted Bipartite Matching, **return** maximum weighted matching of $\\mathrm{G}$",
          "$\\mathrm{G}=\\left(\\mathrm{X},\\mathrm{Y},\\mathrm{E}\\right)$: *weighted bipartite graph*;  $\\mathrm{X},\\mathrm{Y}$: *set* of *vertex*;  $\\mathrm{E}=\\left\\{e_{ij}=\\left(x_i,y_j,w_{ij}\\right)\\middle|x_i\\in\\mathrm{X},y_j\\in\\mathrm{Y}\\right\\}$: *set* of *edge*;  $w_{ij}$: *weight* of $e_{ij}$;  $lx_i,ly_j$: *label* of $x_i,y_j$;  $\\mathrm{S}$: *subset* of $\\mathrm{X}$;  $\\mathrm{T}$: *subset* of $\\mathrm{Y}$;  *tight-edge* $e_{ij}$: $lx_i+ly_j=w_{ij}$;  $\\mathrm{G}_l$: *tight-edge subgraph* of $\\mathrm{G}$;  $\\mathrm{P}_l$: *augmenting path* in $\\mathrm{G}_l$."
        ],
        "**for each** $x_i\\in\\mathrm{X}$:  $lx_i:=$ **maximum** of $w_{ij}$ **for each** $y_j\\in\\mathrm{Y}$.",
        "**for each** $y_j\\in\\mathrm{Y}$:  $ly_j:=0$.  $\\color\\red{\\bullet}$",
        "**for each** $x\\in\\mathrm{X}$:",
        [
          "$\\mathrm{S}:=\\left\\{x\\right\\}$, $\\mathrm{T}:=\\emptyset$.  $\\color\\red{\\bullet}$",
          "**do**:",
          [
            "**while** $\\exists$ *tight edge* $e_{ij}$ from $\\mathrm{S}$ to $\\mathrm{Y}\\backslash\\mathrm{T}$:",
            [
              "add $y_j$ to $\\mathrm{T}$.",
              "**if** $y_j$ is *matched* with $x_k$:  add $x_k$ to $\\mathrm{S}$.  $\\color\\red{\\bullet}$",
              "**else**:  found $\\mathrm{P}_l$ from $x$ to $y_j$, **go to** <u>augment</u>."
            ],
            "$\\delta :=$ **minimum** of  $lx_i+ly_j-w_{ij}$ **for each** $e_{ij}$ from $\\mathrm{S}$ to $\\mathrm{Y}\\backslash\\mathrm{T}$.",
            "**for each** $x_i\\in\\mathrm{S}$:  $lx_i := lx_i -\\delta$.",
            "**for each** $y_j\\in\\mathrm{T}$:  $ly_j := ly_j +\\delta$.  $\\color\\red{\\bullet}$"
          ],
          "**while** $\\nexists$ $\\mathrm{P}_l$."
        ]
      ],
      "<u>augment</u>:  $\\color\\red{\\bullet}$",
      [
        [
          "**for each** $e\\in\\mathrm{P}_l$: flip *matching status* of $e$ (*matched* $\\leftrightarrow$ *unmatched*).   $\\color\\red{\\bullet}$"
        ],
        "$maxweight := $ **summation** of $lx_i$ **for each** $x_i\\in\\mathrm{X}$ $+$  **summation** of $ly_j$ **for each** $y_j\\in\\mathrm{Y}$.",
        "$\\color\\red{\\bullet}$  **return** $maxweight$."
      ]
    ]
  },
  mm_gabow: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is partially simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>Gabow</u> (G):",
      [
        "**comment**:",
        [
          "Gabow Algorithm for Maximum Matching, **return** maximum matching of $\\mathrm{G}$.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *general undirected graph*;  $\\mathrm{P}$: *augmenting path* in $\\mathrm{G}$."
        ],
        "**function** <u>bfsFindAugmentingPathFrom</u> ($s$):",
        [
          "**comment**:",
          [
            "find *augmenting path* using **BFS**, **return** whether $\\exists$ $\\mathrm{P}$ from $s$.",
            "$s$: *start vertex*;  $\\mathrm{Q}$: *queue* for *outer vertex*;  $\\mathrm{F}_{uv}$: *tree flower*(*odd-length circle*) derived from $u$ and $v$."
          ],
          "clear $\\mathrm{Q}$, clear all mark **for each** $v\\in\\mathrm{V}$.",
          "mark $s$ as *outer*, push $s$ into $\\mathrm{Q}$.",
          "**while** $\\mathrm{Q}$ is not *empty*:",
          [
            "$v:=$ *front* of $\\mathrm{Q}$, pop $v$ from $\\mathrm{Q}$.",
            "**for each** $\\left(v,u\\right)\\in\\mathrm{E}$:",
            [
              "**if** $u$ is not *marked*:",
              [
                "**if** $u$ is *matched* with $t$:",
                ["mark $u$ as *inner*.", "mark $t$ as *outer*, push $t$ into $\\mathrm{Q}$."],
                "**else**:  **return** **true**.    **comment**:  found $\\mathrm{P}$ from $s$ to $u$."
              ],
              "**else if** $u$ is marked as *outer*:    **comment**:  found $\\mathrm{F}_{uv}$.",
              ["**for each** *inner* $t\\in\\mathrm{F}_{uv}$:", ["mark $t$ as *outer*, push $t$ into $\\mathrm{Q}$."]]
            ]
          ],
          "**return** **false**."
        ],
        "$matched:=0$.  $\\color\\red{\\bullet}$",
        "**for each** *unchecked* unmatched $v\\in\\mathrm{V}$:",
        [
          "**if** <u>bfsFindAugmentingPathFrom</u> ($v$):  $\\color\\red{\\bullet}$",
          [
            "**for each** $e\\in\\mathrm{P}$: flip *matching status* of $e$ (*matched* $\\leftrightarrow$ *unmatched*).",
            "$matched:=matched+1$.  $\\color\\red{\\bullet}$"
          ]
        ],
        "$\\color\\red{\\bullet}$  **return** $matched$."
      ]
    ]
  },
  pt_dmp: {
    pseudo: [
      "<u>**NOTE**</u>: This Pseudo Code is GREATLY simplified and does NOT strictly correspond to internal implementation.",
      "**function** <u>DMP</u> ($\\mathrm{G}$):",
      [
        "**comment**:",
        [
          "Demoucron-Malgrange-Pertuiset Algorithm for Planar Testing, **return** *planarity* of $\\mathrm{G}$.",
          "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *general undirected graph*;  $\\mathrm{BC}$: *set* of *biconnected component* of $\\mathrm{G}$."
        ],
        "**function** <u>dmpTest</u> ($\\mathrm{G}$):",
        [
          "**comment**:",
          [
            "test *planarity* of *biconnected component* using **DMP**, **return** *planarity* of $\\mathrm{G}$.",
            "$\\mathrm{G}=\\left(\\mathrm{V},\\mathrm{E}\\right)$: *biconnected component*;  $\\mathrm{G}'=\\left(\\mathrm{V}',\\mathrm{E}',\\mathrm{Faces}\\right)$: *planar embedding* of $\\mathrm{G}$;  $\\mathrm{Faces}$: *set* of *face* of $\\mathrm{G}$;  $\\mathrm{ValidFaces}_{fragment}\\subset\\mathrm{Faces}$: *set* of *embeddable face* for $fragment$;  $\\mathrm{Fragments}$: *set* of *fragment* of $\\mathrm{G}$ with respect to $\\mathrm{G}'$;  $\\mathrm{P}_{u,v}$: *path* from $u$ to $v$."
          ],
          "$\\color\\red{\\bullet}$  remove *self loop* and *multiple edges* $\\in\\mathrm{E}$, *vertex* whose *degree* $\\leq 2$ $\\in\\mathrm{}V$.  $\\color\\red{\\bullet}$",
          "**if** $\\left|\\mathrm{E}\\right|<9$ **or** $\\left|\\mathrm{V}\\right|<5$:  **return** **true**.",
          "**if** $\\left|\\mathrm{E}\\right|$ > $3\\left|\\mathrm{V}\\right|-6$:  **return** **false**.",
          "select *arbitrary* $\\left(u,v\\right)\\in\\mathrm{E}$, $\\mathrm{V}':=\\left\\{u,v\\right\\}$, $\\mathrm{E}':=\\left\\{\\left(u,v\\right)\\right\\}$, $\\mathrm{Faces}:=\\left\\{\\left[u,v\\right]\\right\\}$.  $\\color\\red{\\bullet}$",
          "**repeat**:",
          [
            "**if** $\\mathrm{Fragments}=\\emptyset$:  **return** **true**.",
            "**if** $\\exists \\ fragment\\in\\mathrm{Fragments}:\\mathrm{ValidFaces}_{i,fragment}=\\emptyset$:  **return** **false**.",
            "**if** $\\exists \\ fragment\\in\\mathrm{Fragments}:\\mathrm{ValidFaces}_{i,fragment}=\\left\\{face\\right\\}$:  $f_r:=fragment$, $f_a:=face$.",
            "**else**:  $f_r:=$ *arbitrary fragment* $\\in\\mathrm{Fragments}$, $f_a:=$ *arbitrary face* $\\in\\mathrm{ValidFace}_{i,f_r}.$",
            "$\\color\\red{\\bullet}$  select *arbitrary unique* $u,v\\in f_a\\cap f_r$, $\\mathrm{P}_{u,v}:=$ *path* $\\in f_r$ from $u$ to $v$.",
            "**for each** $v\\in\\mathrm{P}_{u,v}\\cap \\mathrm{V}$:  add $v$ into $\\mathrm{V}'$.",
            "**for each** $e\\in\\mathrm{P}_{u,v}\\cap \\mathrm{E}$:  add $e$ into $\\mathrm{E}'$.",
            "split $f_a$ into $newface_1,newface_2$ by $\\mathrm{P}_{u,v}$.",
            "replace $f_a\\in\\mathrm{Faces}$ with $newface_1,newface_2$.  $\\color\\red{\\bullet}$"
          ]
        ],
        "$\\color\\red{\\bullet}$  remove *self loop* and *multiple edges* $\\in\\mathrm{E}$, *vertex* whose *degree* $\\leq 2$ $\\in\\mathrm{}V$.  $\\color\\red{\\bullet}$",
        "**if** $\\left|\\mathrm{E}\\right|<9$ **or** $\\left|\\mathrm{V}\\right|<5$:  $planarity:=$ **true**, **go to** <u>end</u>.",
        "**if** $\\left|\\mathrm{E}\\right|$ > $3\\left|\\mathrm{V}\\right|-6$:  $planarity:=$ **false**, **go to** <u>end</u>.",
        "$planarity:=$ **true**.",
        "split $\\mathrm{G}$ into $\\mathrm{BC}$.  $\\color\\red{\\bullet}$",
        "**for each** $\\mathrm{G}_i\\in\\mathrm{BC}$:",
        ["**if** not <u>dmpTest</u> ($\\mathrm{G}_i$):", ["$planarity:=$ **false**, **go to** <u>end</u>."]]
      ],
      "<u>end</u>:",
      ["$\\color\\red{\\bullet}$  **return** $planarity$."]
    ]
  },
  DFS: {
    pseudo: [
      "(1)从给定的点开始DFS，转步骤2；",
      "(2)判断是否可以继续前进，若是转步骤3，否转步骤4，若已回退至起点转步骤5；",
      "(3)前进至该节点的后继节点，转步骤2；",
      "(4)无法前进，回退至该节点的前驱，转步骤2；",
      "(5)算法结束；",
      "**重要提示：请务必输入无权有向简单图，否则不保证算法能正确运行！**"
    ]
  },
  BFS: {
    pseudo: [
      "(1)起始点Dist(st) = 0，并将其放入队列中，转步骤2；",
      "(2)检查队列是否为空，若不空，转步骤3，否则转步骤5：",
      "(3)取出队首元素v，并执行pop操作使v出队，转步骤4；",
      "(4)对于所有e(v, u)，更新Dist(u) = Dist(v) + 1，并将v放入队列中，转步骤2；",
      "(5)算法结束；",
      "**重要提示：请务必输入无权有向简单图，否则不保证算法能正确运行！**"
    ]
  },
  CriticalPath: {
    pseudo: [
      "(1)寻找任一无入边或入边已被全部访问的点，记录其拓扑序，若有点仍未访问，转步骤2，否则转步骤3；",
      "(2)访问该节点的所有出边，转步骤1；",
      "(3)拓扑排序完成，令i的初始值为0，转步骤4开始计算关键路径长度；",
      "(4)若i小于点的总数，转步骤5，否则转步骤6；",
      "(5)利用拓扑序为i的点更新其出边指向的点的路径长度，i←i+1，转步骤4；",
      "(6)算法结束，最长的路径长度即为关键路径长度；",
      "**重要提示：请务必输入带权有向无环简单图，否则不保证算法能正确运行！**",
      "**温馨提示：进行拓扑排序后所有边将统一由已访问状态变为未访问状态，并在计算最长路径的过程中再次访问。**",
      "**温馨提示：本算法的实现过程可能与课本有细节上的不同，但是大体思路是一样的。**"
    ]
  },
  EulerPath: {
    pseudo: [
      "(1)从0号点开始DFS，转步骤2；",
      "(2)判断是否可以继续前进，若是转步骤3，否转步骤4，若已回退至起点转步骤5；",
      "(3)前进至该节点的后继节点，记录欧拉回路信息，转步骤2；",
      "(4)无法前进，回退至该节点的前驱，转步骤2；",
      "(5)算法结束；",
      "**重要提示：请务必输入无权有向简单图，否则不保证算法能正确运行！**",
      "**温馨提示：若算法运行完毕时产生的不是一条回路或图中仍存在某些边未被访问，则该图不存在欧拉回路，请检查你的输入是否正确。**"
    ]
  },
  HamiltonPath: {
    pseudo: [
      "(1)从0号点开始DFS，转步骤2；",
      "(2)判断当前是否已找到哈密顿回路，若是则转步骤6，否则转步骤3；",
      "(3)判断是否可以继续前进，若是转步骤4，否转步骤5，若已回退至起点转步骤6；",
      "(4)前进至该节点的后继节点，转步骤2；",
      "(5)无法前进，回退至该节点的前驱，转步骤2；",
      "(6)算法结束；",
      "**重要提示：请务必输入无权有向简单图，否则不保证算法能正确运行！**",
      "**温馨提示：若算法执行完毕图恢复至初始状态，则图不存在哈密顿回路，若存在一个粉色的圈，则该圈为哈密顿回路。**"
    ]
  },
  Dijkstra: {
    pseudo: [
      "(1)选择dist值最小的节点，转步骤2；",
      "(2)依次访问该节点的所有后继，转步骤3，若访问完毕转步骤4；",
      "(3)更新该节点后继的dist值，转步骤2；",
      "(4)该节点访问完毕，此后不会再被访问，若所有点都已被访问则转步骤5，否则转步骤1；",
      "(5)算法结束；",
      "**重要提示：请务必输入带权有向简单图，否则不保证算法能正确运行！**"
    ]
  },
  Ford: {
    pseudo: [
      "(1)初始时，仅起点dist值为0，转步骤2；",
      "(2)依次遍历每一条边，转步骤3，若遍历完毕转步骤4；",
      "(3)对于边e(u,v)，dist(v) = min(dist(u) + e(u,v), dist(v))，转步骤2；",
      "(4)若遍历过程中未更新任何节点的dist值，转步骤5，否则转步骤2；",
      "(5)算法结束；",
      "**重要提示：请务必输入带权有向简单图，否则不保证算法能正确运行！**"
    ]
  },
  Kruskal: {
    pseudo: [
      "(1)选择当前最短的边，转步骤2，若所有点都已在同一棵生成树中，转步骤3；",
      "(2)若加入该边图中不构成环，则保留该边，否则舍弃该边，转步骤1；",
      "(3)算法结束；",
      "**重要提示：请务必输入带权无向简单图，否则不保证算法能正确运行！**",
      "**温馨提示：当选足n-1条边后，本算法会停止运行而不是继续访问剩余的边，但这不影响算法的正确性。**",
      "**温馨提示：若图不连通，则该算法只能分别生成其各极大连通子图的最小生成树。**"
    ]
  },
  Prim: {
    pseudo: [
      "(1)起初，生成树中只有0号节点，转步骤2；",
      "(2)选择与现有生成树距离最近的边加入生成树，转步骤3；",
      "(3)判断是否已得到全图的一棵生成树，若是则转步骤4，否则转步骤2；",
      "(4)算法结束；",
      "**重要提示：请务必输入带权无向简单连通图，否则不保证算法能正确运行！**"
    ]
  },
  SalesmanProblem: {
    pseudo: [
      "(1)按照边的长度依次选择最短的几条边，转步骤2；",
      "(2)判断选边是否合法并更新答案，转步骤3；",
      "(3)删除最新选择的边，若栈空则转步骤4，否则转步骤1；",
      "(4)算法结束；",
      "**重要提示：请务必输入带权无向简单图，否则不保证算法能正确运行！**",
      '**温馨提示：边的大小排序及选择情况列在extra data中，若该边选中则其值前加有"-"，注意这不代表这条边权值为负。**',
      "**温馨提示：本算法的实现过程可能与课本有细节上的不同，但是大体思路是一样的。**"
    ]
  },
  SalesmanCheaperAlgorithm: {
    pseudo: [
      "(1)开始时，回路仅包含0号点，转步骤2；",
      "(2)寻找与回路最近的点，并将其加入与其距离最近的点旁边的合适位置使得扩大后的回路尽可能小，若已形成哈密顿回路，转步骤3；",
      "(3)算法结束；",
      "**重要提示：请务必输入带权无向简单图，否则不保证算法能正确运行！**",
      "**重要提示：请务必输入完全图，否则不保证算法能正确运行！**"
    ]
  }
};
