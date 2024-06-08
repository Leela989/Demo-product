import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
 
//   .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Azentio",
          login: "Login",
          forgotPassword: "Forgot Password",
          requestPassword: "Request Password",
          rememberMe: "Remember me",
          username: "Username",
          password: "Password",
          yourEmailId: "Your Email ID"
        }
      },
      fr: {
          translation: {
              welcome: "Bienvenue en Azentio",
              login: "se connecter",
              forgotPassword: "Mot de passe oublié",
              requestPassword: "Demander un mot de passe",
              rememberMe: "Souviens-toi de moi",
              username: "nom d'utilisateur",
              password: "mot de passe",
              yourEmailId: "votre identifiant de messagerie"
          }
      }
    }
  });

export default i18n;