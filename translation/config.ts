import i18n from 'i18n-js';
import enUS from './languages/en-US.json';
import en from './languages/en.json';
import pl from './languages/pl.json';

const initTranslation = (): void => {
  i18n.translations = {
    'en-US': enUS,
    en,
    pl,
  };
  i18n.defaultLocale = 'en';
  i18n.locale = 'en';
  i18n.fallbacks = true;
  i18n.missingBehaviour = 'guess';
};
export default initTranslation;
