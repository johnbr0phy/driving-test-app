ITEMS=[
("Four verified sales are $160,000, $180,000, $210,000 and $250,000. What is their arithmetic mean sale price?",
 ["$200,000","$195,000","$210,000","$250,000"],
 "The total is $800,000; dividing by four gives a mean of $200,000. $195,000 is the median."),
("Sorted sale prices are $180,000, $200,000, $240,000 and $400,000. What is their median?",
 ["$220,000","$255,000","$240,000","$200,000"],
 "For four observations, average the two middle prices: ($200,000 + $240,000) / 2 = $220,000. The high outlier pulls the mean up to $255,000 but does not enter the median."),
("A small dataset contains prices of $200,000, $220,000, $240,000, $240,000 and $260,000. What is the mode?",
 ["$240,000","$232,000","$260,000","$220,000"],
 "The mode is the most frequent observation: $240,000 occurs twice, while each other price occurs once. $232,000 is the mean."),
("A dataset's lowest sale is $180,000 and its highest is $340,000. What is its mid-range, defined as the average of those two extremes?",
 ["$260,000","$160,000","$520,000","$340,000"],
 "The mid-range is ($180,000 + $340,000) / 2 = $260,000; it differs from the range, $160,000, which is their difference."),
]
assert len(ITEMS)==4
