// Auto-derived from the original single-file waitlist page. Source of truth for all copy.

export type Lang = "en" | "es";

export interface Shot { key: string; cap: string }
export interface LoopStep { num: string; title: string; desc: string }

export interface Strings {
  htmllang: string;
  title: string;
  eyebrow: string;
  headline_pre: string;
  headline_accent: string;
  headline_post: string;
  sub: string;
  placeholder: string;
  cta: string;
  note: string;
  count_zero: string;
  count_n: string;
  success: string;
  error_invalid: string;
  error_dupe: string;
  offline_note: string;
  gal_tag: string;
  gal_title: string;
  gal_desc: string;
  shots: Shot[];
  loop_tag: string;
  loop_title: string;
  loop_desc: string;
  loop_steps: LoopStep[];
  ladder_tag: string;
  ladder_title: string;
  ladder_desc: string;
  you_label: string;
  you_value: string;
  metrics_tag: string;
  metrics_title: string;
  metrics_desc: string;
  footer_title: string;
  footer_desc: string;
  footer_note: string;
  footer_links: string;
}

export const STRINGS: Record<Lang, Strings> = {
  "en": {
    "htmllang": "en",
    "title": "BodyRank — Scan. Rank. Transform.",
    "eyebrow": "IN DEVELOPMENT — EARLY ACCESS OPEN",
    "headline_pre": "SCAN. ",
    "headline_accent": "RANK.",
    "headline_post": " TRANSFORM.",
    "sub": "The AI body scan that rates your physique across 7 metrics, ranks you Iron to Symmetric, and builds your training plan around what it finds.",
    "placeholder": "you@email.com",
    "cta": "Get Early Access",
    "note": "First 500 scans are free when we launch. One email, no spam, unsubscribe anytime.",
    "count_zero": "Be the first on the list",
    "count_n": "{n} already on the list",
    "success": "You’re on the list — we’ll email you the moment BodyRank goes live.",
    "error_invalid": "That doesn’t look like an email address.",
    "error_dupe": "That email is already on the list.",
    "offline_note": "(Preview mode — signups save once this page is published.)",
    "gal_tag": "SNEAK PEEK",
    "gal_title": "A first look inside",
    "gal_desc": "Screens from the app currently in development.",
    "shots": [
      {
        "key": "welcome",
        "cap": "Welcome"
      },
      {
        "key": "rankintro",
        "cap": "Rank ladder"
      },
      {
        "key": "ranktab",
        "cap": "Your rank"
      },
      {
        "key": "muscle",
        "cap": "Muscle volume"
      },
      {
        "key": "future",
        "cap": "12-week projection"
      }
    ],
    "loop_tag": "THE CORE LOOP",
    "loop_title": "Scan. Rank. Train. Repeat.",
    "loop_desc": "Every 30 days, BodyRank re-scans you and shows the change — that’s the whole game.",
    "loop_steps": [
      {
        "num": "01",
        "title": "SCAN",
        "desc": "Photo in, AI scores 7 physique metrics — muscle mass, symmetry, definition, body fat and more."
      },
      {
        "num": "02",
        "title": "RANK",
        "desc": "Get placed on a real ladder, Iron to Symmetric, against people who scanned like you did."
      },
      {
        "num": "03",
        "title": "TRAIN",
        "desc": "An AI plan built for your body, your equipment and your schedule — it adapts as your scan changes."
      }
    ],
    "ladder_tag": "THE LADDER",
    "ladder_title": "Iron to Symmetric",
    "ladder_desc": "Six tiers. Your first scan places you — no guessing.",
    "you_label": "YOUR RANK",
    "you_value": "???",
    "metrics_tag": "THE SCAN",
    "metrics_title": "7 metrics, one photo",
    "metrics_desc": "Every scan scores these. Yours are waiting.",
    "footer_title": "BE FIRST TO SCAN",
    "footer_desc": "BodyRank is in active development. Join the waitlist and we’ll email you the day it opens.",
    "footer_note": "No fake numbers here — the counter above only moves when a real person joins.",
    "footer_links": "BODYRANK · BUILT FOR EN + ES"
  },
  "es": {
    "htmllang": "es",
    "title": "BodyRank — Escanea. Clasifica. Transfórmate.",
    "eyebrow": "EN DESARROLLO — ACCESO ANTICIPADO ABIERTO",
    "headline_pre": "ESCANEA. ",
    "headline_accent": "CLASIFICA.",
    "headline_post": " TRANSFÓRMATE.",
    "sub": "El escáner corporal con IA que califica tu físico en 7 métricas, te ubica de Iron a Symmetric y arma tu plan de entrenamiento con lo que encuentra.",
    "placeholder": "tu@correo.com",
    "cta": "Consigue acceso anticipado",
    "note": "Los primeros 500 escáneos serán gratis al lanzar. Un solo correo, sin spam, cancela cuando quieras.",
    "count_zero": "Sé el primero en la lista",
    "count_n": "{n} ya están en la lista",
    "success": "Ya estás en la lista — te avisamos por correo en cuanto BodyRank esté disponible.",
    "error_invalid": "Ese correo no parece válido.",
    "error_dupe": "Ese correo ya está en la lista.",
    "offline_note": "(Vista previa — los registros se guardan al publicar esta página.)",
    "gal_tag": "ADELANTO",
    "gal_title": "Un primer vistazo",
    "gal_desc": "Pantallas de la app actualmente en desarrollo.",
    "shots": [
      {
        "key": "welcome",
        "cap": "Bienvenida"
      },
      {
        "key": "rankintro",
        "cap": "Escalera de rangos"
      },
      {
        "key": "ranktab",
        "cap": "Tu rango"
      },
      {
        "key": "muscle",
        "cap": "Volumen muscular"
      },
      {
        "key": "future",
        "cap": "Proyección a 12 semanas"
      }
    ],
    "loop_tag": "EL CICLO CENTRAL",
    "loop_title": "Escanea. Clasifica. Entrena. Repite.",
    "loop_desc": "Cada 30 días, BodyRank te vuelve a escanear y muestra el cambio — ese es todo el juego.",
    "loop_steps": [
      {
        "num": "01",
        "title": "ESCANEA",
        "desc": "Sube una foto y la IA califica 7 métricas de tu físico: masa muscular, simetría, definición, grasa corporal y más."
      },
      {
        "num": "02",
        "title": "CLASIFICA",
        "desc": "Te ubicamos en una escalera real, de Iron a Symmetric, junto a personas que se escanearon como tú."
      },
      {
        "num": "03",
        "title": "ENTRENA",
        "desc": "Un plan con IA hecho para tu cuerpo, tu equipo y tu horario — se adapta cuando cambia tu escáner."
      }
    ],
    "ladder_tag": "LA ESCALERA",
    "ladder_title": "De Iron a Symmetric",
    "ladder_desc": "Seis niveles. Tu primer escáner te ubica — sin adivinar.",
    "you_label": "TU RANGO",
    "you_value": "???",
    "metrics_tag": "EL ESCÁNER",
    "metrics_title": "7 métricas, una foto",
    "metrics_desc": "Cada escáner califica esto. Las tuyas están esperando.",
    "footer_title": "SÉ EL PRIMERO EN ESCANEARTE",
    "footer_desc": "BodyRank está en desarrollo activo. Únete a la lista y te avisamos el día que abra.",
    "footer_note": "Nada de números falsos aquí — el contador de arriba solo avanza cuando alguien real se une.",
    "footer_links": "BODYRANK · HECHO PARA EN + ES"
  }
};
