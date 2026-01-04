<img width="819" height="319" alt="image" src="https://github.com/user-attachments/assets/c94e073f-f9d5-48d2-b497-6ce19c23919b" />

def maximalCrosses(n, A):
    L  = [[0]*n for _ in range(n)]
    R  = [[0]*n for _ in range(n)]
    U  = [[0]*n for _ in range(n)]
    D  = [[0]*n for _ in range(n)]
    TL = [[0]*n for _ in range(n)]
    BR = [[0]*n for _ in range(n)]
    TR = [[0]*n for _ in range(n)]
    BL = [[0]*n for _ in range(n)]

    #Forward scan
    for i in range(n):
        for j in range(n):
            if A[i][j] == 'X':
                L[i][j]  = 1 + (L[i][j-1] if j > 0 else 0)
                U[i][j]  = 1 + (U[i-1][j] if i > 0 else 0)
                TL[i][j] = 1 + (TL[i-1][j-1] if i > 0 and j > 0 else 0)
                TR[i][j] = 1 + (TR[i-1][j+1] if i > 0 and j < n-1 else 0)

    #Backward scan
    for i in range(n-1, -1, -1):
        for j in range(n-1, -1, -1):
            if A[i][j] == 'X':
                R[i][j]  = 1 + (R[i][j+1] if j < n-1 else 0)
                D[i][j]  = 1 + (D[i+1][j] if i < n-1 else 0)
                BR[i][j] = 1 + (BR[i+1][j+1] if i < n-1 and j < n-1 else 0)
                BL[i][j] = 1 + (BL[i+1][j-1] if i < n-1 and j > 0 else 0)

    #Build answer
    B = [[0]*n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if A[i][j] == 'X':
                h  = L[i][j]  + R[i][j]  - 1
                v  = U[i][j]  + D[i][j]  - 1
                d1 = TL[i][j] + BR[i][j] - 1
                d2 = TR[i][j] + BL[i][j] - 1
                B[i][j] = max(h, v, d1, d2)

    return B
