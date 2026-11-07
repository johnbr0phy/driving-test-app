# Sources for `espolicia` (Policía Nacional, Escala Básica: prueba de conocimientos, in Spanish)

All 200 questions are original, written directly in Spanish from the laws and the official temario
below. Nothing was copied from a past paper (the DGP publishes the cuestionarios after each sitting),
an academy's test bank or an app. Checked 2026-11-06 unless noted.

## Exam format (confirmed from the BOE)
- Resolución de 7 de julio de 2026, de la Dirección General de la Policía, por la que se convoca
  oposición libre ... Escala Básica, categoría de Policía (BOE núm. 167, 10 July 2026,
  BOE-A-2026-15055, pp. 96257-96305), downloaded and read 2026-11-06:
  https://www.boe.es/boe/dias/2026/07/10/pdfs/BOE-A-2026-15055.pdf
  (found through the BOE sumario API for 2026-07-10:
  https://www.boe.es/datosabiertos/api/boe/sumario/20260710)
  - Base 6.1: every test of the fase de oposición is eliminatory.
  - Base 6.1.1, primera prueba (de conocimientos): "contestación por escrito en cincuenta minutos a un
    cuestionario de cien preguntas, con un enunciado y tres alternativas de respuestas de las que
    solo una es verdadera", on the temario of anexo I.
  - Scoring: [A − E/(n−1)] × 10 / P (A correct, E wrong, n options, P questions), 0 to 10. With
    three options each wrong answer takes off half a correct one; blanks score nothing.
  - Only candidates with at least 3 points who rank best go on, up to 1,75 candidates per each of
    the 2.163 places not reserved for military personnel; ties at the cut-off all go on. For the
    reserved places the cut-off is the lower of 5 points and the last apto in the open list.
  - 2.704 places in all: 2.163 open, 541 reserved for militares profesionales de tropa y marinería.
  - Segunda prueba: aptitud física (anexo II), average of at least 5, a zero in any exercise
    eliminates. Tercera prueba: (a) reconocimiento médico, (b) entrevista profesional y personal
    (biographical questionnaire and personality tests may be used to prepare it), (c) test
    psicotécnicos (aptitudes, up to 60 minutes, same formula).
  - Base 6.7: the knowledge test and the psicotécnicos (part c of the third test) are held in a
    single sitting ("en un acto único").
  - Base 6.11: the fase de oposición score is the sum of the knowledge test and the physical test.
  - Base 2.1.1: Spanish nationality, 18 or over, Bachiller or equivalent, permiso B, commitment to
    carry arms, and at least level A2 in English or French (accredited before applying; not a test
    of the oposición). Base 6.14: higher language certificates add up to 2 points.
  - Anexo I: the 45-tema temario in three blocks, A) Ciencias Jurídicas (temas 1 to 26),
    B) Ciencias Sociales (27 to 37, including 36 Gramática and 37 Ortografía), C) Materias
    Técnico-Científicas (38 to 45). Topic list summarised in spec.json.
- The research notes said the knowledge test was held with spelling, English, psychotechnical and
  personality tests. The 2026 bases list no separate spelling or English test (English is an A2
  requirement; spelling and grammar are temas 36 and 37). The landing follows the BOE.
- Interior ministry Escala Básica page (lists the convocatoria and later resolutions):
  https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/empleo-publico/procesos-selectivos/policia-nacional/escala-basica/
- Previous cohort: Resolución de 7 de julio de 2026 (BOE-A-2026-15042) names policías alumnos from
  the 2025 convocatoria (Resolución de 31 de julio de 2025, BOE núm. 192, 11 August 2025).
  https://www.boe.es/boe/dias/2026/07/10/pdfs/BOE-A-2026-15042.pdf

