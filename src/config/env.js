// Configuration helper reading directly from .env with fallback values
export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Școala Auto ABC Teodor",
  APP_TAGLINE: import.meta.env.VITE_APP_TAGLINE || "Școala ta de șoferi de încredere - Permisul tău de conducere începe aici!",
  HERO_TITLE: import.meta.env.VITE_APP_HERO_TITLE || "Bun venit la Școala Auto ABC Teodor!",
  HERO_SUBTITLE: import.meta.env.VITE_APP_HERO_SUBTITLE || "Oferim o experiență de învățare distractivă, sigură și profesionistă pentru obținerea permisului de conducere.",
  
  // Contact
  PHONE: import.meta.env.VITE_CONTACT_PHONE || "0722 123 456",
  PHONE_RAW: import.meta.env.VITE_CONTACT_PHONE_RAW || "0722123456",
  EMAIL: import.meta.env.VITE_CONTACT_EMAIL || "contact@abcteodor.ro",
  ADDRESS: import.meta.env.VITE_CONTACT_ADDRESS || "Str. Doctor Toma Ionescu 25, Ploiești",
  MAPS_URL: import.meta.env.VITE_MAPS_URL || "https://maps.google.com",
  
  // Social
  FACEBOOK: import.meta.env.VITE_SOCIAL_FACEBOOK || "https://facebook.com",
  INSTAGRAM: import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com",
  WHATSAPP: import.meta.env.VITE_SOCIAL_WHATSAPP || "https://wa.me/40722123456",
  
  // Program
  WORKING_HOURS: import.meta.env.VITE_WORKING_HOURS || "Luni - Vineri: 08:00 - 20:00 | Sâmbătă: 09:00 - 14:00",
  
  // Prices (RON)
  PRICES: {
    CAT_B: import.meta.env.VITE_PRICE_CAT_B || "2200",
    CAT_C: import.meta.env.VITE_PRICE_CAT_C || "2800",
    CAT_CE: import.meta.env.VITE_PRICE_CAT_CE || "1800",
    BUNDLE_C_CE: import.meta.env.VITE_PRICE_CAT_C_CE_BUNDLE || "4200",
    EXTRA_LESSON: import.meta.env.VITE_PRICE_EXTRA_LESSON || "150",
    INSTRUCTOR_COURSE: import.meta.env.VITE_PRICE_INSTRUCTOR_COURSE || "3500",
  },

  // Chatbot
  CHAT_BOT_NAME: import.meta.env.VITE_CHAT_BOT_NAME || "Asistent Virtual ABC Teodor",
  CHAT_WELCOME_MSG: import.meta.env.VITE_CHAT_WELCOME_MSG || "Salutare! 🚗 Cu ce te pot ajuta astăzi?",
  
  // Instructor Portal
  INSTRUCTOR_PORTAL_TITLE: import.meta.env.VITE_INSTRUCTOR_PORTAL_TITLE || "Portal Cadre Didactice & Instructori"
};
