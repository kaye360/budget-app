import type { Bill } from "./bill.schema"


export const normalizeDate = (d: Date) => {
  const n = new Date(d)
  n.setHours(0, 0, 0, 0)
  return n
}

export const getDateRange = (numDays?: number) => {
  const start = normalizeDate(new Date())

  let end: Date

  if (typeof numDays === 'number') {
    end = new Date(start)
    end.setDate(end.getDate() + numDays - 1)
    end.setHours(23, 59, 59, 999)
  } else {
    end = new Date(start)
    end.setMonth(end.getMonth() + 2, 0) // end of next month
    end.setHours(23, 59, 59, 999)
  }

  const days: Date[] = []

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d))
  }

  return days
}

export const parseLocalDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const occursOnDate = (bill: Bill, day: Date) => {
  const target = normalizeDate(day)
  const billDate = normalizeDate(parseLocalDate(bill.date))

  switch (bill.repeats) {
    case 'monthly':
      return target.getDate() === billDate.getDate()

    case 'weekly':
      return target.getDay() === billDate.getDay()

    case 'biweekly': {
      const diffDays =
        (target.getTime() - billDate.getTime()) / (1000 * 60 * 60 * 24)
      return diffDays >= 0 && diffDays % 14 === 0
    }

    default:
      return false
  }
}

export const buildSchedule = (days: Date[], bills : Bill[]) =>
  days.map(day => ({
    date: day,
    bills: bills.filter(bill => occursOnDate(bill, day))
  }))

export const formatMonth = (d: Date) =>
  d.toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric'
  })