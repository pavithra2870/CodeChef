[question](https://www.codechef.com/problems/TWOPLG?tab=statement)

solution: only the number of biscuits matter (odd or even)

```python
t=int(input())
for _ in range(t):
    x,y=[int(x) for x in input().split()]
    if x%2==0: print("Bob")
    else: print("Alice")
