import {enGB, enIN, enUS, pl} from 'date-fns/locale';

export const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['pl_PL', pl],
  ['en', enGB],
  ['en_US', enUS],
  ['en_GB', enGB],
  ['en_IN', enIN],
]);
