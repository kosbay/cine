import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import russian from 'locales/russian.json';
import qazaq from 'locales/qazaq.json';
import english from 'locales/english.json';

const resources = {
  en: {
    translation: english,
  },
  kz: {
    translation: qazaq,
  },
  ru: {
    translation: russian,
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
