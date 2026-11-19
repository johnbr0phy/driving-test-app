import sqlite3

def _q(setup, query):
    db = sqlite3.connect(":memory:")
    db.executescript(setup)
    rows = db.execute(query).fetchall()
    db.close()
    return rows

_INV = ("CREATE TABLE Invoices(ID INT, Amount INT, Status TEXT);"
        "INSERT INTO Invoices VALUES (1,300,'Open'),(2,650,'Open'),(3,900,'Paid'),(4,1200,'Open'),(5,500,'Open'),(6,750,'Paid');")
_COUNT = _q(_INV, "SELECT COUNT(*) FROM Invoices WHERE Amount > 500 AND Status = 'Open'")[0][0]

_CUS = ("CREATE TABLE Customers(ID TEXT); INSERT INTO Customers VALUES ('C1'),('C2'),('C3'),('C4');"
        "CREATE TABLE Orders(OrderID INT, CustID TEXT); INSERT INTO Orders VALUES (101,'C1'),(102,'C1'),(103,'C3');")
_LEFT = len(_q(_CUS, "SELECT c.ID, o.OrderID FROM Customers c LEFT JOIN Orders o ON c.ID = o.CustID"))
_INNER = len(_q(_CUS, "SELECT c.ID, o.OrderID FROM Customers c INNER JOIN Orders o ON c.ID = o.CustID"))
assert (_LEFT, _INNER) == (5, 3)

_SAL = ("CREATE TABLE Sales(Region TEXT, Amount INT);"
        "INSERT INTO Sales VALUES ('East',400),('East',700),('West',300),('West',200),('North',900);")
_HAV = len(_q(_SAL, "SELECT Region FROM Sales GROUP BY Region HAVING SUM(Amount) > 600"))
_WHR = len(_q(_SAL, "SELECT Region FROM Sales WHERE Amount > 600 GROUP BY Region"))
assert (_HAV, _WHR) == (2, 2)

_DT = ("CREATE TABLE S(D TEXT); INSERT INTO S VALUES ('2026-01-01'),('2026-01-15'),('2026-01-31'),('2026-02-01');")
assert len(_q(_DT, "SELECT * FROM S WHERE D > '2026-01-01' AND D < '2026-01-31'")) == 1

CAT = "cpaiscData"; SEG = "DAT"
Q = [
("Which data store keeps raw data in any format, structured or not, until someone needs to use it?",
 "Data lake", ["Data warehouse", "Data mart", "Operational database"],
 "A data lake holds raw data in its native format. A data warehouse holds data that has already been cleaned and structured for reporting."),
("A subset of a data warehouse built for the needs of one department is a:",
 "Data mart", ["Data lake", "Staging area", "Transaction log"],
 "A data mart serves a single business area, such as sales. A staging area is where data sits temporarily during loading."),
("A central fact table joined directly to denormalized dimension tables forms which schema?",
 "Star", ["Snowflake", "Hierarchical", "Network"],
 "In a star schema each dimension is a single table linked straight to the fact table. A snowflake schema breaks the dimensions into further normalized tables."),
("Dimension tables that are split into further normalized sub-tables form which schema?",
 "Snowflake", ["Star", "Flat file", "Document store"],
 "The snowflake schema normalizes dimensions, which saves space but needs more joins. The star schema keeps each dimension in one table."),
("In the data life cycle, which stage comes last?",
 "Final disposition", ["Archival storage", "Active business use", "Data creation and capture"],
 "The life cycle runs from creation through active use and storage to final disposition. Archiving keeps data; disposition ends its life."),
("A sales table repeats the customer's full address on every order line. This mainly shows the table is not:",
 "Normalized", ["Indexed", "Encrypted", "Partitioned"],
 "Normalization removes redundant data by storing the address once in a customer table. Repeating it invites update anomalies when an address changes."),
("A date column rejects the value 2026-02-30 because it is not a valid date. Which integrity rule is this?",
 "Domain integrity", ["Entity integrity", "Referential integrity", "Transaction atomicity"],
 "Domain integrity limits a column to valid values of its type and range. Referential integrity is about foreign keys matching existing primary keys."),
("A rule that every row must have a unique primary key that is never null enforces:",
 "Entity integrity", ["Referential integrity", "Domain integrity", "Data lineage rules"],
 "Entity integrity makes each row identifiable. Referential integrity instead requires foreign keys to match existing primary keys."),
("Where would an auditor look to find each field's name, data type, length and allowed values?",
 "Data dictionary", ["Audit trail", "Query execution plan", "Backup catalog"],
 "A data dictionary documents the definition of every data element. An audit trail records who changed data and when."),
("Pulling data from source systems, reshaping it and loading it into a warehouse is called:",
 "ETL", ["OLTP", "Data mirroring", "CRUD"],
 "Extract, transform and load moves data into a warehouse. OLTP is day-to-day transaction processing in the source systems."),
("Which SQL clause filters groups after a GROUP BY has been applied?",
 "HAVING", ["WHERE", "ORDER BY", "DISTINCT"],
 "HAVING filters on aggregated groups, such as SUM(Amount) > 1000. WHERE filters individual rows before they are grouped."),
("Table Invoices holds six rows of Amount and Status: 300 Open, 650 Open, 900 Paid, 1,200 Open, 500 Open, 750 Paid. What does SELECT COUNT(*) FROM Invoices WHERE Amount > 500 AND Status = 'Open' return?",
 "2", ["3", "4", "1"],
 "Only the 650 and 1,200 rows are both over 500 and Open, so the count is 2. The 500 row fails because > excludes 500 itself; counting it gives 3.",
 _COUNT),
("A query meant to list all January 2026 sales uses WHERE SaleDate > '2026-01-01' AND SaleDate < '2026-01-31'. What is wrong with it?",
 "It misses sales on Jan 1 and Jan 31", ["It also returns early February sales", "It returns each sale twice", "It returns December sales"],
 "Strict greater-than and less-than exclude the two end dates. Using >= '2026-01-01' and < '2026-02-01' would make the extract complete."),
("Customers has four rows, C1 to C4. Orders has two orders for C1 and one for C3. How many rows does Customers LEFT JOIN Orders on the customer ID return?",
 "5 rows", ["3 rows", "4 rows", "6 rows"],
 "A left join keeps every customer: C1 appears twice, C3 once, and C2 and C4 once each with no order, for 5. An inner join returns only the 3 matched rows.",
 _LEFT),
("In a business process model and notation (BPMN) diagram, what does a diamond-shaped gateway show?",
 "Point where the flow branches", ["Task a person performs", "Event that starts the process", "Store where data is kept"],
 "In BPMN, gateways are diamonds that split or merge the flow on a decision. Tasks are rounded rectangles and events are circles."),
("In a data flow diagram, a customer that sends orders into the system and receives invoices is shown as a:",
 "External entity", ["Transformation process", "Data store", "Data flow"],
 "External entities are sources or destinations of data outside the system. A process transforms data inside the system."),
]
