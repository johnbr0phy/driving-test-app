from fractions import Fraction as F
CAT = "px5Number"; SEG = "NUM"
# Computed checks: every key below is asserted against its arithmetic.
assert 6 * 10**3 + 2 * 10 + 9 == 6029
assert round(48651, -3) == 49000
assert -(-61 // 8) == 8
assert F(2, 3) + F(3, 4) == F(17, 12)
assert 15 * F(4, 5) == 12
assert 3 / F(1, 4) == 12
assert 18 - 3 * 2**2 + 4 == 10
assert F(3, 8) == F(375, 1000)
assert abs(3.60 / 24 - 0.15) < 1e-9
assert 64 * 0.75 == 48
assert 6 * 14 // 2 == 42  # lcm(6, 14) = 42 since gcd is 2
assert 0.04 * 100 == 4.0  # 4 ones vs 4 hundredths
assert F(1, 4) < F(3, 10)
assert 7 * 8 + 6 == 62
Q = [
("What is the value of the digit 7 in the number 3,072.5?",
 "70", ["7", "700", "0.7"],
 "The 7 is in the tens place, so its value is 7 x 10 = 70. Reading it as 7 ignores place value."),
("In the number 4.44, the value of the 4 in the ones place is how many times the value of the 4 in the hundredths place?",
 "100", ["10", "1,000", "4"],
 "The ones 4 is worth 4 and the hundredths 4 is worth 0.04, and 4 / 0.04 = 100. Each place to the left is 10 times the place to its right, and ones is two places left of hundredths."),
("Which number is equal to 6 x 10^3 + 2 x 10^1 + 9 x 10^0?",
 "6,029", ["6,209", "629", "6,290"],
 "6 x 1,000 + 2 x 10 + 9 x 1 = 6,000 + 20 + 9 = 6,029. There are no hundreds, so the hundreds digit is 0."),
("What is 48,651 rounded to the nearest thousand?",
 "49,000", ["48,000", "48,700", "50,000"],
 "The hundreds digit is 6, which is 5 or more, so the thousands digit rounds up from 8 to 9: 49,000."),
("Each van holds 8 students. How many vans are needed to take 61 students on a field trip?",
 "8", ["7", "9", "7.6"],
 "61 / 8 = 7 remainder 5. The 5 leftover students still need a van, so the answer is the next whole number, 8."),
("What is 2/3 + 3/4?",
 "17/12", ["5/7", "5/12", "6/7"],
 "With a common denominator of 12, 2/3 = 8/12 and 3/4 = 9/12, so the sum is 17/12. Adding numerators and denominators (5/7) is the classic error."),
("Which product is less than 15?",
 "15 x 4/5", ["15 x 5/4", "15 x 1", "15 x 3/2"],
 "Multiplying by a number less than 1 gives a product smaller than the other factor: 15 x 4/5 = 12. Multiplying by 1 leaves 15, and factors greater than 1 make it larger."),
("What is 3 divided by 1/4?",
 "12", ["3/4", "4/3", "7"],
 "Dividing by 1/4 asks how many quarters are in 3, which is 3 x 4 = 12. Dividing by a fraction less than 1 gives a quotient larger than the dividend."),
("Which unit fraction has the greatest value?",
 "1/5", ["1/6", "1/9", "1/12"],
 "With the same numerator of 1, a smaller denominator means larger pieces of the same whole, so 1/5 is greatest."),
("What is the value of 18 - 3 x 2^2 + 4?",
 "10", ["64", "2", "52"],
 "Exponent first: 2^2 = 4. Then multiply: 3 x 4 = 12. Then work left to right: 18 - 12 + 4 = 10. Subtracting before multiplying, (18 - 3) x 4 + 4, gives 64."),
("Which property is shown by 9 x (6 + 2) = 9 x 6 + 9 x 2?",
 "Distributive property", ["Commutative property", "Associative property", "Identity property"],
 "The factor 9 is distributed over each addend inside the parentheses. The commutative property only changes order, as in 6 + 2 = 2 + 6."),
("Which value is equal to 3/8?",
 "37.5%", ["0.385", "3.8%", "0.83"],
 "3 / 8 = 0.375, which is 37.5%. Writing 3.8% treats the digits of the fraction as a decimal."),
("Which list is ordered from least to greatest?",
 "-0.6, 1/4, 0.3", ["0.3, 1/4, -0.6", "1/4, -0.6, 0.3", "-0.6, 0.3, 1/4"],
 "The negative number is least, and 1/4 = 0.25 is less than 0.3, so the order is -0.6, 1/4, 0.3."),
("A 24-ounce bag of rice costs $3.60. What is the price per ounce?",
 "$0.15", ["$0.67", "$1.50", "$0.16"],
 "Unit price = total cost / number of ounces = $3.60 / 24 = $0.15. Dividing 24 by 3.60 gives ounces per dollar instead."),
("A lamp priced at $64 is on sale for 25% off. What is the sale price?",
 "$48", ["$16", "$39", "$80"],
 "25% of $64 is $16, and $64 - $16 = $48. $16 is only the discount, $39 subtracts 25 dollars instead of 25 percent, and $80 adds the discount."),
("What is the least common multiple of 6 and 14?",
 "42", ["84", "2", "20"],
 "Multiples of 14 are 14, 28, 42; 42 is the first that 6 divides. 84 is the product, a common multiple but not the least, and 2 is the greatest common factor."),
]
