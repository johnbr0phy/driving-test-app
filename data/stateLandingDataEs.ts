import { StateLandingInfo } from "./stateLandingData";

export const stateLandingDataEs: Record<string, StateLandingInfo> = {
  AL: {
    retakeWaitTime: "Siguiente día hábil",
    retakeInfo: "Si repruebas el examen escrito de Alabama, puedes repetirlo el siguiente día hábil. No hay límite en el número de intentos, pero debes pagar la tarifa del examen cada vez.",
    handbookUrl: "https://www.alea.gov/dps/driver-license/driver-manual",
    handbookName: "Alabama Driver Manual",
    notableRules: [
      "Alabama usa un sistema de Licencia de Conducir Gradual (GDL) para conductores menores de 18 años, con restricciones de conducción nocturna y de pasajeros.",
      "Los conductores nuevos menores de 18 años no pueden llevar más de 1 pasajero no familiar menor de 21 años durante los primeros 6 meses.",
      "Todos los titulares de permiso menores de 18 años deben completar un mínimo de 30 horas de práctica de conducción supervisada, incluyendo 4 horas de noche."
    ],
    neighboringSlugs: ["mississippi", "tennessee", "georgia", "florida"],
    onlineTestInfo: "No, el examen escrito de conocimientos de Alabama debe tomarse en persona en una oficina de licencias de conducir de ALEA. No puedes tomar el examen de permiso en línea."
  },
  AK: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Alaska, puedes repetirlo al día siguiente. Deberás pagar la tarifa del examen nuevamente por cada intento.",
    handbookUrl: "https://doa.alaska.gov/dmv/dlmanual/dlman.pdf",
    handbookName: "Alaska Driver Manual",
    notableRules: [
      "Alaska permite permisos de aprendizaje a los 14 años, una de las edades más jóvenes del país.",
      "Los titulares de permiso menores de 18 años deben mantener el permiso por al menos 6 meses antes de tomar el examen práctico de manejo.",
      "Los conductores nuevos menores de 18 años tienen restricción de horario y no pueden conducir entre la 1:00 AM y las 5:00 AM."
    ],
    neighboringSlugs: ["washington", "hawaii"],
    onlineTestInfo: "No, Alaska no ofrece el examen escrito de conocimientos en línea. Debes visitar una oficina del DMV en persona para tomar el examen."
  },
  AZ: {
    retakeWaitTime: "Siguiente día hábil",
    retakeInfo: "Si repruebas el examen escrito de Arizona, puedes regresar el siguiente día hábil para repetirlo. Después de 3 reprobaciones, es posible que debas esperar 30 días antes de intentarlo nuevamente.",
    handbookUrl: "https://azdot.gov/mvd/driver-services/driver-license-information/arizona-driver-license-manual",
    handbookName: "Arizona Driver License Manual",
    notableRules: [
      "Las licencias de conducir de Arizona no vencen hasta los 65 años — uno de los períodos de validez más largos en EE.UU.",
      "La Licencia de Conducir Gradual de Arizona restringe a los pasajeros menores de 18 años y la conducción nocturna durante los primeros 6 meses.",
      "Arizona prohíbe el uso de teléfonos celulares de mano mientras se conduce para todos los conductores."
    ],
    neighboringSlugs: ["california", "nevada", "utah", "new-mexico", "colorado"],
    onlineTestInfo: "No, el examen escrito del MVD de Arizona debe tomarse en persona en una oficina del MVD o en un centro de exámenes autorizado de terceros."
  },
  AR: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Arkansas, puedes repetirlo al día siguiente. Debes pagar la tarifa del examen cada vez que lo tomes.",
    handbookUrl: "https://www.dfa.arkansas.gov/driver-services/driver-license/study-materials/",
    handbookName: "Arkansas Driver License Study Guide",
    notableRules: [
      "Arkansas permite permisos de aprendizaje a los 14 años con el consentimiento de un padre o tutor.",
      "Los titulares de permiso menores de 18 años deben completar un curso de educación vial y registrar horas de conducción supervisada.",
      "Los titulares de licencia intermedia menores de 18 años no pueden conducir entre las 11:00 PM y las 4:00 AM excepto por trabajo o emergencias."
    ],
    neighboringSlugs: ["missouri", "tennessee", "mississippi", "louisiana", "texas", "oklahoma"],
    onlineTestInfo: "No, el examen escrito de conocimientos de Arkansas debe tomarse en persona en una oficina de ingresos del DFA."
  },
  CA: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de California, debes esperar 7 días antes de tu segundo intento y otros 7 días antes del tercero. Después de 3 reprobaciones, debes volver a aplicar y pagar la tarifa de solicitud nuevamente.",
    handbookUrl: "https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/",
    handbookName: "California Driver Handbook",
    notableRules: [
      "California requiere 50 horas de práctica de conducción supervisada (10 horas de noche) antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia provisional menores de 18 años no pueden llevar pasajeros menores de 20 años durante los primeros 12 meses, a menos que estén acompañados por un conductor con licencia de 25 años o más.",
      "El examen escrito de California para menores de 18 años tiene 46 preguntas, y necesitas responder 38 correctamente (83%) para aprobar."
    ],
    neighboringSlugs: ["oregon", "nevada", "arizona"],
    onlineTestInfo: "No, el examen escrito del DMV de California debe tomarse en persona en una oficina del DMV. Puedes hacer una cita en línea para reducir los tiempos de espera."
  },
  CO: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Colorado, puedes repetirlo el siguiente día hábil. No hay límite en el número de intentos.",
    handbookUrl: "https://dmv.colorado.gov/driver-guide",
    handbookName: "Colorado Driver Handbook",
    notableRules: [
      "Colorado requiere que los titulares de permiso menores de 16 años mantengan su permiso por 12 meses antes de tomar el examen práctico de manejo.",
      "Los conductores menores tienen toque de queda nocturno: no pueden conducir entre la medianoche y las 5:00 AM durante el primer año.",
      "Colorado requiere que todos los titulares de permiso menores de 18 años completen 50 horas de conducción supervisada (10 horas de noche)."
    ],
    neighboringSlugs: ["wyoming", "nebraska", "kansas", "new-mexico", "utah"],
    onlineTestInfo: "No, el examen escrito de conocimientos de Colorado debe tomarse en persona en una oficina del DMV o de licencias de conducir."
  },
  CT: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Connecticut, puedes repetirlo tan pronto como el siguiente día hábil en cualquier sucursal del DMV.",
    handbookUrl: "https://portal.ct.gov/dmv/licenses/license-manuals",
    handbookName: "Connecticut Driver's Manual",
    notableRules: [
      "Connecticut requiere que los titulares de permiso de aprendizaje menores de 18 años completen un mínimo de 40 horas de conducción supervisada (8 horas de noche).",
      "Los conductores nuevos menores de 18 años no pueden llevar pasajeros (excepto padres o un instructor de manejo) durante los primeros 6 meses.",
      "Connecticut requiere que todos los titulares de permiso esperen al menos 120 días antes de programar un examen práctico de manejo."
    ],
    neighboringSlugs: ["new-york", "massachusetts", "rhode-island"],
    onlineTestInfo: "No, el examen escrito del DMV de Connecticut debe tomarse en persona en una oficina del DMV."
  },
  DE: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Delaware, debes esperar 7 días antes de repetirlo. Deberás pagar la tarifa del examen nuevamente.",
    handbookUrl: "https://www.dmv.de.gov/driver-services/licenses/delaware-driver-manual",
    handbookName: "Delaware Driver Manual",
    notableRules: [
      "Delaware requiere que los titulares de permiso de aprendizaje tengan al menos 16 años.",
      "Los titulares de permiso deben completar un mínimo de 50 horas de práctica de conducción supervisada (10 de noche) antes del examen.",
      "Los conductores nuevos menores de 18 años no pueden llevar más de 1 pasajero menor de 18 años que no sea familiar durante los primeros 6 meses."
    ],
    neighboringSlugs: ["maryland", "pennsylvania", "new-jersey"],
    onlineTestInfo: "No, el examen escrito del DMV de Delaware debe tomarse en persona en una oficina del DMV."
  },
  DC: {
    retakeWaitTime: "3 días",
    retakeInfo: "Si repruebas el examen escrito de DC, debes esperar al menos 3 días antes de repetirlo. Después de 6 intentos fallidos, es posible que debas completar un curso de educación vial.",
    handbookUrl: "https://dmv.dc.gov/page/driver-knowledge-test",
    handbookName: "DC Driver Knowledge Test Guide",
    notableRules: [
      "DC requiere que los titulares de permiso de aprendizaje tengan al menos 16 años.",
      "Los titulares de permiso deben completar un curso de educación vial aprobado antes de programar el examen práctico de manejo.",
      "Los titulares de licencia provisional menores de 21 años no pueden conducir entre la medianoche y las 6:00 AM."
    ],
    neighboringSlugs: ["maryland", "virginia"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de DC debe tomarse en persona en un centro de servicio del DMV de DC."
  },
  FL: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Florida, puedes repetirlo el siguiente día hábil. Debes pagar la tarifa del examen cada vez.",
    handbookUrl: "https://www.flhsmv.gov/driver-licenses-id-cards/handbooks-manuals/",
    handbookName: "Florida Driver's Handbook",
    notableRules: [
      "Florida requiere completar un curso de Educación sobre Leyes de Tránsito y Abuso de Sustancias (TLSAE) antes de obtener un permiso de aprendizaje.",
      "El examen escrito de Florida tiene 50 preguntas — uno de los más largos del país — y requiere un 80% para aprobar.",
      "Los conductores menores de 18 años no pueden conducir entre las 11:00 PM y las 6:00 AM (o de 1:00 AM a 5:00 AM con un permiso de trabajo válido)."
    ],
    neighboringSlugs: ["georgia", "alabama"],
    onlineTestInfo: "No, el examen de conocimientos Clase E de Florida debe tomarse en persona en una oficina del FLHSMV o en un centro de exámenes autorizado. El curso TLSAE puede completarse en línea."
  },
  GA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Georgia, puedes repetirlo el siguiente día hábil. Hay una tarifa por cada intento de repetición.",
    handbookUrl: "https://dds.georgia.gov/drivers-manual",
    handbookName: "Georgia DDS Driver's Manual",
    notableRules: [
      "La Ley de Joshua de Georgia requiere que los conductores menores de 18 años completen 40 horas de conducción supervisada (6 horas de noche).",
      "Georgia requiere una puntuación aprobatoria de solo el 75%, el umbral más bajo entre la mayoría de los estados.",
      "Los conductores menores de 18 años no pueden llevar más de 3 pasajeros menores de 21 años que no sean familiares durante los primeros 6 meses."
    ],
    neighboringSlugs: ["florida", "alabama", "tennessee", "north-carolina", "south-carolina"],
    onlineTestInfo: "No, el examen de conocimientos del DDS de Georgia debe tomarse en persona en un centro de servicio al cliente del DDS."
  },
  HI: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Hawaii, debes esperar 7 días antes de tomarlo nuevamente. Debes pagar la tarifa del examen por cada intento.",
    handbookUrl: "https://hidot.hawaii.gov/highways/home/driver-licensing/hawaii-drivers-manual/",
    handbookName: "Hawaii Driver's Manual",
    notableRules: [
      "Hawaii requiere que los titulares de permiso mantengan su permiso por al menos 180 días antes de tomar el examen práctico de manejo.",
      "Los conductores nuevos menores de 18 años no pueden conducir entre las 11:00 PM y las 5:00 AM a menos que viajen hacia o desde el trabajo.",
      "Hawaii permite permisos de aprendizaje a partir de los 15 años y 6 meses."
    ],
    neighboringSlugs: ["california"],
    onlineTestInfo: "No, el examen escrito de conocimientos de Hawaii debe tomarse en persona en una oficina de licencias de conducir del condado."
  },
  ID: {
    retakeWaitTime: "3 días",
    retakeInfo: "Si repruebas el examen escrito de Idaho, debes esperar 3 días hábiles antes de repetirlo. Debes pagar la tarifa del examen cada vez.",
    handbookUrl: "https://itd.idaho.gov/drive/manuals/",
    handbookName: "Idaho Driver's Manual",
    notableRules: [
      "Idaho requiere una puntuación aprobatoria del 85%, uno de los umbrales más altos del país.",
      "Idaho permite permisos de aprendizaje a los 14 años y 6 meses con un curso de educación vial completado.",
      "Los titulares de permiso de instrucción supervisada deben completar la capacitación de conducción, incluyendo 50 horas de práctica de manejo (10 de noche)."
    ],
    neighboringSlugs: ["montana", "wyoming", "utah", "nevada", "oregon", "washington"],
    onlineTestInfo: "No, el examen de conocimientos de Idaho debe tomarse en persona en una oficina del Idaho Transportation Department."
  },
  IL: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Illinois, puedes repetirlo el siguiente día hábil en cualquier instalación del Secretary of State.",
    handbookUrl: "https://www.ilsos.gov/publications/pdf_publications/dsd_a112.pdf",
    handbookName: "Illinois Rules of the Road",
    notableRules: [
      "Illinois requiere que los titulares de permiso menores de 18 años mantengan su permiso por al menos 9 meses antes del examen.",
      "Los conductores menores de 18 años no pueden conducir entre las 10:00 PM (11:00 PM los fines de semana) y las 6:00 AM.",
      "Todos los conductores de Illinois deben pasar un examen de visión en cada renovación de licencia."
    ],
    neighboringSlugs: ["indiana", "wisconsin", "iowa", "missouri", "kentucky"],
    onlineTestInfo: "No, el examen escrito de Illinois debe tomarse en persona en una instalación de servicios de licencias de conducir del Secretary of State."
  },
  IN: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Indiana, puedes repetirlo el siguiente día hábil. Cada intento requiere el pago de la tarifa del examen.",
    handbookUrl: "https://www.in.gov/bmv/licenses-permits-ids/files/drivers-manual.pdf",
    handbookName: "Indiana Driver's Manual",
    notableRules: [
      "Indiana requiere que los titulares de permiso registren 50 horas de conducción supervisada (10 horas de noche) antes del examen práctico de manejo.",
      "Los conductores menores de 18 años con licencia provisional no pueden conducir entre las 10:00 PM y las 5:00 AM excepto por trabajo o escuela.",
      "Indiana permite permisos de aprendizaje a los 15 años con inscripción en un curso certificado de educación vial."
    ],
    neighboringSlugs: ["illinois", "michigan", "ohio", "kentucky"],
    onlineTestInfo: "Indiana ofrece el examen escrito de conocimientos en las sucursales del BMV. Algunos cursos aprobados de educación vial incluyen componentes en línea, pero el examen oficial de conocimientos se toma en persona."
  },
  IA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Iowa, puedes repetirlo el siguiente día hábil. No hay tarifa adicional por repeticiones dentro del período de solicitud del permiso.",
    handbookUrl: "https://iowadot.gov/mvd/driverslicense/manual",
    handbookName: "Iowa Driver's Manual",
    notableRules: [
      "Iowa permite permisos de aprendizaje a los 14 años, una de las edades mínimas más jóvenes en EE.UU.",
      "El examen de conocimientos de Iowa tiene 35 preguntas, y debes responder 28 correctamente (80%) para aprobar.",
      "Los titulares de licencia intermedia menores de 18 años tienen restricción de conducir entre las 12:30 AM y las 5:00 AM."
    ],
    neighboringSlugs: ["minnesota", "wisconsin", "illinois", "missouri", "nebraska", "south-dakota"],
    onlineTestInfo: "Iowa sí ofrece una opción en línea para el examen de conocimientos a través de algunos proveedores aprobados de educación vial. Consulta con tu oficina local del DOT para verificar la disponibilidad."
  },
  KS: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Kansas, puedes repetirlo el siguiente día hábil en cualquier oficina de licencias de conducir.",
    handbookUrl: "https://www.ksrevenue.gov/dovmanuals.html",
    handbookName: "Kansas Driving Handbook",
    notableRules: [
      "Kansas permite permisos de aprendizaje a los 14 años, una de las edades más jóvenes del país.",
      "Los titulares de licencia restringida menores de 16 años no pueden conducir entre las 9:00 PM y las 5:00 AM.",
      "Kansas requiere que los titulares de permiso menores de 16 años mantengan su permiso por 12 meses antes de poder actualizarlo."
    ],
    neighboringSlugs: ["nebraska", "missouri", "oklahoma", "colorado"],
    onlineTestInfo: "No, el examen de conocimientos de Kansas debe tomarse en persona en una oficina de licencias de conducir de Kansas."
  },
  KY: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Kentucky, debes esperar 7 días antes de poder repetirlo. Debes pagar la tarifa del examen por cada intento.",
    handbookUrl: "https://drive.ky.gov/driver-licensing/Pages/Driver-Manual.aspx",
    handbookName: "Kentucky Driver Manual",
    notableRules: [
      "Kentucky requiere que los titulares de permiso mantengan su permiso por al menos 180 días antes de tomar el examen práctico de manejo.",
      "Los conductores menores de 18 años tienen toque de queda nocturno y no pueden conducir entre la medianoche y las 6:00 AM.",
      "Kentucky requiere 60 horas de práctica de conducción supervisada (10 horas de noche) antes del examen práctico de manejo."
    ],
    neighboringSlugs: ["indiana", "ohio", "west-virginia", "virginia", "tennessee"],
    onlineTestInfo: "No, el examen escrito de conocimientos de Kentucky debe tomarse en persona en una oficina del circuit clerk."
  },
  LA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Louisiana, puedes repetirlo el siguiente día hábil en cualquier oficina del OMV.",
    handbookUrl: "https://www.expresslane.org/Pages/Driver-Guide.aspx",
    handbookName: "Louisiana Driver's Guide",
    notableRules: [
      "Louisiana requiere que todos los conductores primerizos menores de 18 años completen un curso de educación vial aprobado por el estado.",
      "Los titulares de permiso deben mantener el permiso por al menos 180 días antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia intermedia menores de 17 años no pueden conducir entre las 11:00 PM y las 5:00 AM."
    ],
    neighboringSlugs: ["texas", "arkansas", "mississippi"],
    onlineTestInfo: "No, el examen de conocimientos de Louisiana debe tomarse en persona en una ubicación de la Office of Motor Vehicles (OMV)."
  },
  ME: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Maine, puedes repetirlo el siguiente día hábil. La tarifa del examen aplica cada vez.",
    handbookUrl: "https://www.maine.gov/sos/bmv/licenses/motorist-handbook.html",
    handbookName: "Maine Motorist Handbook and Study Guide",
    notableRules: [
      "Maine requiere que los titulares de permiso menores de 18 años mantengan su permiso por al menos 6 meses antes de tomar el examen práctico de manejo.",
      "Los conductores nuevos menores de 21 años no pueden llevar pasajeros menores de 20 años (excepto familiares) durante los primeros 270 días.",
      "Maine requiere 70 horas de conducción supervisada (10 horas de noche) — una de las más altas del país."
    ],
    neighboringSlugs: ["new-hampshire", "massachusetts", "vermont"],
    onlineTestInfo: "No, el examen de conocimientos de Maine debe tomarse en persona en una oficina del BMV."
  },
  MD: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Maryland, debes esperar 7 días antes de repetirlo. Después de múltiples reprobaciones, puede aplicar un período de espera adicional.",
    handbookUrl: "https://mva.maryland.gov/pages/driver-manuals.aspx",
    handbookName: "Maryland Driver's Manual",
    notableRules: [
      "Maryland requiere 22 respuestas correctas de 25 (88%), uno de los umbrales más altos del país.",
      "Los titulares de permiso deben tener al menos 15 años y 9 meses — un requisito de edad inusual.",
      "Maryland requiere 60 horas de conducción supervisada (10 de noche) antes de tomar el examen práctico de manejo."
    ],
    neighboringSlugs: ["delaware", "pennsylvania", "virginia", "west-virginia", "district-of-columbia"],
    onlineTestInfo: "No, el examen de conocimientos de Maryland debe tomarse en persona en una oficina del MVA. El examen está disponible en múltiples idiomas."
  },
  MA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Massachusetts, puedes repetirlo el siguiente día hábil en cualquier ubicación del RMV.",
    handbookUrl: "https://www.mass.gov/lists/drivers-manuals",
    handbookName: "Massachusetts Driver's Manual",
    notableRules: [
      "Massachusetts requiere una puntuación aprobatoria de solo el 72%, la más baja del país.",
      "Los conductores menores de 18 años tienen una Licencia de Operador Junior (JOL) con restricciones de pasajeros y conducción nocturna.",
      "Los titulares de JOL no pueden conducir entre las 12:30 AM y las 5:00 AM y no pueden llevar pasajeros menores de 18 años (excepto hermanos) durante los primeros 6 meses."
    ],
    neighboringSlugs: ["connecticut", "rhode-island", "new-hampshire", "new-york", "vermont"],
    onlineTestInfo: "No, el examen de conocimientos del RMV de Massachusetts debe tomarse en persona en un centro de servicio del RMV."
  },
  MI: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Michigan, puedes repetirlo el siguiente día hábil en cualquier sucursal del Secretary of State.",
    handbookUrl: "https://www.michigan.gov/sos/resources/read-the-drivers-manual",
    handbookName: "What Every Driver Must Know (Michigan)",
    notableRules: [
      "Michigan usa un sistema de licencias graduales de dos niveles (Nivel 1 y Nivel 2) para conductores menores de 18 años.",
      "El examen de conocimientos de Michigan tiene 50 preguntas, uno de los más largos del país.",
      "Los titulares de Nivel 1 (permiso) deben registrar 50 horas de conducción supervisada (10 de noche) y mantener el permiso por al menos 180 días."
    ],
    neighboringSlugs: ["ohio", "indiana", "wisconsin"],
    onlineTestInfo: "No, el examen de conocimientos de Michigan debe tomarse en persona en una sucursal del Secretary of State."
  },
  MN: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Minnesota, puedes repetirlo el siguiente día hábil en cualquier estación de exámenes del DVS.",
    handbookUrl: "https://dps.mn.gov/divisions/dvs/forms-documents/Pages/drivers-manual.aspx",
    handbookName: "Minnesota Driver's Manual",
    notableRules: [
      "Minnesota prohíbe todo uso de teléfono celular (de mano y manos libres) para conductores menores de 18 años.",
      "Los titulares de licencia provisional menores de 18 años no pueden conducir entre la medianoche y las 5:00 AM durante los primeros 6 meses.",
      "Minnesota requiere que los titulares de permiso mantengan el permiso por al menos 6 meses y completen 40 horas de conducción supervisada."
    ],
    neighboringSlugs: ["wisconsin", "iowa", "south-dakota", "north-dakota"],
    onlineTestInfo: "Minnesota ofrece el examen de conocimientos Clase D en línea a través de un programa piloto aprobado en algunas estaciones de exámenes. Consulta con el DVS para verificar la disponibilidad actual."
  },
  MS: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Mississippi, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://www.dps.ms.gov/driver-services/new-licenses",
    handbookName: "Mississippi Driver's Manual",
    notableRules: [
      "Mississippi permite permisos de aprendizaje a los 15 años con consentimiento de los padres.",
      "Los titulares de licencia intermedia menores de 16 años no pueden conducir entre las 10:00 PM y las 6:00 AM.",
      "Mississippi requiere que los titulares de permiso mantengan el permiso por al menos 12 meses antes de tomar el examen para la licencia completa."
    ],
    neighboringSlugs: ["alabama", "tennessee", "arkansas", "louisiana"],
    onlineTestInfo: "No, el examen de conocimientos de Mississippi debe tomarse en persona en una oficina de licencias de conducir del DPS."
  },
  MO: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Missouri, puedes repetirlo el siguiente día hábil en cualquier oficina de licencias.",
    handbookUrl: "https://dor.mo.gov/driver-license/manuals/",
    handbookName: "Missouri Driver Guide",
    notableRules: [
      "Missouri requiere que los titulares de permiso mantengan su permiso por al menos 182 días antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia intermedia menores de 18 años no pueden conducir entre la 1:00 AM y las 5:00 AM.",
      "Missouri requiere 40 horas de conducción supervisada (10 de noche) antes del examen práctico de manejo."
    ],
    neighboringSlugs: ["iowa", "illinois", "kentucky", "tennessee", "arkansas", "kansas"],
    onlineTestInfo: "No, el examen de conocimientos de Missouri debe tomarse en persona en una oficina de licencias."
  },
  MT: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Montana, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://dojmt.gov/driving/driver-licensing/",
    handbookName: "Montana Driver Manual",
    notableRules: [
      "Montana requiere 27 respuestas correctas de 33 (82%), ligeramente por encima del promedio nacional.",
      "Montana permite permisos de aprendizaje a los 14 años y 6 meses con un curso de educación vial completado.",
      "Montana no tiene una prohibición estatal de teléfonos celulares de mano para conductores adultos, aunque enviar mensajes de texto mientras se conduce está prohibido."
    ],
    neighboringSlugs: ["north-dakota", "south-dakota", "wyoming", "idaho"],
    onlineTestInfo: "No, el examen de conocimientos de Montana debe tomarse en persona en una oficina de la Montana Motor Vehicle Division."
  },
  NE: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Nebraska, puedes repetirlo el siguiente día hábil. Se aplica una tarifa por cada intento.",
    handbookUrl: "https://dmv.nebraska.gov/dl/drivers-manuals",
    handbookName: "Nebraska Driver's Manual",
    notableRules: [
      "Nebraska permite permisos de aprendizaje (Provisional Operator's Permit) a los 14 años.",
      "Los titulares de POP deben estar acompañados por un conductor con licencia que tenga al menos 21 años.",
      "Nebraska requiere que los conductores menores de 18 años completen la educación vial y registren horas de conducción supervisada."
    ],
    neighboringSlugs: ["south-dakota", "iowa", "missouri", "kansas", "colorado", "wyoming"],
    onlineTestInfo: "No, el examen de conocimientos de Nebraska debe tomarse en persona en una oficina del DMV."
  },
  NV: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Nevada, debes esperar 7 días antes de repetirlo. Después de 3 reprobaciones, es posible que debas esperar 6 meses.",
    handbookUrl: "https://dmvnv.com/dlstudyguide.htm",
    handbookName: "Nevada Driver's Handbook",
    notableRules: [
      "El examen escrito de Nevada tiene 50 preguntas y requiere una puntuación aprobatoria del 80%.",
      "Los titulares de permiso deben mantener el permiso por al menos 6 meses y registrar 50 horas de conducción supervisada (10 de noche).",
      "Nevada prohíbe todo uso de teléfonos celulares de mano mientras se conduce, incluyendo en semáforos en rojo."
    ],
    neighboringSlugs: ["california", "oregon", "idaho", "utah", "arizona"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Nevada debe tomarse en persona en una oficina del DMV."
  },
  NH: {
    retakeWaitTime: "10 días",
    retakeInfo: "Si repruebas el examen escrito de New Hampshire, debes esperar 10 días antes de repetirlo.",
    handbookUrl: "https://www.dmv.nh.gov/driver-licensing/drivers-manuals",
    handbookName: "New Hampshire Driver's Manual",
    notableRules: [
      "New Hampshire es el único estado que no requiere que los conductores adultos usen cinturón de seguridad (aunque los conductores menores de 18 años sí deben usarlo).",
      "Los titulares de permiso deben mantener el permiso por al menos 40 días antes del examen práctico de manejo.",
      "Los conductores nuevos menores de 18 años tienen restricciones de pasajeros durante los primeros 6 meses de licencia."
    ],
    neighboringSlugs: ["maine", "vermont", "massachusetts"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de New Hampshire debe tomarse en persona en una oficina del DMV."
  },
  NJ: {
    retakeWaitTime: "14 días",
    retakeInfo: "Si repruebas el examen escrito de New Jersey, debes esperar al menos 14 días antes de repetirlo — la espera más larga del país.",
    handbookUrl: "https://www.nj.gov/mvc/pdf/license/drivermanual.pdf",
    handbookName: "New Jersey Driver Manual",
    notableRules: [
      "New Jersey tiene el programa GDL más estricto: todos los conductores nuevos (incluyendo adultos) deben mostrar calcomanías rojas en sus placas.",
      "El examen escrito de New Jersey tiene 50 preguntas y requiere un 80% para aprobar.",
      "Los titulares de permiso GDL no pueden conducir entre las 11:01 PM y las 5:00 AM y solo pueden llevar 1 pasajero adicional."
    ],
    neighboringSlugs: ["new-york", "pennsylvania", "delaware"],
    onlineTestInfo: "No, el examen de conocimientos del MVC de New Jersey debe tomarse en persona en una agencia del MVC."
  },
  NM: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de New Mexico, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://www.mvd.newmexico.gov/drivers/driver-manuals/",
    handbookName: "New Mexico Driver Manual",
    notableRules: [
      "New Mexico permite permisos de aprendizaje a los 15 años con consentimiento de los padres.",
      "Los titulares de permiso deben mantener el permiso por al menos 6 meses y registrar horas de conducción supervisada.",
      "Los titulares de licencia provisional no pueden conducir entre la medianoche y las 5:00 AM y están limitados a 1 pasajero menor de 21 años."
    ],
    neighboringSlugs: ["arizona", "utah", "colorado", "oklahoma", "texas"],
    onlineTestInfo: "No, el examen de conocimientos del MVD de New Mexico debe tomarse en persona en una oficina de campo del MVD."
  },
  NY: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de New York, puedes repetirlo el siguiente día hábil en cualquier oficina del DMV. Algunas oficinas pueden permitir repetirlo el mismo día si el tiempo lo permite.",
    handbookUrl: "https://dmv.ny.gov/driver-license/drivers-manual",
    handbookName: "New York State Driver's Manual",
    notableRules: [
      "El examen de conocimientos de New York tiene solo 20 preguntas (con 4 sobre señales de tránsito), requiriendo un 70% para aprobar — uno de los más cortos y con el umbral más bajo.",
      "El examen del DMV está disponible en más de 14 idiomas, más que la mayoría de los otros estados.",
      "Los titulares de licencia junior (menores de 18 años) tienen restricciones geográficas y de horario que varían según la región."
    ],
    neighboringSlugs: ["new-jersey", "pennsylvania", "connecticut", "massachusetts", "vermont"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de New York debe tomarse en persona en una oficina del DMV."
  },
  NC: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de North Carolina, puedes repetirlo el siguiente día hábil en cualquier oficina del DMV.",
    handbookUrl: "https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/handbook.aspx",
    handbookName: "North Carolina Driver's Handbook",
    notableRules: [
      "North Carolina requiere que los titulares de permiso menores de 18 años mantengan el permiso por al menos 12 meses — uno de los períodos de tenencia más largos.",
      "Los titulares de licencia provisional limitada no pueden conducir entre las 9:00 PM y las 5:00 AM durante los primeros 6 meses.",
      "Todos los solicitantes de permiso menores de 18 años deben tener a un padre o tutor que firme la solicitud."
    ],
    neighboringSlugs: ["virginia", "tennessee", "georgia", "south-carolina"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de North Carolina debe tomarse en persona en una oficina del DMV."
  },
  ND: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de North Dakota, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://www.dot.nd.gov/divisions/driverslicense/manuals.htm",
    handbookName: "North Dakota Non-Commercial Drivers License Manual",
    notableRules: [
      "North Dakota permite permisos de aprendizaje a los 14 años, una de las edades más jóvenes del país.",
      "Los titulares de permiso menores de 16 años deben completar un curso de educación vial aprobado por el estado.",
      "North Dakota es uno de los estados menos poblados, pero aún requiere el examen completo de conocimientos para todos los solicitantes de permiso."
    ],
    neighboringSlugs: ["montana", "south-dakota", "minnesota"],
    onlineTestInfo: "No, el examen de conocimientos de North Dakota debe tomarse en persona en un sitio de licencias de conducir del DOT."
  },
  OH: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Ohio, puedes repetirlo el siguiente día hábil en cualquier ubicación de deputy registrar del BMV.",
    handbookUrl: "https://www.bmv.ohio.gov/dl-manuals.aspx",
    handbookName: "Ohio's Digest of Motor Vehicle Laws",
    notableRules: [
      "Ohio requiere una puntuación aprobatoria de solo el 75%, una de las más bajas del país.",
      "Los titulares de permiso temporal deben mantener el permiso por al menos 6 meses y registrar 50 horas de conducción supervisada (10 de noche).",
      "Ohio tiene un período de licencia provisional para conductores menores de 18 años con restricciones nocturnas y de pasajeros."
    ],
    neighboringSlugs: ["michigan", "indiana", "kentucky", "west-virginia", "pennsylvania"],
    onlineTestInfo: "No, el examen de conocimientos del BMV de Ohio debe tomarse en persona en una ubicación de deputy registrar."
  },
  OK: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Oklahoma, puedes repetirlo el siguiente día hábil en una ubicación de exámenes del DPS.",
    handbookUrl: "https://oklahoma.gov/dps/obtain-a-driver-license-id-card/handbooks.html",
    handbookName: "Oklahoma Driver's Manual",
    notableRules: [
      "El examen escrito de Oklahoma tiene 50 preguntas, uno de los más largos del país.",
      "Los titulares de permiso de aprendizaje deben tener al menos 15 años y 6 meses.",
      "Los titulares de licencia intermedia menores de 16 años y medio no pueden conducir entre las 10:00 PM y las 5:00 AM."
    ],
    neighboringSlugs: ["kansas", "missouri", "arkansas", "texas", "new-mexico", "colorado"],
    onlineTestInfo: "No, el examen de conocimientos del DPS de Oklahoma debe tomarse en persona en un sitio de exámenes de licencia de conducir del DPS."
  },
  OR: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Oregon, puedes repetirlo el siguiente día hábil. Después de 3 reprobaciones, es posible que debas esperar más tiempo.",
    handbookUrl: "https://www.oregon.gov/odot/dmv/pages/driverid/manual.aspx",
    handbookName: "Oregon Driver Manual",
    notableRules: [
      "Oregon prohíbe el autoservicio de gasolina (los conductores no pueden bombear su propia gasolina en la mayoría de las áreas).",
      "Los titulares de permiso deben registrar 50 horas de conducción supervisada (10 de noche) y mantener el permiso por al menos 6 meses.",
      "Los titulares de licencia provisional menores de 18 años no pueden llevar pasajeros menores de 20 años durante los primeros 6 meses."
    ],
    neighboringSlugs: ["washington", "idaho", "nevada", "california"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Oregon debe tomarse en persona en una oficina del DMV."
  },
  PA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Pennsylvania, puedes repetirlo el siguiente día hábil en cualquier centro de licencias de conducir de PennDOT.",
    handbookUrl: "https://www.dot.state.pa.us/Public/DVSPubsForms/BDL/BDL%20Manuals/Manuals/PA%20Drivers%20Manual%20By%20Chapter/English/PUB%2095.pdf",
    handbookName: "Pennsylvania Driver's Manual",
    notableRules: [
      "El examen escrito de Pennsylvania tiene solo 18 preguntas, la menor cantidad de cualquier estado, y requiere un 83% (15 correctas) para aprobar.",
      "Los titulares de permiso deben registrar 65 horas de conducción supervisada (10 de noche, 5 en mal clima) — uno de los requisitos más detallados.",
      "Los titulares de licencia junior no pueden conducir entre las 11:00 PM y las 5:00 AM."
    ],
    neighboringSlugs: ["new-york", "new-jersey", "delaware", "maryland", "ohio"],
    onlineTestInfo: "No, el examen de conocimientos de PennDOT de Pennsylvania debe tomarse en persona en un centro de licencias de conducir."
  },
  RI: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Rhode Island, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://dmv.ri.gov/licenses-permits-ids/licenses-permits/drivers-manual",
    handbookName: "Rhode Island Driver's Manual",
    notableRules: [
      "Rhode Island requiere que los titulares de permiso de aprendizaje tengan al menos 16 años.",
      "Los titulares de permiso deben mantener el permiso por al menos 6 meses antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia provisional limitada menores de 18 años no pueden conducir entre la 1:00 AM y las 5:00 AM."
    ],
    neighboringSlugs: ["connecticut", "massachusetts"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Rhode Island debe tomarse en persona en una oficina del DMV."
  },
  SC: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de South Carolina, puedes repetirlo el siguiente día hábil en cualquier sucursal del DMV.",
    handbookUrl: "https://www.scdmvonline.com/Driver-Services/Drivers-License/Drivers-License-Manual",
    handbookName: "South Carolina Driver's Manual",
    notableRules: [
      "South Carolina requiere que los titulares de permiso mantengan el permiso por al menos 180 días antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia condicional menores de 17 años no pueden conducir entre la medianoche y las 6:00 AM.",
      "Los conductores menores de 18 años no pueden llevar más de 2 pasajeros menores de 21 años que no sean familiares."
    ],
    neighboringSlugs: ["north-carolina", "georgia"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de South Carolina debe tomarse en persona en una sucursal del DMV."
  },
  SD: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de South Dakota, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://dps.sd.gov/driver-licensing/south-dakota-driver-license-manual",
    handbookName: "South Dakota Driver License Manual",
    notableRules: [
      "South Dakota permite permisos de instrucción a los 14 años, uno de los más jóvenes del país.",
      "South Dakota tiene relativamente pocas restricciones GDL en comparación con otros estados.",
      "Los titulares de permiso deben aprobar tanto un examen escrito como uno de visión antes de recibir su permiso de instrucción."
    ],
    neighboringSlugs: ["north-dakota", "minnesota", "iowa", "nebraska", "wyoming", "montana"],
    onlineTestInfo: "No, el examen de conocimientos de South Dakota debe tomarse en persona en una estación de licencias de conducir del DPS."
  },
  TN: {
    retakeWaitTime: "7 días",
    retakeInfo: "Si repruebas el examen escrito de Tennessee, debes esperar 7 días antes de repetirlo. Debes pagar la tarifa del examen nuevamente.",
    handbookUrl: "https://www.tn.gov/safety/driver-services/classd/dlmanual.html",
    handbookName: "Tennessee Comprehensive Driver License Manual",
    notableRules: [
      "Tennessee requiere que los titulares de permiso mantengan el permiso por al menos 180 días antes de tomar el examen práctico de manejo.",
      "Los titulares de licencia restringida intermedia menores de 18 años no pueden conducir entre las 11:00 PM y las 6:00 AM.",
      "Tennessee requiere 50 horas de conducción supervisada (10 de noche) para titulares de permiso menores de 18 años."
    ],
    neighboringSlugs: ["kentucky", "virginia", "north-carolina", "georgia", "alabama", "mississippi", "arkansas"],
    onlineTestInfo: "No, el examen de conocimientos de Tennessee debe tomarse en persona en un centro de licencias de conducir del DDS."
  },
  TX: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Texas, puedes repetirlo el siguiente día hábil. Debes pagar la tarifa del examen nuevamente por cada intento.",
    handbookUrl: "https://www.dps.texas.gov/section/driver-license/texas-driver-handbook",
    handbookName: "Texas Driver Handbook",
    notableRules: [
      "Texas requiere completar el curso Impact Texas Drivers (iTD), un curso gratuito en línea de concientización sobre la conducción distraída.",
      "Texas requiere 30 horas de instrucción en aula y 44 horas de entrenamiento al volante para conductores menores de 25 años.",
      "Los titulares de licencia provisional menores de 18 años no pueden conducir entre la medianoche y las 5:00 AM ni llevar más de 1 pasajero menor de 21 años."
    ],
    neighboringSlugs: ["new-mexico", "oklahoma", "arkansas", "louisiana"],
    onlineTestInfo: "Sí, Texas permite que el examen de conocimientos se tome en línea a través de proveedores aprobados de cursos de educación vial para solicitantes primerizos menores de 25 años."
  },
  UT: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Utah, puedes repetirlo el siguiente día hábil en cualquier oficina del DLD.",
    handbookUrl: "https://dld.utah.gov/driver-resources/driver-handbooks/",
    handbookName: "Utah Driver Handbook",
    notableRules: [
      "Utah tiene la ley de DUI más estricta de EE.UU. con un límite de BAC de 0.05%, menor que el estándar nacional de 0.08%.",
      "El examen escrito de Utah tiene 50 preguntas y requiere un 80% para aprobar.",
      "Los titulares de permiso deben registrar 40 horas de conducción supervisada (10 de noche) antes del examen práctico de manejo."
    ],
    neighboringSlugs: ["idaho", "wyoming", "colorado", "new-mexico", "arizona", "nevada"],
    onlineTestInfo: "No, el examen de conocimientos del DLD de Utah debe tomarse en persona en una oficina de la Driver License Division."
  },
  VT: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Vermont, puedes repetirlo el siguiente día hábil en cualquier oficina del DMV.",
    handbookUrl: "https://dmv.vermont.gov/licenses/drivers-license/manual",
    handbookName: "Vermont Driver's Manual",
    notableRules: [
      "Vermont requiere que los titulares de permiso menores de 18 años mantengan el permiso por al menos 12 meses — uno de los períodos de tenencia más largos.",
      "Los conductores nuevos menores de 18 años no pueden llevar pasajeros menores de 20 años (excepto familiares) durante los primeros 6 meses.",
      "El examen práctico de manejo de Vermont incluye un componente de conducción invernal cuando las condiciones lo ameritan."
    ],
    neighboringSlugs: ["new-hampshire", "massachusetts", "new-york"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Vermont debe tomarse en persona en una oficina del DMV."
  },
  VA: {
    retakeWaitTime: "15 días",
    retakeInfo: "Si repruebas el examen escrito de Virginia, debes esperar 15 días antes de repetirlo — uno de los tiempos de espera más largos del país.",
    handbookUrl: "https://www.dmv.virginia.gov/drivers/manuals.asp",
    handbookName: "Virginia Driver's Manual",
    notableRules: [
      "Virginia requiere que los titulares de permiso mantengan el permiso por al menos 9 meses antes de tomar el examen práctico de manejo.",
      "Virginia requiere 45 horas de conducción supervisada (15 de noche) — uno de los requisitos de horas nocturnas más altos.",
      "El permiso de aprendizaje de Virginia puede obtenerse a los 15 años y 6 meses, y el examen escrito debe aprobarse antes de que se emita el permiso."
    ],
    neighboringSlugs: ["maryland", "district-of-columbia", "west-virginia", "kentucky", "north-carolina"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Virginia debe tomarse en persona en un centro de servicio al cliente del DMV."
  },
  WA: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Washington, puedes repetirlo el siguiente día hábil en cualquier oficina del DOL.",
    handbookUrl: "https://www.dol.wa.gov/driver-licenses-permits-ids/drivers-guide",
    handbookName: "Washington Driver Guide",
    notableRules: [
      "Washington requiere una licencia intermedia (IDL) para todos los conductores nuevos menores de 18 años, con restricciones de pasajeros y conducción nocturna.",
      "Los titulares de permiso deben mantener el permiso por al menos 6 meses y completar un entrenamiento de conducción aprobado.",
      "Washington requiere un mínimo de 50 horas de práctica de conducción supervisada (10 de noche)."
    ],
    neighboringSlugs: ["oregon", "idaho"],
    onlineTestInfo: "No, el examen de conocimientos del DOL de Washington debe tomarse en persona en una oficina del DOL o en una ubicación de exámenes aprobada."
  },
  WV: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de West Virginia, puedes repetirlo el siguiente día hábil en cualquier oficina regional del DMV.",
    handbookUrl: "https://transportation.wv.gov/DMV/Drivers-Licensing/Pages/Drivers-Licensing.aspx",
    handbookName: "West Virginia Driver's Licensing Handbook",
    notableRules: [
      "West Virginia usa un programa de Licencia de Conducir Gradual (GDL) con licencias de Nivel 1 (permiso de instrucción), Nivel 2 (intermedia) y Nivel 3 (completa).",
      "Los titulares de permiso de Nivel 1 deben mantener el permiso hasta los 16 años antes de poder actualizarlo.",
      "Los conductores de Nivel 2 menores de 18 años no pueden conducir entre las 10:00 PM y las 5:00 AM."
    ],
    neighboringSlugs: ["ohio", "pennsylvania", "maryland", "virginia", "kentucky"],
    onlineTestInfo: "No, el examen de conocimientos de West Virginia debe tomarse en persona en una oficina regional del DMV."
  },
  WI: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Wisconsin, puedes repetirlo el siguiente día hábil en cualquier centro de servicio del DMV.",
    handbookUrl: "https://wisconsindot.gov/Pages/dmv/teen-driver/yr-fsrt-lcns/study-guide.aspx",
    handbookName: "Wisconsin Motorists' Handbook",
    notableRules: [
      "El examen escrito de Wisconsin tiene 50 preguntas, uno de los más largos del país.",
      "Los titulares de permiso deben mantener el permiso por al menos 6 meses y registrar 30 horas de conducción supervisada (10 de noche).",
      "Los titulares de licencia provisional menores de 18 años tienen toque de queda a la medianoche durante los primeros 9 meses."
    ],
    neighboringSlugs: ["michigan", "minnesota", "iowa", "illinois"],
    onlineTestInfo: "No, el examen de conocimientos del DMV de Wisconsin debe tomarse en persona en un centro de servicio del DMV."
  },
  WY: {
    retakeWaitTime: "1 día",
    retakeInfo: "Si repruebas el examen escrito de Wyoming, puedes repetirlo el siguiente día hábil.",
    handbookUrl: "https://www.dot.state.wy.us/home/driver_license_records/manuals.html",
    handbookName: "Wyoming Rules of the Road",
    notableRules: [
      "Wyoming permite permisos de aprendizaje a los 15 años con consentimiento de los padres.",
      "Wyoming tiene restricciones GDL relativamente relajadas en comparación con muchos otros estados.",
      "Los titulares de permiso deben completar un curso de educación vial aprobado por el estado o práctica de conducción supervisada."
    ],
    neighboringSlugs: ["montana", "south-dakota", "nebraska", "colorado", "utah", "idaho"],
    onlineTestInfo: "No, el examen de conocimientos de Wyoming debe tomarse en persona en una oficina de licencias de conducir del WYDOT."
  }
};

export function getStateLandingInfoEs(code: string): StateLandingInfo | undefined {
  return stateLandingDataEs[code];
}
