# Sources for `ptcam` (Exame CAM, Portugal Driver CPC initial qualification)

All checked 2026-11-06.

## Format of the real exam

- **Despacho do Presidente do Conselho Diretivo do IMTT de 21 de outubro de 2009** (published as
  Despacho n.º 26482/2009), "fixa o modelo do certificado de aptidão para motorista (CAM) e as
  condições de realização dos exames":
  https://www.imt-ip.pt/wp-content/uploads/Documents/DespachoIMTT_CAM_Exames.pdf
  (text extracted from the PDF on 2026-11-06). Section II:
  - 2: "Os exames são compostos por uma prova escrita constituída por 60 perguntas de escolha entre
    quatro respostas, perguntas de resposta directa, ou uma combinação dos dois sistemas."
  - 3: "Os exames têm a duração de duas horas."
  - 4: scored "na escala de 0 a 100 valores, tendo cada questão igual cotação."
  - 5: "A aprovação em exame depende da obtenção de, pelo menos, 60% da pontuação atribuída à prova."
  - Section I.2: only candidates who finished the initial qualification course less than two years
    earlier are admitted. Section II.1: the exam covers the training content of Annex I of
    Decreto-Lei n.º 126/2009.
  - Annex I: registrations are made collectively by the training provider through an IMT
    application; after a fail a candidate can re-register individually; a failed candidate can
    ask for a review within ten working days.
- **Still in force:** gov.pt, "Motorista de veículo pesado de passageiros: certificação"
  (https://www.gov.pt/servicos/motorista-de-veiculo-pesado-de-passageiros-certificacao, checked
  2026-11-06) still lists Despacho n.º 26482/2009 (IMTT) as the act that sets the CAM model and the
  exam conditions, next to Decreto-Lei 126/2009 and Decreto-Lei 102-C/2020. No later despacho
  replacing it was found. Confirmed: 60 questions, 2 hours, equal weight, 60% to pass.
- gov.pt (same page): qualification is shown by the CAM and, for drivers resident in Portugal, by
  code 95 on the driving licence; "A certificação é válida por cinco anos."
- IMT, "Perguntas de exame" (https://www.imt-ip.pt/condutores/obtencao/perguntas-de-exame/):
  publishes the CAM question lists in four groups ("Profissionais CAM: grupo de questões 1 a 4").
  Not opened and not used: every Tigertest item is original.
- IMT news of 23 October 2009 (https://www.imt-ip.pt/?p=5600): the training follows Annex I of
  Decreto-Lei 126/2009 in eleven modules.
- Decreto-Lei n.º 102-C/2020 transposes Directive (EU) 2018/645 and republishes Decreto-Lei
  126/2009 (gov.pt list above; IMT news https://www.imt-ip.pt/?p=6095).

Not confirmed, so left off the landing: course hours in Portugal (the Directive's 280 h common /
140 h accelerated minima are EU figures; no current Portuguese page states them), minimum ages,
fees, exam booking lead times. Direct-answer (resposta direta) questions exist in the despacho but
are not modelled.

## Content (what the questions are written from)

- Directive 2003/59/EC, Annex I, as amended by Directive (EU) 2018/645 (sections 1.1 to 1.6
  rational driving and loading, 2.1 to 2.3 regulations, 3.1 to 3.8 health, road safety,
  environment, service, logistics), transposed by Decreto-Lei n.º 126/2009 as republished by
  Decreto-Lei n.º 102-C/2020. Categories follow these sections; the weights are Tigertest's.
- Regulation (EC) 561/2006 as amended by Regulation (EU) 2020/1054 (driving times, breaks,
  rest, regular weekly rest not in the vehicle, return every four weeks, 1 h / 2 h extension,
  ferry and train, multi-manning, 2.5 t to 3.5 t international vans from 1 July 2026):
  https://eur-lex.europa.eu/eli/reg/2006/561/oj
- Regulation (EU) 165/2014 (tachographs: card validity five years, replacement within seven
  calendar days, up to 15 days with printouts, two-yearly inspection, records of the current day
  and the previous 56 days since 31 December 2024, one-year retention):
  https://eur-lex.europa.eu/eli/reg/2014/165/oj ; driver card download every 28 days from
  Regulation (EU) 581/2010.
- Decreto-Lei n.º 237/2007 (working time of mobile workers, transposing Directive 2002/15/EC:
  48 h average, 60 h in a single week, 30 min / 45 min breaks).
- Regulation (EC) 1072/2009 as amended by Regulation (EU) 2020/1055 (community licence copy in the
  vehicle, driver attestation, cabotage three operations in seven days, four-day cooling-off);
  Regulation (EC) 1073/2009 (journey form for occasional international coach services).
- Regulation (EU) 181/2011 (bus and coach passenger rights: assistance asked 36 hours ahead,
  information within 30 minutes of a delay, choice of continuation or reimbursement).
- CMR Convention art. 5 (three originals; the second accompanies the goods).
- Decreto-Lei n.º 239/2003 (guia de transporte for national road haulage).
- Código da Estrada (Lei n.º 24/2025 wording): art. 81 (0,2 g/l for drivers of heavy passenger
  and goods vehicles), art. 82 (seat belts wherever fitted), art. 38 (1,5 m when overtaking
  cyclists), triangle at least 30 m behind and visible at 100 m, retroreflective vest.
- Directive 92/6/EEC as amended by 2002/85/EC (speed limiters: 90 km/h goods vehicles over 3,5 t,
  100 km/h buses and coaches).
- EN 12195-1 and the EU best practice guidelines on cargo securing (0,8 g forward, 0,5 g sideways
  and rearwards; friction and direct lashing; LC on the label).

## Lanes kept

- Kept clear of `data/portugal-imt-questions_pt.json` (ptimt: car-level CE rules, 50 m truck
  spacing, left-lane ban over 7 m, 0,2 g/l for probationary and TVDE drivers) and of the sibling
  `data/pt-tvde-questions.json` (pttvde): four items that repeated its fact-and-answer pairs
  (tyre pressure, 112, first thing to say on 112, recovery position) were replaced.
- Original Portuguese items; no stem copied from `uklgv`, `ukpcv`, `iedttcv` or `cdl` (those are
  English; facts such as the drivers' hours limits are shared EU law, written fresh here).

## Review pass (2026-11-07)

- Format re-confirmed against the IMT PDF of the despacho of 21 October 2009
  (https://www.imt-ip.pt/wp-content/uploads/Documents/DespachoIMTT_CAM_Exames.pdf): 60 questions,
  four-option and/or direct answer, 2 hours, 0 to 100 equal weight, 60% to pass, admission within
  two years of the course. Landing, FAQ and WIRING examFacts agree.
- Rewritten as near-repeats of `ptimt`: EMG-001 (first thing at an accident), EMG-002 (triangle
  30 m), EMG-003 (vest), EMG-023 (wet road distance), SAU-007 (alcohol leaves only with time),
  SAU-008 (read the medicine leaflet). REG-011 (CAM validity, too close to a question about the
  qualification itself) replaced with licence category D vs D1.
