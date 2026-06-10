const WARSAW_TIME_ZONE = 'Europe/Warsaw'

function pad(value) {
  return String(value).padStart(2, '0')
}

export function getWarsawDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: WARSAW_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value]),
  )

  return `${values.year}-${values.month}-${values.day}`
}

export function addDaysToDateKey(dateKey, days) {
  const [year, month, day] = dateKey.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + days))

  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
  ].join('-')
}

export function buildDateKey(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`
}

export function monthKey(year, monthIndex) {
  return `${year}-${pad(monthIndex + 1)}`
}

export function dateKeyParts(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return { year, monthIndex: month - 1, day }
}
