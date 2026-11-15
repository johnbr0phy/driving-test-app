# HSPT Verbal Skills: logical reasoning (true, false or uncertain). Original items.
O = ["True", "False", "Uncertain"]
Q = "If the first two statements are true, the third statement is:"
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Logical reasoning", diff=1, order=O,
       stem="Maria is taller than Jon. Jon is taller than Lee. Maria is taller than Lee. " + Q,
       key="True", wrong=["False", "Uncertain"],
       expl="Maria is taller than Jon, and Jon is taller than Lee, so Maria must also be taller than Lee."),
  dict(test=1, skill="Logical reasoning", diff=1, order=O,
       stem="All the books on the top shelf are mysteries. The red book is on the top shelf. The red book is a mystery. " + Q,
       key="True", wrong=["False", "Uncertain"],
       expl="Every book on the top shelf is a mystery, and the red book is on that shelf, so it must be a mystery."),
  dict(test=1, skill="Logical reasoning", diff=2, order=O,
       stem="Sam runs faster than Ava. Kim runs faster than Ava. Sam runs faster than Kim. " + Q,
       key="Uncertain", wrong=["True", "False"],
       expl="Both Sam and Kim are faster than Ava, but nothing compares Sam with Kim. Either one could be faster, so the statement is uncertain."),
  dict(test=1, skill="Logical reasoning", diff=2, order=O,
       stem="A pen costs more than a pencil. A pencil costs more than an eraser. An eraser costs more than a pen. " + Q,
       key="False", wrong=["True", "Uncertain"],
       expl="The pen costs more than the pencil, which costs more than the eraser, so the pen costs more than the eraser. The third statement says the reverse, so it is false."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Logical reasoning", diff=2, order=O,
       stem="The library opens before the bank. The bakery opens after the bank. The bakery opens before the library. " + Q,
       key="False", wrong=["True", "Uncertain"],
       expl="The order is library, then bank, then bakery. The bakery opens after the library, so the third statement is false."),
  dict(test=2, skill="Logical reasoning", diff=1, order=O,
       stem="No reptiles have feathers. A gecko is a reptile. A gecko has feathers. " + Q,
       key="False", wrong=["True", "Uncertain"],
       expl="If no reptile has feathers and a gecko is a reptile, then a gecko cannot have feathers. The third statement is false."),
  dict(test=2, skill="Logical reasoning", diff=2, order=O,
       stem="Ella lives east of Ray. Ray lives east of Tom. Tom lives west of Ella. " + Q,
       key="True", wrong=["False", "Uncertain"],
       expl="From west to east the order is Tom, Ray, Ella. Tom is west of Ella, so the third statement is true."),
  dict(test=2, skill="Logical reasoning", diff=2, order=O,
       stem="Some students in the band play drums. Owen is in the band. Owen plays drums. " + Q,
       key="Uncertain", wrong=["True", "False"],
       expl="Only some band members play drums, so knowing Owen is in the band does not tell us whether he is one of them. The statement is uncertain."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Logical reasoning", diff=3, order=O,
       stem="Ben is older than Cal but younger than Dee. Ed is older than Dee. Ben is younger than Ed. " + Q,
       key="True", wrong=["False", "Uncertain"],
       expl="From youngest to oldest the order is Cal, Ben, Dee, Ed. Ben is younger than Dee, and Dee is younger than Ed, so Ben is younger than Ed."),
]
