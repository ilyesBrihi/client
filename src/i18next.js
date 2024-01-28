import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "fr",
    detection : {
        order: ['cookie','htmlTag', 'localStorage', 'sessionStorage','path', 'subdomain'],
        caches : ['cookie']
    },
    interpolation: {
      escapeValue: false,
    },
    backend : {
        loadPath: '/locale/{{lng}}/translation.json',
    },
    react : {
        useSuspense : false,
    }
  });