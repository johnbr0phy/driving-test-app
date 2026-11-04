from fractions import Fraction as F
CAT = "px5GeomData"; SEG = "GEO"
assert 8*5 + F(1, 2)*8*3 == 52
assert 3**3 == 27
assert 4 * 2.5 * 3 == 30
assert 6 * 5**2 == 150
assert (14*60 + 10) - (9*60 + 45) == 4*60 + 25
assert 3 * 4 == 12
assert 2.4 * 1000 == 2400
assert sum([11, 6, 17, 8, 8]) / 5 == 10
assert F(4, 4 + 7 + 5) == F(1, 4)
Q = [
("An angle measures 112 degrees. It is classified as:",
 "Obtuse", ["Acute", "Right", "Straight"],
 "An obtuse angle is greater than 90 and less than 180 degrees. A right angle is exactly 90 and a straight angle exactly 180."),
("A figure is a rectangle 8 m by 5 m with a triangle on top whose base is 8 m and height 3 m. What is the area of the figure?",
 "52 square m", ["64 square m", "40 square m", "76 square m"],
 "Rectangle 8 x 5 = 40, triangle 1/2 x 8 x 3 = 12, total 52 square meters. Forgetting the 1/2 for the triangle gives 64."),
("The length, width and height of a rectangular prism are each tripled. Its volume is multiplied by:",
 "27", ["9", "3", "81"],
 "Volume is length x width x height, so tripling all three multiplies volume by 3 x 3 x 3 = 27. The area of each face is multiplied by 9."),
("A box measures 4 inches by 2 1/2 inches by 3 inches. What is its volume?",
 "30 cubic inches", ["9.5 cubic inches", "24 cubic inches", "60 cubic inches"],
 "V = 4 x 2.5 x 3 = 30 cubic inches. Adding the edges (9.5) confuses volume with a sum of lengths."),
("What is the surface area of a cube with an edge of 5 cm?",
 "150 square cm", ["125 square cm", "100 square cm", "25 square cm"],
 "A cube has 6 square faces, each 5 x 5 = 25, so the surface area is 6 x 25 = 150. 125 is the cube's volume in cubic centimeters."),
("In which quadrant of the coordinate plane is the point (-3, 4)?",
 "Quadrant II", ["Quadrant I", "Quadrant III", "Quadrant IV"],
 "A negative x-coordinate and positive y-coordinate place the point up and to the left of the origin, which is Quadrant II."),
("A field trip leaves at 9:45 a.m. and returns at 2:10 p.m. How long is the trip?",
 "4 hours 25 minutes", ["4 hours 35 minutes", "5 hours 25 minutes", "3 hours 25 minutes"],
 "9:45 to 1:45 is 4 hours, and 1:45 to 2:10 is 25 more minutes, so 4 hours 25 minutes."),
("How many cups are in 3 quarts?",
 "12", ["6", "8", "24"],
 "1 quart = 2 pints = 4 cups, so 3 quarts = 12 cups. 6 is the number of pints."),
("How many meters are in 2.4 kilometers?",
 "2,400", ["240", "24,000", "24"],
 "1 kilometer = 1,000 meters, so 2.4 km = 2.4 x 1,000 = 2,400 m."),
("What is the mean of the data set 11, 6, 17, 8, 8?",
 "10", ["8", "11", "12.5"],
 "The sum is 11 + 6 + 17 + 8 + 8 = 50, and 50 / 5 = 10. The median and the mode are both 8."),
("In a small town most homes sell for about $200,000, but one mansion sold for $3 million. Which measure best describes a typical home price?",
 "Median", ["Mean", "Range", "Maximum"],
 "The median resists outliers, while the one very high price pulls the mean far above a typical sale."),
("A jar holds 4 yellow, 7 white and 5 pink buttons. One button is picked at random. What is the probability it is yellow?",
 "1/4", ["4/12", "1/7", "4/7"],
 "There are 4 yellow buttons out of 4 + 7 + 5 = 16 in all, so the probability is 4/16 = 1/4. Dividing by the 12 buttons that are not yellow gives 4/12, a ratio rather than a probability."),
]
