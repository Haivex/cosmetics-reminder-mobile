import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './languages/en.json';
import pl from './languages/pl.json';

const initTranslation = ():void => {
  i18n.translations = {
    en,
    pl,
  }
  i18n.locale = Localization.locale;
  i18n.fallbacks = true;
}
export default initTranslation;
