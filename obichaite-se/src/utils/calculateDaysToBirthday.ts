import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

/**
 * Връща броя дни до следващото срещане на даден ден/месец,
 * игнорирайки годината във входния стринг.
 *
 * @param targetDateStr - формат "DD.MM.YYYY" (годината се игнорира)
 * @param todayOverride - по желание: дата, спрямо която да смятаме (по default = днес)
 */
export const daysUntilNextOccurrence = (targetDateStr: string): number => {
  const today = dayjs()

  const parsed = dayjs(targetDateStr, 'YYYY-MM-DD', true)

  const targetMonth = parsed.month()
  const targetDay = parsed.date()

  let candidate = today.set('month', targetMonth).set('date', targetDay)

  if (candidate.isBefore(today, 'day')) {
    candidate = candidate.add(1, 'year')
  }

  return candidate.diff(today, 'day')
}
