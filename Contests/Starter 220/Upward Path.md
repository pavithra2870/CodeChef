[question](https://www.codechef.com/problems/UPPATH?tab=statement)

solution: dont remember shi 

```python
import sys

def solve():
    data=sys.stdin.read().split()
    if not data:return
    t=int(data[0])
    p=1
    out=[]
    for _ in range(t):
        n=int(data[p]);p+=1
        a=list(map(int,data[p:p+n]));p+=n
        b=list(map(int,data[p:p+n]));p+=n
        top=[10**30]*n
        top[0]=min(a[0],b[0])
        for i in range(1,n):
            x=a[i]
            y=b[i]
            best=10**30
            if x>=top[i-1]:best=min(best,x)
            if y>=top[i-1]:best=min(best,y)
            top[i]=best
            if best==10**30:break
        bot=[-10**30]*n
        bot[n-1]=max(a[n-1],b[n-1])
        for i in range(n-2,-1,-1):
            x=a[i]
            y=b[i]
            best=-10**30
            if x<=bot[i+1]:best=max(best,x)
            if y<=bot[i+1]:best=max(best,y)
            bot[i]=best
            if best==-10**30:break
        ok=False
        for i in range(n):
            if top[i]!=10**30 and bot[i]!=-10**30:
                for u,v in ((a[i],b[i]),(b[i],a[i])):
                    if (i==0 or u>=top[i-1]) and (i==n-1 or v<=bot[i+1]) and u<=v:
                        ok=True
                        break
            if ok:break
        out.append("Yes" if ok else "No")
    sys.stdout.write("\n".join(out))

solve()
