import { add, isBefore } from 'date-fns';

export function dateIsExpired(
  date: Date,
  duration: number,
  unit: 'days' | 'months' | 'years' | 'hours',
): boolean {
  const currentDate = new Date();
  const providedDate = new Date(date);
  const expirationDate = add(providedDate, { [unit]: duration });
  return isBefore(expirationDate, currentDate);
}
