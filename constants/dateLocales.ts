import {enGB, enIN, enUS, pl} from 'date-fns/locale';

export const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['pl-PL', pl],
  ['en', enGB],
  ['en-US', enUS],
  ['en-GB', enGB],
  ['en-IN', enIN],
]);
