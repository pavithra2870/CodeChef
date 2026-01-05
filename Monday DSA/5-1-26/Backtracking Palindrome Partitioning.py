class Solution:
    def partitionString(self,s):
        n=len(s)
        res=[]
        isPali=[[False]*(n) for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i,n):
                if s[i]==s[j] and (j-i<=2 or isPali[i+1][j-1]):
                    isPali[i][j]=True
        def bt(path,start):
            if start==n: 
                res.append(path[:])
                return
            for end in range(start,n):
                if isPali[start][end]:
                    path.append(s[start:end+1])
                    bt(path,end+1)
                    path.pop()
        bt([],0)
        return res
