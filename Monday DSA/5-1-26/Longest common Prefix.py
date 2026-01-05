def longestCommonPrefix(strs):
    prefix=strs[0]
    lenn=len(prefix)
    for i in range(lenn):
        for s in strs[1:]:
            if i==len(s) or s[i]!=prefix[i]: return s[:i]
    return prefix
