import {I18n} from 'i18n-js';
import {I18nManager} from 'react-native';
import languageMap from '../constants/languageMap';
import {Language} from '../redux/LanguageReducer';
import Logger from '../shared/Logger';
import {DeepKeys, DeepKeysLighweight, GetDictValue} from '../types';
import en, {AppTranslation} from './languages/en';
import enUS from './languages/enUS';
import pl from './languages/pl';

export const translations = {
  'en-US': enUS,
  en,
  pl,
  'pl-PL': pl,
};

export const i18n = new I18n(translations);

export const changeLanguage = (language: Language['currentLanguage']): void => {
  const currentLanguageAbbreviation = languageMap.get(language);

  if (currentLanguageAbbreviation === 'auto') {
    i18n.locale =
      I18nManager.getConstants().localeIdentifier?.replace('_', '-') || 'en';
    return;
  }

  i18n.locale = currentLanguageAbbreviation || 'en';
};

const initTranslation = (): void => {
  i18n.defaultLocale = 'en';
  i18n.enableFallback = true;
  i18n.missingBehavior = 'guess';
  i18n.onChange(() => {
    Logger.info('App is translating in ', i18n.locale);
  });
};

//IntelliSense show current keys
export const translate = <P extends string>(
  scope: DeepKeysLighweight<AppTranslation, P>,
): GetDictValue<P, AppTranslation> => {
  return i18n.translate(scope) as unknown as GetDictValue<P, AppTranslation>;
};

//IntelliSense show all object keys(with nested keys)
export const translateHeavy = <P extends DeepKeys<AppTranslation>>(
  scope: P,
) => {
  return i18n.translate(scope) as unknown as GetDictValue<P, AppTranslation>;
};

export default initTranslation;