## Not confirmed / left out
- Date of the 2026 knowledge test: academy guides say 26 September 2026
  (https://redopositor.com/blog/es-convocatoria-policia-nacional-2026-plazas-fechas/,
  https://www.adams.es/noticias/oposiciones/convocatorias/policia-nacional-convocatoria-2026/).
  Not on the landing; the BOE says the date is announced on the Portal del Aspirante.
- Official weights per tema: none. The 30/11/9 per-test split follows the number of temas per
  block (26/11/8); the split inside each block is Tigertest's.
- The 2026 cut-off score: not published at the time of writing; not stated.
- Fees: not asked and not stated.

## Law used for the questions (in force November 2026)
- Constitución Española de 1978: arts. 1, 9.3, 17, 18, 24, 25, 53, 54, 81, 86, 104, 113, 116, 122,
  124, 126, 154, 159.
- Código Civil (personalidad, art. 30 as amended by Ley 20/2011; capacidad; nacionalidad por
  residencia, art. 22).
- Ley 40/2015 de Régimen Jurídico del Sector Público; Ley 50/1997 del Gobierno; TREBEP (RDL 5/2015).
- Ley Orgánica 2/1986 de Fuerzas y Cuerpos de Seguridad (principios básicos, funciones, Policías
  Locales, Juntas Locales de Seguridad, Consejo de Policía); Ley Orgánica 9/2015 de Régimen de
  Personal de la Policía Nacional (escalas, categorías, segunda actividad).
- Ley Orgánica 4/2000 de extranjería (infracciones, devolución, denegación de entrada,
  internamiento hasta 60 días); Real Decreto 240/2007 (ciudadanos de la UE); Ley 12/2009 de
  protección internacional; Convención de Nueva York de 1954.
- Ley 5/2014 de Seguridad Privada; Ley Orgánica 4/2015 de protección de la seguridad ciudadana
  (DNI, identificación, ocupación temporal, infracciones graves y leves); Ley Orgánica 9/1983
  (reunión, comunicación previa de 10 a 30 días naturales); Ley 8/2011 for the concept of
  infraestructura crítica only (a bill transposing Directive (EU) 2022/2557 was in the Congreso in
  2026, expediente 121/000088, so no item rests on Ley 8/2011's plans or catalogue rules:
  https://www.congreso.es/webpublica/documentacion/docs_trabajo/leg15/121_000088/121_000088_dosier.pdf).
- Código Penal (LO 10/1995) as amended to 2026, including LO 10/2022 (consent) and LO 14/2022
  (desórdenes); Ley Orgánica 5/2000 (menores).
- Ley de Enjuiciamiento Criminal (denuncia, detención por particulares, derechos del detenido,
  abogado en tres horas, agente encubierto, entrega vigilada, intervención de comunicaciones tras
  LO 13/2015); Ley Orgánica 6/1984 de habeas corpus. No item names juzgados, which Ley Orgánica
  1/2025 turned into Tribunales de Instancia; only the Audiencia Nacional is named.
- Ley 4/2015 del Estatuto de la víctima del delito.
- Ley Orgánica 3/2007 de igualdad; Ley Orgánica 1/2004; Ley 39/2006 de dependencia; Ley 4/2023.
- Ley 31/1995 de Prevención de Riesgos Laborales; Real Decreto 2/2006 (Policía Nacional).
- Reglamento (UE) 2016/679, Ley Orgánica 3/2018, Ley Orgánica 7/2021.
- Declaración Universal de Derechos Humanos (1948); Convenio Europeo de Derechos Humanos (1950),
  art. 3; Convenio Europeo para la Prevención de la Tortura (1987).
- Reglamento de Armas (Real Decreto 137/1993, as amended): categorías 1.ª and 5.ª, licencias A to D.
- Reglamento General de Circulación, arts. 67 to 69 (vehículos prioritarios).
- RAE and ASALE, Ortografía de la lengua española (2010) and Nueva gramática (guion, ex-, solo,
  latinismos, sino/si no, por qué).

## Coordination with siblings (Nov 2026)
- `data/es-guardia-civil-questions.json` (esguardia) was on disk while this bank was written and
  overlaps the legal temario. Every item sharing a fact and answer with it was rewritten (DNI age,
  six hours for identification, habeas corpus 24 hours, CIE 60 days, devolución, seguridad privada
  complementaria, composición equilibrada, discriminación indirecta, MNP, DUDH, guía de pertenencia,
  datos de menores, LO 1/2004 scope, Policía Judicial dependence, registro corporal, homicidio to
  asesinato, consent age). esvigilante and escapcond were checked once on disk (ESPN-PRO-008 rewritten to art. 520.2 to leave art. 490 to esvigilante). This bank keeps four
  seguridad privada items (escolta, detective, deber de colaborar, control by the Policía Nacional)
  and four vehicle-safety items; they should grep `ESPN-` before writing.
