class Solution:
    def canColorGraph(self, N, M, E, edges):
        g=[[] for _ in range(N)]
        for u,v in edges:
            g[u].append(v)
            g[v].append(u)
        colors=[0]*N
        def issafe(node,c):
            for nei in g[node]:
                if colors[nei]==c: return False
            return True
        def dfs(node):
            if node==N: return True
            for c in range(1,M+1):
                if issafe(node,c):
                    colors[node]=c 
                    if dfs(node+1): return True
                    colors[node]=0
                    
            return False
        return dfs(0)
