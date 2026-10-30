"""Investment and loans, and Annuities (Year 12 Standard 2 focus areas)."""
from common import S, N, money

DOMAIN = "hscmathsFinance"


def fv(pv, r, n):
    return pv * (1 + r) ** n


def fvf(r, n):
    """Future value of an annuity of 1 per period (contributions at the end)."""
    return ((1 + r) ** n - 1) / r


def pvf(r, n):
    """Present value of an annuity of 1 per period."""
    return (1 - (1 + r) ** -n) / r


def c2(x):
    return f"{x:.2f}"


def table(kind, rates, periods, f):
    head = "| Periods | " + " | ".join(f"{r * 100:g}%" for r in rates) + " |"
    sep = "|---|" + "---|" * len(rates)
    rows = [f"| {n} | " + " | ".join(f"{f(r, n):.4f}" for r in rates) + " |" for n in periods]
    return f"{kind} of \\$1 per period (interest rate per period across the top):\n\n" + "\n".join([head, sep] + rows)


FVT = lambda rates, periods: table("Future value", rates, periods, fvf)
PVT = lambda rates, periods: table("Present value", rates, periods, pvf)

# ---- worked numbers
f1 = fv(8000, 0.004, 36)
f2 = 36400 * 0.85 ** 4
f4 = 2400 * ((1 + 0.198 / 365) ** 30 - 1)
f5 = 300 * round(fvf(0.005, 36), 4)
f7rep = round(350000 * 0.005 / (1 - 1.005 ** -300), 2)
f7 = f7rep * 300 - 350000
f8 = 50000 / 1.05 ** 10
f9 = fv(12000, 0.015, 20)
f13 = 2000 * round(fvf(0.04, 10), 4)
f14 = fv(15000, 0.003, 60) - 15000
d1 = fv(5000, 0.04, 3)
d2 = fv(6500, 0.0045, 24) - 6500
d4 = 45000 * 0.82 ** 5
d6 = 1850 * ((1 + 0.2149 / 365) ** 25 - 1)
d12 = 150 * round(fvf(0.005, 24), 4)
d13 = 1800 * round(pvf(0.005, 240), 4)
d15 = 20000 / 1.05 ** 4
d16 = 4.50 * 1.03 ** 5

