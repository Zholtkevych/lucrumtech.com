import type { Locale } from './config';

// Chrome strings that live outside page content: nav, footer, contact form.
// Register: informal "tú" in Spanish, formal "Sie"/"vous" in German and French,
// matching how the previous site addressed each audience.
export const UI: Record<Locale, {
  nav: { home: string; services: string; ai: string; work: string; about: string; contact: string; interim: string };
  menu: string;
  language: string;
  footer: { copyright: string; tagline: string };
  form: {
    name: string; email: string; message: string;
    namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string;
    submit: string; missing: string; failed: string; ok: string;
  };
}> = {
  en: {
    nav: { home: 'Home', services: 'Services', ai: 'AI', work: 'Work', about: 'About', contact: 'Contact', interim: 'Interim' },
    menu: 'Menu',
    language: 'Language',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Product ownership. From idea to revenue.' },
    form: {
      name: 'Name', email: 'Email', message: 'Message',
      namePlaceholder: 'Your name', emailPlaceholder: 'you@company.com',
      messagePlaceholder: "What are you building, or what's broken?",
      submit: 'Book a strategy call',
      missing: 'Add your name, email and a message.',
      failed: 'Something went wrong sending that — try again, or email us directly.',
      ok: "Thanks — we'll reply within 24 hours.",
    },
  },
  es: {
    nav: { home: 'Inicio', services: 'Servicios', ai: 'IA', work: 'Proyectos', about: 'Acerca de', contact: 'Contacto', interim: 'Interim' },
    menu: 'Menú',
    language: 'Idioma',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Propiedad del producto. De la idea a los ingresos.' },
    form: {
      name: 'Nombre', email: 'Correo electrónico', message: 'Mensaje',
      namePlaceholder: 'Tu nombre', emailPlaceholder: 'tu@empresa.com',
      messagePlaceholder: '¿Qué estás construyendo o qué está fallando?',
      submit: 'Reserva una llamada estratégica',
      missing: 'Añade tu nombre, correo electrónico y un mensaje.',
      failed: 'Algo falló al enviar — inténtalo de nuevo o escríbenos directamente.',
      ok: 'Gracias — responderemos en menos de 24 horas.',
    },
  },
  de: {
    nav: { home: 'Start', services: 'Leistungen', ai: 'KI', work: 'Referenzen', about: 'Über uns', contact: 'Kontakt', interim: 'Interim' },
    menu: 'Menü',
    language: 'Sprache',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Product Ownership. Von der Idee zum Umsatz.' },
    form: {
      name: 'Name', email: 'E-Mail', message: 'Nachricht',
      namePlaceholder: 'Ihr Name', emailPlaceholder: 'sie@unternehmen.com',
      messagePlaceholder: 'Was bauen Sie – oder was ist kaputt?',
      submit: 'Strategiegespräch buchen',
      missing: 'Bitte Name, E-Mail und Nachricht angeben.',
      failed: 'Beim Senden ist etwas schiefgelaufen – bitte erneut versuchen oder schreiben Sie uns direkt.',
      ok: 'Danke – wir antworten innerhalb von 24 Stunden.',
    },
  },
  fr: {
    nav: { home: 'Accueil', services: 'Services', ai: 'IA', work: 'Réalisations', about: 'À propos', contact: 'Contact', interim: 'Transition' },
    menu: 'Menu',
    language: 'Langue',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'La propriété du produit. De l’idée au chiffre d’affaires.' },
    form: {
      name: 'Nom', email: 'E-mail', message: 'Message',
      namePlaceholder: 'Votre nom', emailPlaceholder: 'vous@entreprise.com',
      messagePlaceholder: 'Que construisez-vous, ou qu’est-ce qui ne va pas ?',
      submit: 'Réserver un appel stratégique',
      missing: 'Indiquez votre nom, votre e-mail et un message.',
      failed: 'L’envoi a échoué — réessayez ou écrivez-nous directement.',
      ok: 'Merci — nous répondons sous 24 heures.',
    },
  },
};
