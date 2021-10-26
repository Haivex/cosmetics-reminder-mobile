import {enGB, enIN, enUS, pl} from 'date-fns/locale';

export const localesMap = new Map<string, Locale>([
  ['pl', pl],
  ['en-US', enUS],
  ['en-GB', enGB],
  ['en-IN', enIN],
]);
