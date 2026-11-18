import type { Locale } from './config';

// Chrome strings that live outside page content: nav, footer, contact form.
// Register: informal "tú" in Spanish, formal "Sie"/"vous" in German and French,
// matching how the previous site addressed each audience.
export const UI: Record<Locale, {
  nav: { home: string; product: string; interim: string; security: string; work: string; about: string; contact: string };
  menu: string;
  language: string;
  footer: { copyright: string; tagline: string; contactLabel: string; privacy: string };
  form: {
    name: string; email: string; message: string;
    namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string;
    submit: string; missing: string; failed: string; ok: string;
  };
}> = {
  en: {
    nav: { home: 'Home', product: 'Product', interim: 'Interim', security: 'Security', work: 'Work', about: 'About', contact: 'Contact' },
    menu: 'Menu',
    language: 'Language',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Product ownership. From idea to revenue.', contactLabel: 'Reply within 24 hours', privacy: 'Privacy' },
    form: {
      name: 'Name', email: 'Email', message: 'Message',
      namePlaceholder: 'Your name', emailPlaceholder: 'you@company.com',
      messagePlaceholder: "What are you building, or what's broken?",
      submit: 'Send message',
      missing: 'Add your name, email and a message.',
      failed: 'Something went wrong sending that — try again, or email us directly.',
      ok: "Thanks — we'll reply within 24 hours.",
    },
  },
  es: {
    nav: { home: 'Inicio', product: 'Producto', interim: 'Interim', security: 'Seguridad', work: 'Proyectos', about: 'Acerca de', contact: 'Contacto' },
    menu: 'Menú',
    language: 'Idioma',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Propiedad del producto. De la idea a los ingresos.', contactLabel: 'Respuesta en menos de 24 horas', privacy: 'Privacidad' },
    form: {
      name: 'Nombre', email: 'Correo electrónico', message: 'Mensaje',
      namePlaceholder: 'Tu nombre', emailPlaceholder: 'tu@empresa.com',
      messagePlaceholder: '¿Qué estás construyendo o qué está fallando?',
      submit: 'Enviar mensaje',
      missing: 'Añade tu nombre, correo electrónico y un mensaje.',
      failed: 'Algo falló al enviar — inténtalo de nuevo o escríbenos directamente.',
      ok: 'Gracias — responderemos en menos de 24 horas.',
    },
  },
  de: {
    nav: { home: 'Start', product: 'Produkt', interim: 'Interim', security: 'Sicherheit', work: 'Referenzen', about: 'Über uns', contact: 'Kontakt' },
    menu: 'Menü',
    language: 'Sprache',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'Product Ownership. Von der Idee zum Umsatz.', contactLabel: 'Antwort innerhalb von 24 Stunden', privacy: 'Datenschutz' },
    form: {
      name: 'Name', email: 'E-Mail', message: 'Nachricht',
      namePlaceholder: 'Ihr Name', emailPlaceholder: 'sie@unternehmen.com',
      messagePlaceholder: 'Was bauen Sie – oder was ist kaputt?',
      submit: 'Nachricht senden',
      missing: 'Bitte Name, E-Mail und Nachricht angeben.',
      failed: 'Beim Senden ist etwas schiefgelaufen – bitte erneut versuchen oder schreiben Sie uns direkt.',
      ok: 'Danke – wir antworten innerhalb von 24 Stunden.',
    },
  },
  fr: {
    nav: { home: 'Accueil', product: 'Produit', interim: 'Transition', security: 'Sécurité', work: 'Réalisations', about: 'À propos', contact: 'Contact' },
    menu: 'Menu',
    language: 'Langue',
    footer: { copyright: '© 2026 LucrumTech', tagline: 'La propriété du produit. De l’idée au chiffre d’affaires.', contactLabel: 'Réponse sous 24 heures', privacy: 'Confidentialité' },
    form: {
      name: 'Nom', email: 'E-mail', message: 'Message',
      namePlaceholder: 'Votre nom', emailPlaceholder: 'vous@entreprise.com',
      messagePlaceholder: 'Que construisez-vous, ou qu’est-ce qui ne va pas ?',
      submit: 'Envoyer le message',
      missing: 'Indiquez votre nom, votre e-mail et un message.',
      failed: 'L’envoi a échoué — réessayez ou écrivez-nous directement.',
      ok: 'Merci — nous répondons sous 24 heures.',
    },
  },
};