ITEMS = [
    # ---- Practice Test 1, Section I
    S(1, 1, 2, "Compound interest, monthly",
      r"\$8000 is invested at 4.8% p.a. interest, compounded monthly, for 3 years. Which expression gives the future value?",
      [r"$8000(1.004)^{36}$", r"$8000(1.048)^{36}$", r"$8000(1.048)^{3}$", r"$8000(1.004)^{3}$"],
      r"Monthly compounding means $r = 0.048 \div 12 = 0.004$ per month over $n = 3 \times 12 = 36$ months. " + f"That gives {money(f1)}. " + r"$8000(1.048)^{3}$ is annual compounding.",
      basics="exponentialGrowth"),
    S(1, 1, 2, "Declining-balance depreciation",
      r"A car bought for \$36 400 depreciates at 15% p.a. using the declining-balance method. What is its value after 4 years, to the nearest cent?",
      [money(f2), money(14560), money(36400 * 0.85 ** 3), money(21840)],
      r"$S = V_0(1 - r)^n = 36\,400 \times 0.85^4 = " + c2(f2) + r"$. \$14 560.00 is straight-line depreciation (taking 15% of the purchase price every year).",
      basics="percentChange"),
    S(1, 1, 1, "Dividend yield",
      r"A share costs \$24.50 and pays an annual dividend of \$1.47. What is the dividend yield?",
      ["6%", "16.7%", "0.6%", "1.5%"],
      r"Dividend yield = dividend ÷ share price × 100% = $1.47 \div 24.50 \times 100\% = 6\%$. 16.7% comes from dividing the wrong way round.",
      basics="percents"),
    # ---- Practice Test 1, Section II
    N(1, 2, 3, "Credit card interest",
      r"A credit card charges 19.8% p.a. interest, compounded daily, from the date of purchase. A purchase of \$2400 is paid off after 30 days. How much interest is charged, in dollars, to the nearest cent?",
      [c2(f4)],
      r"Daily rate $= 0.198 \div 365$. Amount owed $= 2400(1 + \frac{0.198}{365})^{30} = " + c2(2400 + f4) + r"$, so the interest is " + money(f4) + ".",
      tol=0.02),
    N(1, 2, 2, "Future value of an annuity (table)",
      r"Mia deposits \$300 at the end of every month for 3 years into an account paying 6% p.a., compounded monthly. Use the table to find the future value of her annuity, in dollars, to the nearest cent." + "\n\n" + FVT([0.005, 0.01, 0.06], [12, 24, 36]),
      [c2(f5)],
      r"Monthly rate $= 6\% \div 12 = 0.5\%$ for $3 \times 12 = 36$ periods: the factor is " + f"{fvf(0.005, 36):.4f}. " + r"$FV = 300 \times " + f"{fvf(0.005, 36):.4f}" + " = " + c2(f5) + r"$. Using the 6% column treats 6% as a monthly rate.",
      tol=0.05),
    N(1, 2, 2, "Reducing-balance loan (recurrence)",
      r"A loan of \$20 000 is charged 9% p.a. interest, compounded monthly. Repayments of \$500 are made at the end of each month, so $A_{n+1} = A_n(1.0075) - 500$. What is the balance owing after 2 months, in dollars, to the nearest cent?",
      ["19297.38"],
      r"After 1 month: $20\,000 \times 1.0075 - 500 = 19\,650$. After 2 months: $19\,650 \times 1.0075 - 500 = 19\,297.375$, which is \$19 297.38.",
      tol=0.01),
    N(1, 2, 2, "Total interest on a loan",
      r"A home loan of \$350 000 is repaid with monthly repayments of " + money(f7rep) + r" for 25 years. How much interest is paid over the life of the loan, in dollars, to the nearest cent?",
      [c2(f7)],
      r"There are $25 \times 12 = 300$ repayments, totalling $300 \times " + c2(f7rep) + " = " + c2(f7rep * 300) + r"$. Interest = total repaid minus the amount borrowed = " + money(f7) + ".",
      tol=0.05),
    S(1, 2, 2, "Present value",
      r"How much must be invested now at 5% p.a., compounded annually, to grow to \$50 000 in 10 years? Give the answer to the nearest cent.",
      [money(f8), money(25000), money(32500), money(50000 / 1.05)],
      r"$PV = \frac{FV}{(1 + r)^n} = \frac{50\,000}{1.05^{10}} = " + c2(f8) + r"$. Dividing by 1.05 once only undoes one year of growth.",
      basics="exponentialGrowth"),
    # ---- Practice Test 2, Section I
    S(2, 1, 2, "Compound interest, quarterly",
      r"\$12 000 is invested at 6% p.a., compounded quarterly, for 5 years. What is the future value, to the nearest cent?",
      [money(f9), money(fv(12000, 0.06, 5)), money(15600), money(fv(12000, 0.015, 5))],
      r"Quarterly: $r = 6\% \div 4 = 1.5\%$ and $n = 5 \times 4 = 20$, so $FV = 12\,000(1.015)^{20} = " + c2(f9) + r"$. \$15 600.00 is simple interest.",
      basics="exponentialGrowth"),
    S(2, 1, 1, "Appreciation",
      r"A painting worth \$5000 increases in value by 8% each year. Which expression gives its value after 6 years?",
      [r"$5000(1.08)^6$", r"$5000(0.92)^6$", r"$5000(1 + 0.08 \times 6)$", r"$5000(1.8)^6$"],
      r"Growing by 8% a year means multiplying by 1.08 each year, 6 times. $5000(1 + 0.08 \times 6)$ is simple growth, which never adds growth on growth.",
      basics="percentChange"),
    S(2, 1, 1, "Reducing the interest on a loan",
      "Which change reduces the total interest paid on a reducing-balance loan, with everything else unchanged?",
      ["Making larger monthly repayments", "Extending the loan term", "Borrowing at a higher interest rate",
       "Making the first repayment later"],
      "Larger repayments pay off the principal faster, so less interest accrues on the balance. A longer term means interest is charged for longer."),
    # ---- Practice Test 2, Section II
    N(2, 2, 3, "Finding a depreciation rate",
      r"A machine bought for \$48 000 is worth \$19 660.80 after 4 years, using the declining-balance method. What is the annual rate of depreciation, as a percentage?",
      ["20"],
      r"$\frac{19\,660.80}{48\,000} = 0.4096 = (1 - r)^4$. Since $0.8^2 = 0.64$ and $0.64^2 = 0.4096$, $1 - r = 0.8$ and the rate is 20%. Dividing the total drop by 4 years gives 14.76%, the straight-line rate.",
      tol=0.05),
    N(2, 2, 2, "Future value of an annuity (table)",
      r"\$2000 is contributed at the end of each year for 10 years to a fund earning 4% p.a., compounded annually. Use the table to find the future value, in dollars, to the nearest cent." + "\n\n" + FVT([0.03, 0.04, 0.05], [5, 10, 15]),
      [c2(f13)],
      r"Read the 4% column at 10 periods: " + f"{fvf(0.04, 10):.4f}. " + r"$FV = 2000 \times " + f"{fvf(0.04, 10):.4f} = {c2(f13)}" + r"$. The contributions alone total \$20 000; the rest is interest.",
      tol=0.05),
    N(2, 2, 2, "Interest earned, monthly compounding",
      r"\$15 000 is invested for 5 years at 3.6% p.a., compounded monthly. How much interest is earned, in dollars, to the nearest cent?",
      [c2(f14)],
      r"$r = 0.036 \div 12 = 0.003$ and $n = 60$. $FV = 15\,000(1.003)^{60} = " + c2(15000 + f14) + r"$, so the interest is " + money(f14) + ".",
      tol=0.02),
    N(2, 2, 2, "Dividends from a dividend yield",
      r"Leo owns 1200 shares, each worth \$17. The dividend yield is 5%. What is his total annual dividend, in dollars?",
      ["1020"],
      r"Each share pays $5\% \times 17 = \$0.85$, so 1200 shares pay $1200 \times 0.85 = \$1020$.",
      basics="percents"),
    N(2, 2, 2, "Annuity recurrence relation",
      r"An annuity grows according to $A_{n+1} = A_n(1.005) + 200$, with $A_0 = 0$. Find $A_3$, the balance after 3 months, in dollars, to the nearest cent.",
      ["603.01"],
      r"$A_1 = 0 \times 1.005 + 200 = 200$, $A_2 = 200 \times 1.005 + 200 = 401$, $A_3 = 401 \times 1.005 + 200 = 603.005$, which is \$603.01.",
      tol=0.01),
    # ---- Drill only
    N(0, 2, 1, "Compound interest, annual",
      r"\$5000 is invested at 4% p.a., compounded annually, for 3 years. What is the future value, in dollars, to the nearest cent?",
      [c2(d1)],
      r"$FV = 5000(1.04)^3 = 5000 \times 1.124864 = " + c2(d1) + "$.",
      tol=0.01, basics="exponentialGrowth"),
    N(0, 2, 2, "Interest earned, monthly compounding",
      r"\$6500 is invested at 5.4% p.a., compounded monthly, for 2 years. How much interest is earned, in dollars, to the nearest cent?",
      [c2(d2)],
      r"$r = 0.054 \div 12 = 0.0045$ and $n = 24$. $FV = 6500(1.0045)^{24} = " + c2(6500 + d2) + r"$, so the interest is " + money(d2) + ".",
      tol=0.02),
    N(0, 2, 1, "Straight-line depreciation",
      r"A laptop bought for \$2400 depreciates by \$450 each year using the straight-line method. What is it worth after 4 years, in dollars?",
      ["600"],
      r"$S = V_0 - Dn = 2400 - 450 \times 4 = 600$."),
    N(0, 2, 2, "Declining-balance depreciation",
      r"A truck bought for \$45 000 depreciates at 18% p.a., declining balance. What is it worth after 5 years, in dollars, to the nearest cent?",
      [c2(d4)],
      r"$S = 45\,000(1 - 0.18)^5 = 45\,000 \times 0.82^5 = " + c2(d4) + "$.",
      tol=0.02, basics="percentChange"),
    S(0, 2, 1, "Compounding frequency",
      r"\$10 000 is invested for one year at 6% p.a. Which compounding gives the most interest?",
      ["Daily", "Monthly", "Quarterly", "Annually"],
      "At the same annual rate, more frequent compounding adds interest on interest sooner, so daily earns the most and annually the least."),
    N(0, 2, 3, "Credit card interest",
      r"A credit card charges 21.49% p.a. interest, compounded daily, from the purchase date. A \$1850 purchase is paid off after 25 days. How much interest is charged, in dollars, to the nearest cent?",
      [c2(d6)],
      r"$1850(1 + \frac{0.2149}{365})^{25} = " + c2(1850 + d6) + r"$, so the interest is " + money(d6) + ".",
      tol=0.02),
    N(0, 2, 1, "Dividend yield",
      r"A share priced at \$32 pays an annual dividend of 96 cents. What is the dividend yield, as a percentage?",
      ["3"],
      r"$0.96 \div 32 \times 100\% = 3\%$. Write the dividend in dollars first.",
      basics="percents"),
    N(0, 2, 1, "Cost of buying shares",
      r"Ava buys 500 shares at \$8.40 each and pays a brokerage fee of \$19.95. What is the total cost, in dollars?",
      ["4219.95"],
      r"$500 \times 8.40 = 4200$, plus \$19.95 brokerage, gives \$4219.95.",
      tol=0.01),
    N(0, 2, 1, "Loan balance after one month",
      r"A loan of \$15 000 is charged 6% p.a. interest, compounded monthly. A repayment of \$400 is made at the end of the first month. What is the balance after that repayment, in dollars?",
      ["14675"],
      r"Monthly rate $= 0.5\%$. $15\,000 \times 1.005 - 400 = 15\,075 - 400 = 14\,675$.",
      tol=0.01),
    N(0, 2, 1, "Total interest on a loan",
      r"A car loan of \$60 000 is repaid with \$1250 a month for 5 years. How much interest is paid in total, in dollars?",
      ["15000"],
      r"Total repaid $= 1250 \times 60 = 75\,000$, so the interest is $75\,000 - 60\,000 = 15\,000$."),
    S(0, 2, 2, "Recurrence relation for a loan",
      r"A loan is charged 6% p.a. interest, compounded monthly, with \$400 repaid at the end of each month. Which recurrence relation gives the balance $A_n$ after $n$ months?",
      [r"$A_{n+1} = A_n(1.005) - 400$", r"$A_{n+1} = A_n(1.06) - 400$", r"$A_{n+1} = A_n(1.005) + 400$", r"$A_{n+1} = (A_n - 400)(1.06)$"],
      r"Each month the balance gains 0.5% interest ($6\% \div 12$) and then the \$400 repayment is subtracted. Adding 400 would describe savings, not a loan."),
    N(0, 2, 2, "Future value of an annuity (table)",
      r"Sam deposits \$150 at the end of each month for 2 years at 6% p.a., compounded monthly. Use the table to find the future value, in dollars, to the nearest cent." + "\n\n" + FVT([0.005, 0.01], [12, 24, 36]),
      [c2(d12)],
      r"0.5% per month for 24 months gives the factor " + f"{fvf(0.005, 24):.4f}" + r", so $FV = 150 \times " + f"{fvf(0.005, 24):.4f} = {c2(d12)}$.",
      tol=0.05),
    N(0, 2, 3, "Present value of an annuity (table)",
      r"A couple can afford repayments of \$1800 a month for 20 years. The interest rate is 6% p.a., compounded monthly. Use the table to find the most they can borrow, in dollars, to the nearest cent." + "\n\n" + PVT([0.005, 0.0075], [120, 240, 300]),
      [c2(d13)],
      r"0.5% per month for $20 \times 12 = 240$ months gives the factor " + f"{pvf(0.005, 240):.4f}" + r". $PV = 1800 \times " + f"{pvf(0.005, 240):.4f} = {c2(d13)}$.",
      tol=0.05),
    S(0, 2, 2, "Comparing loan terms",
      "Two loans are for the same amount at the same interest rate. Loan A runs for 20 years and loan B for 25 years. Which statement is true?",
      ["Loan A has higher repayments but less total interest", "Loan A has lower repayments and less total interest",
       "Loan B has higher repayments and more total interest", "Both loans cost the same in total interest"],
      "A shorter term needs bigger repayments to clear the debt, but the balance falls faster, so less interest is charged overall."),
    N(0, 2, 2, "Present value of a lump sum",
      r"How much must be invested now at 5% p.a., compounded annually, to have \$20 000 in 4 years? Answer in dollars, to the nearest cent.",
      [c2(d15)],
      r"$PV = \frac{20\,000}{1.05^4} = " + c2(d15) + "$.",
      tol=0.02, basics="exponentialGrowth"),
    N(0, 2, 1, "Inflation",
      r"A coffee costs \$4.50. If prices rise with inflation of 3% p.a., what will it cost in 5 years, in dollars, to the nearest cent?",
      [c2(d16)],
      r"$4.50 \times 1.03^5 = " + f"{d16:.4f}" + r"$, which is \$" + c2(d16) + ".",
      tol=0.01, basics="percentChange"),
    N(0, 2, 1, "Interest rate per period",
      "A loan is charged 7.2% p.a. interest, compounded monthly. What is the interest rate per month, as a percentage?",
      ["0.6"],
      r"$7.2\% \div 12 = 0.6\%$ per month.",
      basics="percents"),
    N(0, 2, 2, "Reducing-balance loan (recurrence)",
      r"A loan of \$8000 is charged 12% p.a. interest, compounded monthly, with \$300 repaid at the end of each month. What is the balance after 2 months, in dollars?",
      ["7557.80", "7557.8"],
      r"Monthly rate 1%. After 1 month: $8000 \times 1.01 - 300 = 7780$. After 2 months: $7780 \times 1.01 - 300 = 7557.80$.",
      tol=0.01),
    S(0, 2, 3, "Comparing compounding",
      "Which savings account gives the greater return over a year?",
      ["5% p.a., compounded monthly", "5.1% p.a., compounded annually", "They give the same return", "It depends on the amount saved"],
      r"5% compounded monthly grows by $(1 + \frac{0.05}{12})^{12} = 1.05116$, an effective 5.116%, a little more than 5.1%. The amount does not change which is better."),
    N(0, 2, 2, "Annuity recurrence relation",
      r"A savings plan follows $A_{n+1} = A_n(1.02) + 1000$, with $A_0 = 0$. Find $A_3$, in dollars.",
      ["3060.40", "3060.4"],
      r"$A_1 = 1000$, $A_2 = 1000 \times 1.02 + 1000 = 2020$, $A_3 = 2020 \times 1.02 + 1000 = 3060.40$.",
      tol=0.01),
]
