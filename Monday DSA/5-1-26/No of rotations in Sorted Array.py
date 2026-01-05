class Solution:
    def count_rotations(self, nums):
        # index of pivot element is the answer
        l,h=0,len(nums)-1
        while l<h:
            m=(l+h)//2
            if nums[m]>nums[h]: l=m+1 
            else: h=m
        return l
