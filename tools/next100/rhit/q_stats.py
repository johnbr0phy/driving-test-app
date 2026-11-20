# RHIT Domain 3: Data Analytics and Use.
# Each item: (stem, key, [3 wrong options], explanation). build.py puts the key in slot i % 4.
# Every computed key is checked below.

def pct(a, b, nd=1):
    return round(100.0 * a / b, nd)

assert pct(3600, 150 * 30) == 80.0
assert 420 / 100 == 4.2
assert pct(6, 400) == 1.5
assert pct(9 - 4, 104 - 4) == 5.0 and pct(9, 104) == 8.7 and pct(5, 104) == 4.8
assert 200 + 30 - 25 + 2 == 207
assert 700 / 500 == 1.4
assert sorted([7, 2, 3, 9, 3])[2] == 3 and sum([7, 2, 3, 9, 3]) / 5 == 4.8
assert pct(54, 360) == 15.0
assert (4 + 6 + 11) / 3 == 7
assert pct(8, 320) == 2.5
assert pct(66, 220) == 30.0
assert pct(72, 90) == 80.0
assert 6200 / 31 == 200
assert pct(1400, 1600) == 87.5

STATS = [
("A 150-bed hospital had 3,600 inpatient service days in a 30-day month. What was the bed occupancy rate?",
 "80%", ["24%", "75%", "83%"],
 "Occupancy is service days divided by bed count days: 3,600 / (150 x 30) = 3,600 / 4,500 = 80%."),
("Last month 100 inpatients were discharged with 420 total days of stay. What is the average length of stay?",
 "4.2 days", ["2.4 days", "4.0 days", "5.2 days"],
 "Average length of stay is total discharge days divided by discharges: 420 / 100 = 4.2 days."),
("A patient is admitted June 3 and discharged June 8. What is the length of stay?",
 "5 days", ["4 days", "6 days", "8 days"],
 "Length of stay counts the admission day but not the discharge day, so June 8 minus June 3 is 5 days."),
("A patient is admitted and discharged on the same day. The length of stay counted is:",
 "1 day", ["0 days", "Half a day", "2 days"],
 "A same-day admission and discharge is counted as one day so it is not lost from the totals."),
("A hospital had 400 discharges, including 6 deaths. What is the gross death rate?",
 "1.5%", ["0.15%", "6.0%", "2.4%"],
 "Gross death rate is deaths divided by discharges including deaths, times 100: 6 / 400 = 1.5%."),
("There were 104 discharges and 9 deaths, 4 of them within 48 hours of admission. What is the net death rate?",
 "5.0%", ["8.7%", "4.8%", "4.0%"],
 "Net death rate removes deaths under 48 hours from both parts: (9 - 4) / (104 - 4) = 5 / 100 = 5.0%."),
("The census at midnight was 200. The next day had 30 admissions, 25 discharges, and 2 patients admitted and discharged that day. How many inpatient service days were there?",
 "207", ["205", "203", "230"],
 "The next midnight census is 200 + 30 - 25 = 205, and the 2 same-day patients each add a service day, for 207."),
("The total MS-DRG relative weight for 500 discharges was 700. What is the case-mix index?",
 "1.40", ["0.71", "1.20", "7.00"],
 "Case-mix index is total relative weight divided by discharges: 700 / 500 = 1.40."),
("Which variable is ordinal?",
 "Pain rated mild, moderate or severe", ["Blood type A, B, AB or O", "Patient's state of residence", "Body temperature in degrees F"],
 "Ordinal data are categories with a natural order but no fixed distance between them. Blood type and state are nominal; temperature is continuous."),
("Lengths of stay are 7, 2, 3, 9 and 3 days. What is the median?",
 "3 days", ["4.8 days", "2 days", "7 days"],
 "Sorted, the values are 2, 3, 3, 7, 9. The middle value is 3. The mean would be 24 / 5 = 4.8."),
("Lengths of stay are 7, 2, 3, 9 and 3 days. What is the mode?",
 "3 days", ["4.8 days", "7 days", "9 days"],
 "The mode is the value that occurs most often. 3 appears twice."),
("Which measure shows how widely values spread around the mean?",
 "Standard deviation", ["Median value", "Modal value", "Weighted mean"],
 "Standard deviation measures the typical distance of values from the mean. Median and mode describe the center."),
("Which chart best shows monthly DNFB totals over two years?",
 "Line graph", ["Pie chart", "Scatter plot", "Pictogram"],
 "A line graph shows change over time. A pie chart shows parts of one whole."),
("Which chart best shows how lengths of stay are distributed for one DRG?",
 "Histogram", ["Pie chart", "Line graph", "Flowchart"],
 "A histogram groups continuous values into intervals and shows how often each occurs."),
("Which chart best shows each payer's share of this year's discharges?",
 "Pie chart", ["Histogram", "Line graph", "Control chart"],
 "A pie chart shows how parts make up one whole, such as payer mix."),
("Data on newly diagnosed tumors, followed over the patient's lifetime, is collected in a:",
 "Cancer registry", ["Trauma registry", "Disease index", "Physician index"],
 "A cancer registry abstracts and follows reportable cancers over time for incidence, treatment and survival data."),
("Medicare's file of inpatient hospital stays used for research and policy is:",
 "MEDPAR", ["HCUP", "NPDB", "PEPPER"],
 "The Medicare Provider Analysis and Review (MEDPAR) file holds Medicare inpatient stay records. HCUP is AHRQ's all-payer data family."),
("AHRQ's family of all-payer databases built from state discharge data is:",
 "HCUP", ["MEDPAR", "NNDSS", "CERT"],
 "The Healthcare Cost and Utilization Project (HCUP) builds all-payer databases from state data, unlike MEDPAR, which is Medicare only."),
("A lab confirms a disease on the state's reportable list. The report goes to the:",
 "State or local health agency", ["CDC directly", "Patient's primary care doctor", "Hospital infection committee only"],
 "Reportable disease rules are set by the state, and cases go to state or local public health, which may pass data to CDC."),
("Of 360 records reviewed by CDI, 54 led to a query. What is the query rate?",
 "15%", ["6.7%", "54%", "18%"],
 "54 / 360 = 0.15, or 15% of reviewed records."),
("Three requests took 4, 6 and 11 days to release. What is the average turnaround time?",
 "7 days", ["6 days", "11 days", "21 days"],
 "Add the days (21) and divide by 3 requests: 7 days."),
("There were 8 hospital-acquired infections among 320 discharges. What is the infection rate?",
 "2.5%", ["0.25%", "4.0%", "8.0%"],
 "Infection rate is infections divided by discharges times 100: 8 / 320 = 2.5%."),
("Of 220 deliveries, 66 were by cesarean section. What is the cesarean rate?",
 "30%", ["22%", "33%", "66%"],
 "66 / 220 = 0.30, or 30%."),
("A document that defines each data field's name, format and allowed values is a:",
 "Data dictionary", ["Chargemaster", "Master patient index", "Retention schedule"],
 "A data dictionary standardizes the definition of each element so data are collected and reported the same way."),
("An abstract shows a newborn's birth weight as 45 kg. This fails which data quality check?",
 "Validity", ["Timeliness", "Accessibility", "Granularity"],
 "Validity checks that values fall in an acceptable range. A 45 kg newborn is outside any valid range."),
("Comparing a hospital's ROI turnaround with that of similar hospitals is:",
 "Benchmarking", ["Abstracting", "Indexing", "Concurrent review"],
 "Benchmarking compares performance against peers or best practice to set targets."),
("A 31-day month had 6,200 inpatient service days. What was the average daily census?",
 "200", ["193", "206", "310"],
 "Average daily census is service days divided by days in the period: 6,200 / 31 = 200."),
("Of 1,600 discharges, 1,400 were coded within 3 days. What share met the standard?",
 "87.5%", ["12.5%", "85%", "90%"],
 "1,400 / 1,600 = 0.875, or 87.5%."),
]

SECTIONS = [("rhitStats", "DAT", STATS)]
