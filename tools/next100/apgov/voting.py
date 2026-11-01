# Unit 5, part 1: voting, turnout, parties and third parties (CED topics 5.1
# to 5.5, with the nomination process from 5.8). Original items. Tables are
# hypothetical data for practice; visuals are described in words.

STIMULI = [
    {"id": "APGOV-T1-S07", "title": "Turnout by age in two elections (percent of eligible citizens voting, hypothetical data for practice)", "text": (
        "| Age group | Presidential election year | Midterm election year |\n|---|---|---|\n"
        "| 18-24 | 48 | 28 |\n"
        "| 25-44 | 58 | 40 |\n"
        "| 45-64 | 68 | 55 |\n"
        "| 65 and older | 72 | 64 |")},
    {"id": "APGOV-T1-S08", "title": "Map (described in words)", "text": (
        "A map of the United States shades each state by the party whose candidate won its electoral votes in a "
        "presidential election. The Northeast and the West Coast are mostly one shade; most of the South and the Great "
        "Plains are the other. A note under the map reads: \"In 48 states and the District of Columbia, the candidate "
        "who wins the most popular votes in the state receives all of its electoral votes.\"")},
    {"id": "APGOV-T2-S07", "title": "How adults describe their party (percent, hypothetical data for practice)", "text": (
        "| Year | Democrat | Republican | Independent |\n|---|---|---|---|\n"
        "| Year 1 | 35 | 30 | 33 |\n"
        "| Year 15 | 32 | 29 | 37 |\n"
        "| Year 30 | 29 | 27 | 42 |\n\n"
        "Other respondents named another party or gave no answer.")},
    {"id": "APGOV-T2-S08", "title": "Infographic (described in words)", "text": (
        "A flowchart titled \"How a party picks its presidential nominee\" has four steps. Step 1: Candidates compete in "
        "state primaries and caucuses from winter to spring. Step 2: The results award delegates to each candidate. "
        "Step 3: Delegates meet at the party's national convention in the summer. Step 4: The convention formally "
        "nominates the candidate who holds a majority of the delegates.")},
    {"id": "APGOV-D-S06", "title": "Turnout by education (percent of eligible citizens voting, hypothetical data for practice)", "text": (
        "| Education | Turnout |\n|---|---|\n"
        "| No high school diploma | 35 |\n"
        "| High school diploma | 52 |\n"
        "| Some college | 62 |\n"
        "| Bachelor's degree or more | 77 |")},
]

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 2, DA,
      "Which age group's turnout fell the most from the presidential election to the midterm election?",
      ["Ages 18-24", "Ages 25-44", "Ages 45-64", "Ages 65 and older"],
      "Turnout among 18-24 year olds fell 20 points (48 to 28), compared with 18, 13 and 8 points for the older groups.",
      stim="APGOV-T1-S07", lock=True),
    Q(1, 2, CA,
      "Which reform would most likely raise turnout among the youngest voters in the table?",
      ["Same-day voter registration", "Closing polling places on campuses", "Ending absentee voting by mail", "Moving all elections to midterm years"],
      "Young people move often and are least likely to be registered, so letting them register and vote on the same day removes a key barrier. The table shows midterms have lower turnout.",
      stim="APGOV-T1-S07"),
    Q(1, 1, SA,
      "The note on the map describes",
      ["the winner-take-all system", "proportional representation", "a two-round runoff system", "ranked-choice voting"],
      "Giving all of a state's electoral votes to the candidate with the most popular votes there is the winner-take-all system. Maine and Nebraska instead award some votes by district.",
      stim="APGOV-T1-S08"),
    Q(1, 2, CA,
      "Because of the system in the note, presidential candidates tend to",
      ["focus on competitive swing states", "campaign equally in every state", "spend most time in the safest states", "need a majority of the national vote"],
      "A narrow win in a closely divided state earns all its electoral votes, so campaigns pour time and money into swing states. A candidate can win without a national popular majority.",
      stim="APGOV-T1-S08"),
    Q(1, 2, CA,
      "Third parties rarely win seats in Congress mainly because of",
      ["single-member districts with plurality rule", "a constitutional ban on third parties", "the Electoral College's role in House races", "federal limits on how large a party may be"],
      "When one candidate wins each district with the most votes, a third party with steady but small support wins nothing, so voters drift to the two major parties.",
      ),
    Q(1, 2, CA,
      "A voter picks the candidate whose tax plan will most help her own family's budget. This is",
      ["rational-choice voting", "retrospective voting", "party-line voting", "straight-ticket voting"],
      "Rational-choice voting is based on what the voter judges to be in her own interest. Retrospective voting judges past performance.",
      ),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, DA,
      "Which trend does the table show?",
      ["A growing share of adults call themselves independent", "A growing share of adults call themselves Republican", "The Democratic share grows over the thirty years", "The shares of all three groups stay roughly the same over time"],
      "Independents rise from 33% to 42% over thirty years while both major parties' shares fall.",
      stim="APGOV-T2-S07"),
    Q(2, 2, CA,
      "The trend in the table is most consistent with",
      ["dealignment from the parties", "a critical realignment", "a rise in party-line voting", "the growth of party machines"],
      "Dealignment is a decline in attachment to either party. A realignment would shift lasting support from one party to the other.",
      stim="APGOV-T2-S07"),
    Q(2, 2, SA,
      "Compared with the period before the 1970s, the process in the infographic gives",
      ["voters, not party leaders, the main say", "party leaders more control over nominees", "Congress a role in naming nominees", "caucuses in place of every primary"],
      "Reforms after 1968 tied delegates to primary and caucus results, so voters rather than party bosses at conventions now largely choose nominees.",
      stim="APGOV-T2-S08"),
    Q(2, 2, CA,
      "States that move their contests in Step 1 earlier to gain influence are",
      ["front-loading", "gerrymandering", "logrolling", "dealigning"],
      "Front-loading is scheduling primaries and caucuses early in the season, when they can shape which candidates survive.",
      stim="APGOV-T2-S08"),
    Q(2, 2, CA,
      "The National Voter Registration Act of 1993 made it easier to vote by",
      ["letting people register at motor vehicle offices", "making Election Day a paid holiday in every state", "mailing every adult a ballot automatically", "allowing online voting in all federal races"],
      "Known as the motor voter law, it required states to offer voter registration when people apply for or renew a driver's license, and by mail.",
      ),
    Q(2, 2, CA,
      "Voters who punish the president's party because the economy did poorly over the past year are",
      ["voting retrospectively", "voting prospectively", "splitting their tickets", "acting as delegates"],
      "Retrospective voting judges candidates or parties by past results. Prospective voting judges them by promises for the future.",
      ),
    # ---------------- Drill only ----------------
    Q(0, 2, DA,
      "Turnout among people with a bachelor's degree or more is how many percentage points higher than among people without a high school diploma?",
      ["42", "15", "17", "25"],
      "77 - 35 = 42 points. 25 compares the degree group with diploma holders (77 - 52), and 17 compares diploma holders with those without one.",
      stim="APGOV-D-S06"),
    Q(0, 1, DA,
      "Which statement is best supported by the table?",
      ["Turnout rises with education", "Most people without a diploma vote", "Education has no link to turnout", "Graduates vote less than others"],
      "Turnout climbs at every step, from 35% without a diploma to 77% with a degree.",
      stim="APGOV-D-S06"),
    Q(0, 2, CA,
      "Which explanation of the pattern fits political science research best?",
      ["Education raises political efficacy", "Only graduates may register to vote", "Ballots are printed only for graduates", "Graduates live in states with more elections"],
      "Education builds knowledge, skills and a sense that one's vote matters (efficacy), all linked to higher turnout. No law limits voting by education.",
      stim="APGOV-D-S06"),
    Q(0, 1, CA,
      "A citizen who believes her vote can change government policy has high",
      ["political efficacy", "party identification", "partisan polarization", "political socialization"],
      "Political efficacy is the belief that one can understand and influence politics; people with high efficacy vote more.",
      ),
    Q(0, 1, CA,
      "Which is a main function of political parties?",
      ["Recruiting and nominating candidates", "Writing federal regulations", "Confirming federal judges", "Counting the electoral votes each January"],
      "Parties recruit candidates, nominate them, mobilize voters and organize government. Agencies write regulations and the Senate confirms judges.",
      ),
    Q(0, 2, CA,
      "A lasting shift in which groups support each party, often marked by one election, is",
      ["a realignment", "a dealignment", "a rally effect", "ticket splitting"],
      "In a critical election and realignment, new coalitions form and last for years. Dealignment is a weakening of party ties without a new alignment.",
      ),
    Q(0, 2, CA,
      "Third parties most often affect American politics by",
      ["pushing major parties to adopt their ideas", "winning control of several state legislatures", "electing presidents in close races", "naming most federal judges"],
      "When a third party's issue draws votes, a major party often takes up the issue to win those voters back.",
      ),
    Q(0, 1, CA,
      "A voter chooses a Republican for president and a Democrat for the House. This is",
      ["ticket splitting", "straight-ticket voting", "front-loading", "logrolling"],
      "Ticket splitting is voting for candidates of different parties for different offices on the same ballot.",
      ),
    Q(0, 1, CA,
      "A closed primary is one in which",
      ["only registered party members may vote", "any registered voter may take part", "party leaders choose the nominee", "the top two finishers always advance"],
      "Closed primaries limit voting to the party's registered members. Open primaries let voters choose a party's ballot on the day.",
      ),
    Q(0, 2, CA,
      "Which is a structural barrier to voting?",
      ["An early registration deadline", "Low interest in the candidates", "Distrust of elected officials", "Weak attachment to a party"],
      "Structural barriers are rules and procedures, such as registration deadlines, that make voting harder. The others are attitudes.",
      ),
    Q(0, 2, CA,
      "Turnout in the United States is lower than in some democracies partly because some of those countries",
      ["require citizens to vote", "elect far more officials each year", "use electoral colleges", "ban absentee voting"],
      "Compulsory voting, as in Australia, pushes turnout far higher. Electing more officials more often tends to lower turnout through voter fatigue.",
      ),
    Q(0, 1, CA,
      "A party's formal statement of its positions, adopted at its national convention, is its",
      ["platform", "caucus", "mandate", "plurality"],
      "The platform sets out the party's positions on issues; individual planks address specific policies.",
      ),
    Q(0, 2, CA,
      "Under proportional representation, a party winning 20 percent of the vote would usually get",
      ["about a fifth of the seats", "no seats unless it came first", "half the seats in the legislature", "a single seat for the whole party"],
      "Proportional systems give parties seats in rough proportion to their vote share, which helps smaller parties win seats.",
      ),
]
