import {CyclicInterval} from '../components/taskFormInputs/CyclicTaskInputs';
import {
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '../constants/TimeValues';

export function convertCyclicIntervalToSeconds(
  cyclicInterval: CyclicInterval,
): number {
  const days = cyclicInterval?.days ? cyclicInterval.days : 0;
  const hours = cyclicInterval?.hours ? cyclicInterval.hours : 0;
  const minutes = cyclicInterval?.minutes ? cyclicInterval.minutes : 0;

  const seconds =
    days * SECONDS_IN_DAY +
    hours * SECONDS_IN_HOUR +
    minutes * SECONDS_IN_MINUTE;
  return seconds;
}

export function checkIfCyclicInterval(
  value: CyclicInterval | undefined,
): boolean | undefined {
  return value && (value.days > 0 || value.hours > 0 || value.minutes > 0);
}
