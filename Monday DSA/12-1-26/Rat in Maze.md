class Solution:
    def findAllPaths(self, n, grid):
        if grid[0][0]==0 or grid[-1][-1]==0: return []
        res=[]
        dirs=[('D',1,0),('R',0,1),('L',0,-1),('U',-1,0)]
        def dfs(i,j,path):
            grid[i][j]=0
            if i==n-1 and j==n-1: 
                res.append(''.join(path))
                grid[i][j]=1
                return 
            for symb,r,c in dirs:
              if 0<=i+r<n and 0<=j+c<n and grid[i+r][j+c]==1 and grid[i+r][j+c]==1:
                path.append(symb)
                dfs(i+r,j+c,path)
                path.pop()
            grid[i][j]=1
        dfs(0,0,[])
        return sorted(res) 
