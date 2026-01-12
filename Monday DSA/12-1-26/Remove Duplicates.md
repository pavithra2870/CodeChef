def remove_duplicates(nums):
   k,n=1,len(nums)
   l=r=1
   while l<=r and r<n:
       while r<n and nums[r]==nums[r-1]: r+=1 
       if r<n:
           nums[l]=nums[r]
           l+=1
           k+=1
           r+=1
   return k
