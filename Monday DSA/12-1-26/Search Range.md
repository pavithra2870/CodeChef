def search_range(arr, key):
    n=len(arr)
    def find_first():
        l,h=0,n-1
        ans=-1
        while l<=h:
            m=(l+h)//2
            if arr[m]==key:
                ans=m 
                h=m-1
            elif arr[m]<key: l=m+1
            else: h=m-1
        return ans
    def find_last():
        l,h=0,n-1
        ans=-1
        while l<=h:
            m=(l+h)//2
            if arr[m]==key:
                ans=m 
                l=m+1 
            elif arr[m]<key: l=m+1 
            else: h=m-1
        return ans
    ans=[find_first(),find_last()]
    return ans 
