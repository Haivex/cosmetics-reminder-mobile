import i18n from 'i18n-js';
import enUS from './languages/enUS';
import en, {AppTranslation} from './languages/en';
import pl from './languages/pl';
import {DeepKeys, DeepKeysLighweight, GetDictValue} from '../types';

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

//IntelliSense show current keys
export const translate = <P extends string>(
  p: DeepKeysLighweight<AppTranslation, P>,
): GetDictValue<string, AppTranslation> => {
  return i18n.translate(p) as unknown as GetDictValue<string, AppTranslation>;
};

//IntelliSense show all object keys(with nested keys)
export const translateHeavy = <P extends DeepKeys<AppTranslation>>(p: P) => {
  return i18n.translate(p) as unknown as GetDictValue<string, AppTranslation>;
};

export default initTranslation;
