t=int(input())
for _ in range(t):
    n=int(input())
    a=[int(x) for x in input().split()] 
    c=[int(x) for x in input().split()] 
    for i in range(1,n):
        c[i]=min(c[i],c[i-1])
    ans=0
    for i in range(n):
        ans+=c[i]*a[i]
    print(ans)
  # asked in MotorQ OA
