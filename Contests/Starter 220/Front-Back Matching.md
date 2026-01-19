Question:

You can freely rearrange the characters of S however you like.

After rearrangement, is it possible to make the first and last characters of S equal?

Solution: 

If any character appears twice -> we can put in first and last

``` python
t=int(input())
from collections import Counter
for _ in range(t):
    n=int(input())
    s=input()
    c=Counter(s)
    ans=False
    for x,y in c.items():
        if y==2:
            ans=True
            break 
    if ans: print("Yes")
    else: print("No")
```
