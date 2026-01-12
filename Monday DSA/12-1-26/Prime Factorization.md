class Solution:
    def primeFactorization(self, arr):
        res=[]
        for num in arr:
            p=[]; o=num
            while num%2==0:
                p.append(2)
                num=num//2
            i=3
            while i*i<=o:
                while num%i==0:
                    p.append(i)
                    num//=i 
                i+=2 
            if num!=1: p.append(num)
            res.append(p)
        return res
