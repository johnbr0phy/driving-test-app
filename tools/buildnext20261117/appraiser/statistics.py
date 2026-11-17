ITEMS=[]
def family(options,rows):
 for i,(q,e) in enumerate(rows):ITEMS.append((q,[options[i]]+options[:i]+options[i+1:],e))
family(['$200,000','$220,000','$240,000','$260,000'],[
('Four verified sales are $160,000, $180,000, $210,000 and $250,000. What is their arithmetic mean sale price?','The total is $800,000; dividing by four gives a mean of $200,000.'),
('Sorted sale prices are $180,000, $200,000, $240,000 and $400,000. What is their median?','For four observations, average the two middle prices: ($200,000 + $240,000) / 2 = $220,000. The high outlier does not enter that average.'),
('A small dataset contains prices of $200,000, $220,000, $240,000, $240,000 and $260,000. What is the mode?','The mode is the most frequent observation: $240,000 occurs twice, while each other price occurs once.'),
('A dataset\'s lowest sale is $180,000 and its highest is $340,000. What is its mid-range, defined as the average of those two extremes?','The mid-range is ($180,000 + $340,000) / 2 = $260,000; it differs from the range, which is their difference.')])
assert len(ITEMS)==4
