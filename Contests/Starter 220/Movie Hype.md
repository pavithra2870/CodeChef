question:

all odd numbered seats are occupied. you got even numbered seats to sit. sit in the seat which is least noisy

noise of seat = max(left side seat, right side seat)

```python
t=int(input())
for _ in range(t):
    n=int(input())
    a=[int(x) for x in input().split()]
    res=max(a)
    for i in range(len(a)-1):
        res=min(res,max(a[i],a[i+1]))
    print(res)
