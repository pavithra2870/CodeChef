t=int(input())
for _ in range(t):
    n,m=[int(x) for x in input().split()]
    if (m-n)%2==0 and n<=m<=3*n: print("YES")
    else: print("NO")
