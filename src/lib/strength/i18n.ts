// Copy for the /how-strong-am-i calculator page (EN / ES).
// FAQ figures are generated from model.ts — re-check them if the standards change.

import type { Lang } from "@/lib/i18n";
import type { Lift, Sex } from "./model";

export interface FaqItem {
  q: string;
  a: string;
}

export interface StrengthStrings {
  title: string;
  meta_description: string;
  eyebrow: string;
  h1_accent: string;
  h1_rest: string;
  sub: string;
  tool_label: string;
  about_legend: string;
  sex_label: string;
  sexes: Record<Sex, string>;
  unit_label: string;
  age_label: string;
  bodyweight_label: string;
  lifts_legend: string;
  lifts_hint: string;
  lift_names: Record<Lift, string>;
  reps_label: string;
  submit: string;
  err_age: string;
  err_bodyweight: string;
  err_lift: string;
  err_lifts: string;
  idle_tag: string;
  idle_desc: string;
  result_tag: string;
  result_pre: string;
  result_top: string;
  result_summary: string;
  groups: Record<Sex, string>;
  lift_top: string;
  lift_1rm: string;
  lift_next: string;
  lift_maxed: string;
  ladder_low: string;
  ladder_high: string;
  share: string;
  share_copied: string;
  share_failed: string;
  share_text: string;
  scan_link: string;
  disclaimer: string;
  cta_tag: string;
  cta_title: string;
  cta_desc: string;
  cta_points: string[];
  cta_soon: string;
  cta_app_store_pre: string;
  cta_app_store: string;
  standards_tag: string;
  standards_title: string;
  standards_desc: string;
  table_captions: Record<Sex, string>;
  bodyweight_col: string;
  standards_note: string;
  faq_tag: string;
  faq_title: string;
  faq_desc: string;
  faq: FaqItem[];
  footer_back: string;
  footer_line: string;
}

