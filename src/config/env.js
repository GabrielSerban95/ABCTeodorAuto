// Application configuration.
// Sensitive runtime values should remain in .env and .env.example only when needed.
const SITE_CONFIG = {
  APP_NAME: 'Școala Auto ABC Teodor',
  APP_TAGLINE: 'Școala ta de șoferi de încredere - Permisul tău de conducere începe aici!',
  HERO_TITLE: 'Bun venit la Școala Auto ABC Teodor!',
  HERO_SUBTITLE: 'Oferim o experiență de învățare distractivă, sigură și profesionistă pentru obținerea permisului de conducere.',

  CONTACT: {
    PHONE: '0722 123 456',
    PHONE_RAW: '0722123456',
    EMAIL: 'contact@abcteodor.ro',
    ADDRESS: 'Str. Doctor Toma Ionescu 25, Ploiești, Prahova',
    MAPS_URL: 'https://www.google.com/maps/place/Strada+Doctor+Toma+Ionescu+25/@44.9430037,26.0377205,18z',
  },

  SOCIAL: {
    FACEBOOK: 'https://facebook.com/abcteodor',
    INSTAGRAM: 'https://instagram.com/abcteodor',
    WHATSAPP: 'https://wa.me/40722123456',
  },

  WORKING_HOURS: 'Luni - Vineri: 08:00 - 20:00 | Sâmbătă: 09:00 - 14:00',

  PRICES: {
    CAT_B: '2200',
    CAT_C: '2800',
    CAT_CE: '1800',
    BUNDLE_C_CE: '4200',
    EXTRA_LESSON: '150',
    INSTRUCTOR_COURSE: '3500',
  },

  CHATBOT: {
    NAME: 'Asistent Virtual ABC Teodor',
    WELCOME_MSG: 'Salutare! 🚗 Sunt asistentul virtual ABC Teodor. Cu ce te pot ajuta astăzi? Îmi poți pune întrebări despre prețuri, acte necesare sau programări ore de conducere!',
  },

  PORTAL: {
    INSTRUCTOR_TITLE: 'Portal Cadre Didactice & Instructori ABC Teodor',
  },

  ENROLLMENT: {
    // Coduri valide de înscriere elevi emise de profesori / secretariat
    AUTHORIZED_CODES: [
      'ABC2026',
      'TEODOR2026',
      'ABC-AUTO',
      'POP-101',
      'ION-102',
      'DUM-103',
      'STA-104',
      'ELEV-ABC',
    ],
    HELP_PHONE: '0722 123 456',
  },
};

const getEnv = (...keys) => {
  for (const k of keys) {
    const val = import.meta.env[k];
    if (typeof val === 'string' && val.trim().length > 0) {
      return val.trim();
    }
  }
  return '';
};

const FIREBASE_CONFIG = {
  API_KEY: getEnv('VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_APIKEY', 'VITE_API_KEY'),
  AUTH_DOMAIN: getEnv('VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_AUTHDOMAIN', 'VITE_AUTH_DOMAIN'),
  PROJECT_ID: getEnv('VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_PROJECTID', 'VITE_PROJECT_ID'),
  STORAGE_BUCKET: getEnv('VITE_FIREBASE_STORAGE_BUCKET', 'VITE_FIREBASE_STORAGEBUCKET', 'VITE_STORAGE_BUCKET'),
  MESSAGING_SENDER_ID: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', 'VITE_FIREBASE_MESSAGINGSENDERID', 'VITE_MESSAGING_SENDER_ID'),
  APP_ID: getEnv('VITE_FIREBASE_APP_ID', 'VITE_FIREBASE_APPID', 'VITE_APP_ID'),
  MEASUREMENT_ID: getEnv('VITE_FIREBASE_MEASUREMENT_ID', 'VITE_FIREBASE_MEASUREMENTID', 'VITE_MEASUREMENT_ID'),
};

export const ENV = {
  ...SITE_CONFIG,
  ...SITE_CONFIG.CONTACT,
  ...SITE_CONFIG.SOCIAL,
  ...SITE_CONFIG.PORTAL,
  INSTRUCTOR_PORTAL_TITLE: SITE_CONFIG.PORTAL.INSTRUCTOR_TITLE,
  FIREBASE: FIREBASE_CONFIG,
};
