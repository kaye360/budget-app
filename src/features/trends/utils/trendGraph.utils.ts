import { convertDate } from "../../../lib/convertDate"
import type { Transaction } from "../../transactions/schema/transaction.schema"

/**
 * @function calcSpendingTotals
 * Calculate monthly spending, income, and net totals from a list of transactions.
 */
export function calcSpendingTotals(transactions: Transaction[]) {

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
        if ( transaction.type === 'income' ) {
            totals[month].income += absAmount
        }
        if ( transaction.type === 'spending' ) {
            totals[month].spending += absAmount
        }
        totals[month].net += amount

        // Add Budgets
        const budget = transaction.budget as string
        totals[month].budgets[budget] = (totals[month].budgets[budget] ?? 0) + amount
    })

    return totals
}


function totalsToArray( 
    totals : ReturnType<typeof calcSpendingTotals>,
) {
    let totalsArr =  Object.entries(totals)
        .map(([month, { spending, income, net, budgets }]) => ({ month, spending, income, net, budgets }))
        .sort((a, b) => (a.month < b.month ? 1 : -1))

    return totalsArr
}

function getGraphStartAndEndMonths( totals: ReturnType<typeof calcSpendingTotals> ) {
    const totalsArray = totalsToArray(totals)
    const start = totalsArray.map((t) => t.month).sort().at(0) as string
    const end = totalsArray.map((t) => t.month).sort().at(-1) as string
    return { start, end }
}

export function calcUpperRange(
    totals: ReturnType<typeof calcSpendingTotals>,
    filter : Exclude<keyof (typeof totals)[string], 'budgets'> = 'net'
) {

    const totalsArr = totalsToArray(totals).map((t) => t[filter])

    if( totalsArr.length === 0 ) {
        return 0
    }

    const highestSpending = String(Math.max(...totalsArr.map((t) => Math.abs(t))))
    const leadingDigits = Number(highestSpending.slice(0, 2)) + 1

    const numberOfZeros = highestSpending.length - 2 >= 0
        ? highestSpending.length - 2
        : 0

    const zeros = "0".repeat(numberOfZeros)
    return Number(leadingDigits + zeros)
}

export function calcMonthRange(totals: ReturnType<typeof calcSpendingTotals>) {

    const { start, end } = getGraphStartAndEndMonths(totals)

    if( !start || !end ) {
        return []
    }

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