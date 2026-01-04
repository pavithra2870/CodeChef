def myAtoi(s: str) -> int:
    s = s.strip()
    if not s:
        return 0
    sign = 1
    i = 0
    n = len(s)
    if s[0] == '-':
        sign = -1
        i = 1
    elif s[0] == '+':
        i = 1
    num = 0
    while i < n and s[i].isdigit():
        digit = ord(s[i]) - ord('0')
        # Overflow check before adding digit
        if num > 214748364 or (num == 214748364 and digit > 7):
            return 2147483647 if sign == 1 else -2147483648
        num = num * 10 + digit
        i += 1
    return sign * num
