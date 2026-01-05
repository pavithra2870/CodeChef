def romanToInt(s):
    mapp={"I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000}
    res=0 
    stack=[]
    for char in s:
        if stack and stack[-1]<mapp[char]: 
            res+=mapp[char]-stack.pop()
        else: stack.append(mapp[char])
    while stack: res+=stack.pop()
    return res
