// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import textEnglish from './text-english.json';
import textSpanish from './text-spanish.json';

// the translations
const resources = {
    en: {
        translation: textEnglish
    },
    es: {
        translation: textSpanish
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "es", // language to use, can be changed dynamically
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;