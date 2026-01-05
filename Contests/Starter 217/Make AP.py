import math
t=int(input())
for _ in range(t):
    n=int(input())
    arr=[int(x) for x in input().split()]
    if n==2:
        print(0)
        continue
    diffs=[]
    ans=0
    for i in range(1,n):
        diffs.append(arr[i]-arr[i-1])
    common_d=diffs[0]
    for i in range(1,len(diffs)):
        common_d=math.gcd(common_d,diffs[i])
    for d in diffs:
        ans+=(d//common_d)-1 
    print(ans)
