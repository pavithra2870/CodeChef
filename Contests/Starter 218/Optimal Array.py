MOD = 998244353
for _ in range(T):
    N,M=[int(x) for x in input().split()]
    if N == 1:
        print(str((M + 1) % MOD))
        continue
    if M == 0:
        print("1")
        continue
    k = M.bit_length()
    max_xor_val = (1 << k) - 1
    limit_low = max_xor_val ^ M
    count = (M - limit_low + 1)
    print(str(count % MOD))
