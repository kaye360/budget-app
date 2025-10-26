import { convertDate } from "../../../lib/convertDate"
import type { Transaction } from "../../transactions/schema/transaction.schema"

export function calcMonthlyTotals(transactions: Transaction[]) {

    const totals: Record<
        string,
        {
            spending: number
            income: number
            net: number
            budgets: Record<string, number>
        }
    > = {}

    transactions.forEach((transaction: Transaction) => {
        
        if (!transaction.amount) return

        const month = convertDate(transaction.date).to("YYYY-MM")
        const amount = Math.round(Number(transaction.amount))
        const absAmount = Math.abs(amount)

        // Add month if doesn't exist
        if (!(month in totals)) {
            totals[month] = {
                spending: 0,
                income: 0,
                net: 0,
                budgets : {}
            }
        }

        // Add income, spending, and net
        if (amount > 0) {
            totals[month].income += absAmount
        }
        if (amount < 0) {
            totals[month].spending += absAmount
        }
        totals[month].net += amount

        // Add Budgets
        const budget = transaction.budget as string
        totals[month].budgets[budget] = (totals[month].budgets[budget] ?? 0) + amount
    })

    const totalsArray = Object.entries(totals)
        .map(([month, { spending, income, net }]) => ({ month, spending, income, net }))
        .sort((a, b) => (a.month < b.month ? 1 : -1))

    return { totalsArray, totals }
}

export function calcUpperRange(totals: number[]) {
    const highestSpending = String(Math.max(...totals.map((t) => Math.abs(t))))
    const leadingDigits = Number(highestSpending.slice(0, 2)) + 1
    const zeros = "0".repeat(highestSpending.length - 2)
    return Number(leadingDigits + zeros)
}

export function calcMonthRange(start: string, end: string) {
    const range = []
    const [startYear, startMonth] = start.split("-").map(Number)
    const [endYear, endMonth] = end.split("-").map(Number)

    let year = startYear
    let month = startMonth

    while (year < endYear || (year === endYear && month <= endMonth)) {
        const formatted = `${year}-${String(month).padStart(2, "0")}`
        range.push(formatted)

        month++
        if (month > 12) {
            month = 1
            year++
        }
    }

    return range
}