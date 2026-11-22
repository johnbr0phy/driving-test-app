CAT = "oacpMath"; SEG = "MTH"
Q = [
# 07:00 to 19:00 = 12 h
("An officer's shift runs from 07:00 to 19:00. How many hours long is the shift?",
 "12 hours", ["11 hours", "13 hours", "10 hours"],
 "From 07:00 to 19:00 is 12 hours. Counting the hours on the clock face one by one often gives 11 or 13 by mistake."),
# 19:00 + 10 h = 05:00
("A night shift starts at 19:00 and lasts 10 hours. At what time does it end?",
 "05:00", ["04:00", "06:00", "07:00"],
 "Five hours takes the shift to midnight and five more reach 05:00. Ending at 07:00 would mean a 12-hour shift."),
# 30 km / 60 km/h = 0.5 h
("A cruiser drives 30 km at a steady 60 km/h. How long does the trip take?",
 "30 minutes", ["20 minutes", "45 minutes", "2 hours"],
 "Time is distance divided by speed: 30 / 60 = 0.5 hours, or 30 minutes. Two hours comes from dividing the speed by the distance."),
# 45 km in 0.5 h = 90 km/h
("A unit covers 45 km in 30 minutes at a steady speed. What is its speed?",
 "90 km/h", ["45 km/h", "75 km/h", "135 km/h"],
 "Thirty minutes is half an hour, so 45 km in half an hour is 90 km in a full hour. Using 45 km/h forgets that the time is only half an hour."),
# 25% of 48 = 12
("A service has 48 cruisers and 25% of them are in for repairs. How many cruisers are in for repairs?",
 "12", ["10", "16", "24"],
 "Twenty-five percent is one quarter, and 48 / 4 = 12. Twenty-four would be half the fleet."),
# (42+38+50+46)/4 = 176/4 = 44
("An officer logs 42 km, 38 km, 50 km and 46 km on four night patrols. What is the average distance per night?",
 "44 km", ["42 km", "46 km", "48 km"],
 "The total is 42 + 38 + 50 + 46 = 176 km, and 176 / 4 = 44 km. Forty-six is one of the nights, not the average."),
# 6*24 = 144; 144 - 50 = 94
("The supply room has 6 boxes of 24 pairs of gloves. Officers use 50 pairs. How many pairs are left?",
 "94 pairs", ["84 pairs", "104 pairs", "144 pairs"],
 "There are 6 x 24 = 144 pairs, and 144 - 50 = 94. One hundred forty-four is the starting total before any were used."),
# 15*4 = 60; 3*12 = 36; total 96
("A unit buys 15 road flares at $4 each and 3 safety triangles at $12 each. What is the total cost?",
 "$96", ["$84", "$108", "$72"],
 "Flares cost 15 x 4 = $60 and triangles 3 x 12 = $36, for $96 in all. Adding just the two prices and multiplying is a common slip."),
# 23:40 + 35 min = 00:15
("A call comes in at 23:40 and the first unit arrives 35 minutes later. At what time does it arrive?",
 "00:15", ["00:05", "00:25", "23:15"],
 "Twenty minutes reaches midnight, and 15 more gives 00:15. The time 23:15 subtracts instead of adding."),
# 21:50 to 03:10 = 5 h 20 min
("A person is booked into cells at 21:50 and released at 03:10 the next morning. How long were they held?",
 "5 h 20 min", ["6 h 20 min", "5 h 40 min", "4 h 20 min"],
 "From 21:50 to 02:50 is 5 hours, and 02:50 to 03:10 adds 20 minutes. Five hours 40 minutes adds the minutes the wrong way."),
# 36 / 6 = 6
("A traffic detail needs 36 officer-hours. Each officer works one 6-hour block. How many officers are needed?",
 "6 officers", ["5 officers", "7 officers", "30 officers"],
 "Thirty-six hours divided into 6-hour blocks is 36 / 6 = 6 officers. Thirty comes from subtracting instead of dividing."),
# 40 * 2.25 = 90
("A patrol car travels at a steady 40 km/h for 2 hours and 15 minutes. How far does it go?",
 "90 km", ["80 km", "85 km", "100 km"],
 "Two hours 15 minutes is 2.25 hours, and 40 x 2.25 = 90 km. Eighty km leaves out the extra 15 minutes."),
# (100-80)/80 = 25%
("Calls to a district rose from 80 one month to 100 the next. By what percent did calls rise?",
 "25%", ["20%", "80%", "120%"],
 "The rise is 20 calls, and 20 is 25% of the starting 80. Twenty percent divides by the new total of 100 instead."),
# 40 * 3/5 = 24
("Of 40 calls on a shift, three fifths were alarm calls. How many were alarm calls?",
 "24", ["16", "20", "30"],
 "One fifth of 40 is 8, so three fifths is 24. Sixteen is the number that were not alarm calls."),
# 4 * 10.5 = 42
("An officer works 4 shifts of 10.5 hours in one week. How many hours is that?",
 "42 hours", ["40 hours", "44 hours", "45 hours"],
 "Four times 10 is 40 and four half-hours add 2, for 42. Forty forgets the half-hours."),
# 47 - 40 = 7; 7 * 1.5 = 10.5
("An officer works 47 hours in a week. Each hour over 40 earns 1.5 hours of credit. How many hours of credit are earned?",
 "10.5 hours", ["7 hours", "14 hours", "11.5 hours"],
 "There are 47 - 40 = 7 extra hours, and 7 x 1.5 = 10.5. Seven hours forgets to apply the 1.5 rate."),
# 250/100 * 12 = 30
("A cruiser uses 12 litres of fuel per 100 km. How much fuel does it use on a 250 km trip?",
 "30 L", ["25 L", "36 L", "21 L"],
 "Two hundred fifty km is 2.5 lots of 100 km, and 2.5 x 12 = 30 L. Thirty-six litres uses 3 lots of 100 km."),
# 120 / 1.5 = 80
("A unit drives 120 km in 1.5 hours. What is its average speed?",
 "80 km/h", ["60 km/h", "90 km/h", "180 km/h"],
 "Speed is 120 / 1.5 = 80 km/h. One hundred eighty multiplies by 1.5 instead of dividing."),
# 2 per 9; 36/9 = 4; 4*2 = 8
("A division keeps 2 sergeants for every 9 constables. It has 36 constables. How many sergeants does it need?",
 "8 sergeants", ["4 sergeants", "6 sergeants", "18 sergeants"],
 "Thirty-six constables is 4 groups of 9, and each group needs 2 sergeants, so 8. Four counts the groups but forgets the 2 per group."),
# 8 h - 5 h 40 = 2 h 20
("A shift is 8 hours long and an officer has worked 5 hours 40 minutes. How much of the shift is left?",
 "2 h 20 min", ["3 h 20 min", "2 h 40 min", "3 h 40 min"],
 "Six hours worked would leave 2 hours, and 5 h 40 min is 20 minutes short of 6, so 2 h 20 min is left. Two hours 40 subtracts the minutes the wrong way."),
# 25 km / 50 km/h = 30 min; 06:50 + 30 = 07:20; briefing 07:15 -> 5 min late
("An officer leaves home at 06:50 and drives 25 km at a steady 50 km/h to a 07:15 briefing. How late does she arrive?",
 "5 minutes", ["10 minutes", "15 minutes", "25 minutes"],
 "The drive takes 25 / 50 = half an hour, so she arrives at 07:20, 5 minutes late. Ten minutes comes from taking the drive as 35 minutes."),
# 40 * 0.9 = 36; 36 * 5 = 180
("Radio batteries cost $40 each, with 10% off each battery. How much do 5 batteries cost?",
 "$180", ["$200", "$190", "$160"],
 "Each battery is $40 - $4 = $36, and 5 x 36 = $180. One hundred ninety takes the $10 off only once for the whole order."),
# 3 * 5 * 7 = 105
("A detachment runs 3 shifts a day with 5 officers on each shift. How many officer-shifts are worked in 7 days?",
 "105", ["84", "120", "135"],
 "Each day has 3 x 5 = 15 officer-shifts, and 15 x 7 = 105. One hundred twenty counts 8 days instead of 7."),
# A: 9/60 h = 9 min; B: 6/30 h = 12 min; difference 3
("Unit A is 9 km from a call and drives at 60 km/h. Unit B is 6 km away and drives at 30 km/h. How many minutes sooner does Unit A arrive?",
 "3 minutes", ["6 minutes", "9 minutes", "12 minutes"],
 "Unit A takes 9 minutes and Unit B takes 12 minutes, so A is 3 minutes sooner. Nine and 12 are the two travel times, not the difference."),
]