export const STRENGTH_STRINGS: Record<Lang, StrengthStrings> = {
  en: {
    title: "How Strong Am I? — BodyRank Free Strength Calculator",
    meta_description:
      "Free “how strong am I” test. Enter your bench, squat and deadlift to see your strength percentile for your age, sex and bodyweight — and your BodyRank tier.",
    eyebrow: "FREE STRENGTH TEST · 60 SECONDS · NO SIGNUP",
    h1_accent: "How strong am I?",
    h1_rest: " Take the test",
    sub: "Enter your bench, squat and deadlift. We rank them against lifters of your sex, age and bodyweight and give you your BodyRank strength rank.",
    tool_label: "Strength calculator",
    about_legend: "01 · About you",
    sex_label: "Sex",
    sexes: { male: "Male", female: "Female" },
    unit_label: "Units",
    age_label: "Age",
    bodyweight_label: "Bodyweight",
    lifts_legend: "02 · Your best lifts",
    lifts_hint: "Leave any lift blank. Didn’t test a max? Enter a set of up to 12 reps and we’ll estimate your one-rep max.",
    lift_names: { bench: "Bench press", squat: "Squat", deadlift: "Deadlift" },
    reps_label: "reps",
    submit: "Calculate my strength rank",
    err_age: "Enter an age from 13 to 90.",
    err_bodyweight: "Enter a bodyweight from {min} to {max} {unit}.",
    err_lift: "Enter up to {max} {unit} and 1–12 whole reps.",
    err_lifts: "Enter at least one lift.",
    idle_tag: "READOUT · AWAITING DATA",
    idle_desc: "Fill in your details and at least one lift. Your percentile, tier and next target show up here.",
    result_tag: "READOUT · STRENGTH RANK",
    result_pre: "You’re in the",
    result_top: "Top {n}%",
    result_summary: "Overall, you’re stronger than {n}% of {group} at your age and bodyweight.",
    groups: { male: "men who lift", female: "women who lift" },
    lift_top: "Top {n}%",
    lift_1rm: "Est. 1RM {weight}",
    lift_next: "{tier} at {weight}",
    lift_maxed: "Top tier reached",
    ladder_low: "TIER 1",
    ladder_high: "TIER 6 · TOP 1%",
    share: "Share my result",
    share_copied: "Copied — paste it anywhere",
    share_failed: "Couldn’t share. Copy the page link instead.",
    share_text: "I’m in the top {n}% ({tier} tier) on the BodyRank strength test. How strong are you?",
    scan_link: "Strength is one number. See your physique score →",
    disclaimer: "Estimates based on published strength standards for people who train. Not a medical or fitness assessment.",
    cta_tag: "WANT A REAL BODY SCAN?",
    cta_title: "Lifts are one number. Your physique is seven.",
    cta_desc: "BodyRank rates your actual body from a single photo — seven AI-scored metrics — and ranks your physique on the same BodyRank ladder.",
    cta_points: [
      "Muscle mass, symmetry, definition, body fat, V-taper, potential and an overall score",
      "Re-scan every 30 days and watch the change",
      "A training plan built around your weak links",
    ],
    cta_soon: "The iOS app is in final testing. Join the list — the first 500 scans are free.",
    cta_app_store_pre: "Download on the",
    cta_app_store: "App Store",
    standards_tag: "STRENGTH STANDARDS",
    standards_title: "What’s a good bench, squat and deadlift?",
    standards_desc: "Typical one-rep maxes for lifters aged 23–40. Top number: the average lifter (50th percentile). Below it: strong — the top 20%.",
    table_captions: { male: "Men", female: "Women" },
    bodyweight_col: "Bodyweight",
    standards_note: "Younger than 23 or older than 40? The calculator adjusts for age automatically.",
    faq_tag: "FAQ",
    faq_title: "How strong should I be?",
    faq_desc: "Quick answers on strength standards, age, and how the test works.",
    faq: [
      {
        q: "How does the “How strong am I?” test work?",
        a: "Enter your best bench press, squat and deadlift — a true one-rep max, or any set of up to 12 reps, which we convert to an estimated max with the Epley formula. We adjust for age, scale for bodyweight (strength grows more slowly than size, so heavier lifters are compared fairly), and compare the result with strength standards for people who train. Your overall score averages every lift you entered, then maps onto the six-tier BodyRank ladder. You can enter one lift or all three — the overall rank averages whatever you give us. A percentile of 70 means you would out-lift 70 of every 100 people who train at your sex, age and bodyweight.",
      },
      {
        q: "How strong should I be?",
        a: "A useful benchmark is the median lifter — someone with a year or two of consistent training. For men that is roughly a bodyweight bench press, a 1.45× bodyweight squat and a 1.85× bodyweight deadlift. For women it is roughly 0.7× bodyweight on the bench, 1.1× on the squat and 1.35× on the deadlift. Hit those and you are stronger than half the people who lift; the top 20% move about 30–40% more. Most people reach the median within one to two years of consistent training, and the first year is by far the fastest. After that, progress is measured in months rather than weeks, which is why percentiles move slowly once you are past the middle of the pack.",
      },
      {
        q: "How strong am I for my age?",
        a: "Strength peaks between about 23 and 40, so the calculator credits lifters outside that window. A 50-year-old’s lifts are scored as if they were about 13% heavier, a 60-year-old’s about 32% heavier, and teenagers get a similar boost. So a 165 lb bench press at age 50 ranks about the same as a 185 lb bench press at 30. Strength peaks when muscle mass and recovery peak, and both decline slowly after 40 unless you keep training — a 55-year-old who still trains hard will out-lift most untrained 25-year-olds. Under 20 the adjustment is smaller, because most of the gap at that age is training experience rather than biology.",
      },
      {
        q: "What’s a good bench press for my age and weight?",
        a: "For a 180 lb man in his 20s or 30s, an average bench press is about 185 lb and a strong one — top 20% of lifters — is about 260 lb. For a 140 lb woman, average is about 95 lb and strong is about 130 lb. At 50, take roughly 12% off those numbers. The standards table lists averages for every bodyweight, and the calculator gives your exact percentile. A 150 lb man averages about 165 lb on the bench, and 230 lb puts him in the top 20%. The numbers rise with bodyweight but not proportionally: a lifter 40% heavier is typically only about 25% stronger, which is why the calculator scales for size instead of using a flat bodyweight multiple.",
      },
      {
        q: "Am I compared with everyone, or just people who lift?",
        a: "Just people who lift. The standards come from lifters who train and track their numbers, which is a much tougher crowd than the general population. If you land in Bronze here, you are still stronger than most people who never train. Measured against the general population the same lifts would rank far higher — most untrained adults cannot bench their own bodyweight at all. Treat the percentile here as the conservative number.",
      },
      {
        q: "What if I don’t know my one-rep max?",
        a: "You don’t need to test one. Enter the heaviest set you have done recently — say 185 lb for 5 reps — and the calculator estimates your max (about 215 lb in that case). Estimates are most accurate between 1 and 10 reps, and sets above 12 reps aren’t accepted. Sets of three to five reps give the closest estimate; the further past five you go, the more you are measuring endurance rather than pure strength. If you have never tested a one-rep max, don’t start now just to use this page — enter a recent hard set instead, and keep a spotter on any heavy bench press.",
      },
      {
        q: "What’s the difference between this calculator and the BodyRank app?",
        a: "The calculator measures what you lift. The BodyRank app measures how you look: take one photo and its AI scores seven physique metrics — muscle mass, symmetry, definition, body fat, V-taper, potential and an overall score — then gives you a BodyRank rank and builds a training plan around your weak points. The calculator is anonymous and needs no signup; the app needs a photo. They measure different things — you can be strong without looking it, or look lean and lift very little. Most people run the calculator first and scan when they want the other half of the picture.",
      },
      {
        q: "Do these standards assume raw lifts?",
        a: "Yes. They assume raw lifting — no bench shirts, squat suits or straps — through a full range of motion: a squat to at least parallel, a bench press touching the chest, and a deadlift locked out at the top. A belt, knee sleeves and chalk are normal and aren’t counted as equipment. If you enter half-squats or bounced bench presses, your percentile will read higher than it should.",
      },
      {
        q: "How do I improve my strength rank?",
        a: "Add weight or reps to the same lifts over time — that progression is what builds strength, not variety. Two or three sessions a week covering the bench press, squat and deadlift is enough for most people, with enough protein and sleep to recover in between. Retest after eight to twelve weeks; strength moves slowly enough that a monthly retest mostly measures noise. Climbing a full tier usually takes 30–40% more weight, so treat it as a project of months rather than weeks.",
      },
    ],
    footer_back: "← Back to BodyRank",
    footer_line: "BODYRANK · THE AI BODY SCAN",
  },
  es: {
    title: "¿Qué tan fuerte soy? — Calculadora de fuerza gratis de BodyRank",
    meta_description:
      "Test gratis “¿qué tan fuerte soy?”. Ingresa tu press de banca, sentadilla y peso muerto y descubre tu percentil de fuerza según tu edad, sexo y peso corporal — y tu nivel BodyRank.",
    eyebrow: "TEST DE FUERZA GRATIS · 60 SEGUNDOS · SIN REGISTRO",
    h1_accent: "¿Qué tan fuerte soy?",
    h1_rest: " Haz el test",
    sub: "Ingresa tu press de banca, sentadilla y peso muerto. Los comparamos con personas que entrenan de tu sexo, edad y peso corporal, y te damos tu rango de fuerza BodyRank.",
    tool_label: "Calculadora de fuerza",
    about_legend: "01 · Sobre ti",
    sex_label: "Sexo",
    sexes: { male: "Hombre", female: "Mujer" },
    unit_label: "Unidades",
    age_label: "Edad",
    bodyweight_label: "Peso corporal",
    lifts_legend: "02 · Tus mejores levantamientos",
    lifts_hint: "Puedes dejar cualquier ejercicio en blanco. ¿No probaste tu máximo? Ingresa una serie de hasta 12 repeticiones y estimamos tu 1RM.",
    lift_names: { bench: "Press de banca", squat: "Sentadilla", deadlift: "Peso muerto" },
    reps_label: "reps",
    submit: "Calcular mi rango de fuerza",
    err_age: "Ingresa una edad entre 13 y 90.",
    err_bodyweight: "Ingresa un peso corporal entre {min} y {max} {unit}.",
    err_lift: "Ingresa hasta {max} {unit} y de 1 a 12 repeticiones enteras.",
    err_lifts: "Ingresa al menos un levantamiento.",
    idle_tag: "LECTURA · ESPERANDO DATOS",
    idle_desc: "Completa tus datos y al menos un levantamiento. Aquí verás tu percentil, tu nivel y tu próxima meta.",
    result_tag: "LECTURA · RANGO DE FUERZA",
    result_pre: "Estás en el",
    result_top: "Top {n}%",
    result_summary: "En total, eres más fuerte que el {n}% de los {group} de tu edad y peso corporal.",
    groups: { male: "hombres que entrenan", female: "mujeres que entrenan" },
    lift_top: "Top {n}%",
    lift_1rm: "1RM estimado {weight}",
    lift_next: "{tier} con {weight}",
    lift_maxed: "Nivel máximo alcanzado",
    ladder_low: "NIVEL 1",
    ladder_high: "NIVEL 6 · TOP 1%",
    share: "Compartir mi resultado",
    share_copied: "Copiado — pégalo donde quieras",
    share_failed: "No se pudo compartir. Copia el enlace de la página.",
    share_text: "Estoy en el top {n}% (nivel {tier}) en el test de fuerza de BodyRank. ¿Qué tan fuerte eres tú?",
    scan_link: "La fuerza es un solo número. Descubre la puntuación de tu físico →",
    disclaimer: "Estimaciones basadas en estándares de fuerza publicados para personas que entrenan. No es una evaluación médica ni deportiva.",
    cta_tag: "¿QUIERES UN ESCÁNER CORPORAL REAL?",
    cta_title: "Tus levantamientos son un número. Tu físico son siete.",
    cta_desc: "BodyRank califica tu cuerpo real a partir de una sola foto — siete métricas puntuadas con IA — y clasifica tu físico en la misma escalera de BodyRank.",
    cta_points: [
      "Masa muscular, simetría, definición, grasa corporal, forma en V, potencial y una puntuación general",
      "Vuelve a escanearte cada 30 días y mira el cambio",
      "Un plan de entrenamiento construido alrededor de tus puntos débiles",
    ],
    cta_soon: "La app para iOS está en pruebas finales. Únete a la lista — los primeros 500 escáneos son gratis.",
    cta_app_store_pre: "Descárgala en el",
    cta_app_store: "App Store",
    standards_tag: "ESTÁNDARES DE FUERZA",
    standards_title: "¿Qué es un buen press de banca, sentadilla y peso muerto?",
    standards_desc: "1RM típicos para personas que entrenan de 23 a 40 años. Número superior: el promedio (percentil 50). Debajo: fuerte — el 20% superior.",
    table_captions: { male: "Hombres", female: "Mujeres" },
    bodyweight_col: "Peso corporal",
    standards_note: "¿Menos de 23 o más de 40 años? La calculadora ajusta por edad automáticamente.",
    faq_tag: "PREGUNTAS FRECUENTES",
    faq_title: "¿Qué tan fuerte debería ser?",
    faq_desc: "Respuestas rápidas sobre estándares de fuerza, edad y cómo funciona el test.",
    faq: [
      {
        q: "¿Cómo funciona el test “¿Qué tan fuerte soy?”?",
        a: "Ingresa tu mejor press de banca, sentadilla y peso muerto — un 1RM real, o cualquier serie de hasta 12 repeticiones, que convertimos en un máximo estimado con la fórmula de Epley. Ajustamos por edad, escalamos por peso corporal (la fuerza crece más despacio que el tamaño, así que las personas más pesadas se comparan de forma justa) y comparamos el resultado con estándares de fuerza de personas que entrenan. Tu puntuación general promedia todos los levantamientos que ingresaste y se ubica en la escalera de seis niveles de BodyRank. Puedes ingresar un solo levantamiento o los tres: el rango general promedia lo que nos des. Un percentil de 70 significa que levantarías más que 70 de cada 100 personas que entrenan de tu sexo, edad y peso corporal.",
      },
      {
        q: "¿Qué tan fuerte debería ser?",
        a: "Una buena referencia es la persona promedio que entrena — alguien con uno o dos años de entrenamiento constante. Para hombres, eso es aproximadamente su peso corporal en press de banca, 1,45× en sentadilla y 1,85× en peso muerto. Para mujeres, aproximadamente 0,7× su peso en banca, 1,1× en sentadilla y 1,35× en peso muerto. Si llegas a eso, eres más fuerte que la mitad de quienes entrenan; el 20% superior levanta alrededor de un 30–40% más. La mayoría llega al promedio en uno o dos años de entrenamiento constante, y el primer año es con diferencia el más rápido. Después, el progreso se mide en meses y no en semanas, por eso los percentiles se mueven despacio una vez que pasas la mitad de la tabla.",
      },
      {
        q: "¿Qué tan fuerte soy para mi edad?",
        a: "La fuerza alcanza su punto máximo entre los 23 y los 40 años, así que la calculadora da crédito a quienes están fuera de ese rango. Los levantamientos de alguien de 50 años se puntúan como si fueran un 13% más pesados, los de alguien de 60 un 32% más, y los adolescentes reciben un ajuste similar. Así, un press de banca de 75 kg a los 50 años equivale aproximadamente a uno de 85 kg a los 30. La fuerza llega a su máximo cuando la masa muscular y la recuperación están en su mejor momento, y ambas bajan lentamente a partir de los 40 si dejas de entrenar: alguien de 55 años que entrena en serio levanta más que la mayoría de los jóvenes de 25 que no entrenan. Antes de los 20 el ajuste es menor, porque a esa edad la diferencia es sobre todo experiencia de entrenamiento y no biología.",
      },
      {
        q: "¿Qué es un buen press de banca para mi edad y peso?",
        a: "Para un hombre de 82 kg de entre 20 y 40 años, un press de banca promedio ronda los 85 kg y uno fuerte — el 20% superior — unos 118 kg. Para una mujer de 64 kg, el promedio ronda los 44 kg y uno fuerte unos 60 kg. A los 50 años, resta aproximadamente un 12% a esas cifras. La tabla de estándares muestra el promedio para cada peso corporal y la calculadora te da tu percentil exacto. Un hombre de 67,5 kg promedia unos 75 kg en banca, y con 102,5 kg entra en el 20% superior. Los números suben con el peso corporal, pero no de forma proporcional: alguien un 40% más pesado suele ser solo un 25% más fuerte, por eso la calculadora ajusta por tamaño en vez de usar un múltiplo fijo del peso.",
      },
      {
        q: "¿Me comparan con todo el mundo o solo con quienes entrenan?",
        a: "Solo con quienes entrenan. Los estándares vienen de personas que entrenan y registran sus números, un grupo mucho más exigente que la población general. Si quedas en Bronze aquí, igual eres más fuerte que la mayoría de las personas que no entrenan. Frente a la población general los mismos levantamientos quedarían mucho más arriba: la mayoría de los adultos que no entrenan no puede levantar su propio peso corporal en banca. Toma tu percentil aquí como el número conservador.",
      },
      {
        q: "¿Y si no conozco mi 1RM?",
        a: "No necesitas probarlo. Ingresa la serie más pesada que hayas hecho últimamente — por ejemplo, 85 kg por 5 repeticiones — y la calculadora estima tu máximo (unos 99 kg en ese caso). Las estimaciones son más precisas entre 1 y 10 repeticiones, y no se aceptan series de más de 12. Las series de tres a cinco repeticiones dan la estimación más cercana; cuanto más te alejas de cinco, más estás midiendo resistencia que fuerza pura. Si nunca has probado un máximo, no empieces ahora solo para usar esta página: ingresa una serie exigente reciente y ten siempre a alguien que te cuide en el press de banca pesado.",
      },
      {
        q: "¿Cuál es la diferencia entre esta calculadora y la app de BodyRank?",
        a: "La calculadora mide lo que levantas. La app de BodyRank mide cómo te ves: tomas una foto y su IA puntúa siete métricas de tu físico — masa muscular, simetría, definición, grasa corporal, forma en V, potencial y una puntuación general —, te da tu rango BodyRank y arma un plan de entrenamiento alrededor de tus puntos débiles. La calculadora es anónima y no pide registro; la app necesita una foto. Miden cosas distintas: puedes ser fuerte sin aparentarlo, o verte definido y levantar poco. La mayoría empieza por la calculadora y se escanea cuando quiere la otra mitad del panorama.",
      },
      {
        q: "¿Estos estándares son para levantamientos raw?",
        a: "Sí. Asumen levantamiento raw —sin camiseta de banca, traje de sentadilla ni straps— y con rango completo de movimiento: sentadilla al menos hasta la paralela, press de banca tocando el pecho y peso muerto bloqueado arriba. El cinturón, las rodilleras y el magnesio son normales y no cuentan como equipamiento. Si ingresas medias sentadillas o rebotes en banca, tu percentil saldrá más alto de lo que debería.",
      },
      {
        q: "¿Cómo subo de nivel?",
        a: "Añade peso o repeticiones a los mismos levantamientos con el tiempo: esa progresión es lo que construye fuerza, no la variedad. Para la mayoría bastan dos o tres sesiones por semana que cubran press de banca, sentadilla y peso muerto, con suficiente proteína y descanso entre ellas. Vuelve a medirte a las ocho o doce semanas; la fuerza cambia tan despacio que medir cada mes es sobre todo ruido. Subir un nivel completo suele exigir entre un 30% y un 40% más de peso, así que cuenta con meses y no con semanas.",
      },
    ],
    footer_back: "← Volver a BodyRank",
    footer_line: "BODYRANK · EL ESCÁNER CORPORAL CON IA",
  },
};
