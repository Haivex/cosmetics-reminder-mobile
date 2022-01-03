import i18n from 'i18n-js';
import enUS from './languages/enUS';
import en, {AppTranslation} from './languages/en';
import pl from './languages/pl';
import {DeepKeys, DeepKeysLighweight, GetDictValue} from '../types';
import Logger from '../shared/Logger';

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
  Logger.info('App is translating in ', i18n.currentLocale());
};

//IntelliSense show current keys
export const translate = <P extends string>(
  scope: DeepKeysLighweight<AppTranslation, P>,
): GetDictValue<P, AppTranslation> => {
  return i18n.translate(scope) as unknown as GetDictValue<P, AppTranslation>;
};

//IntelliSense show all object keys(with nested keys)
export const translateHeavy = <P extends DeepKeys<AppTranslation>>(scope: P) => {
  return i18n.translate(scope) as unknown as GetDictValue<P, AppTranslation>;
};

export default initTranslation;
