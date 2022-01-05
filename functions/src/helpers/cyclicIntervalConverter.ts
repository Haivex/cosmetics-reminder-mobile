/* eslint-disable require-jsdoc */
export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MINUTE = 60;

export type CyclicInterval = {
  days: number;
  hours: number;
  minutes: number;
};

export function convertCyclicIntervalToSeconds(
  cyclicInterval: CyclicInterval
): number {
  const days = cyclicInterval?.days ? cyclicInterval.days : 0;
  const hours = cyclicInterval?.hours ? cyclicInterval.hours : 0;
  const minutes = cyclicInterval?.minutes ? cyclicInterval.minutes : 0;

  return (
    days * SECONDS_IN_DAY +
    hours * SECONDS_IN_HOUR +
    minutes * SECONDS_IN_MINUTE
  );
}
