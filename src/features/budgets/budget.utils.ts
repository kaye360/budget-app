import type { Transaction } from "../transactions/schema/transaction.schema"
import { groupTransactionsByBudget } from "../transactions/utils/groupTransactionsByBudget.utils"
import type { Budget } from "./schema/budget.schema"


/**
 * 
 * @function calcBudgetSpendingTotals
 * Calculates the total spending and percentage of spending for each budget.
 * Returns a new Budget[] with  returned budget including totalSpent and percentSpent
 * 
 */
export function calcBudgetSpendingTotals( 
    budgets : Budget[] | undefined, 
    transactions : Transaction[] | undefined
) : Budget[] {

	if( !transactions || !budgets ) {
		return []
	}

    const transactionsGroupedByBudget = groupTransactionsByBudget(transactions)
    
	// Loop through transactionsGroupedByBudget (object) 
    // Return summed totals for each budgetId
	const budgetTotals : { budgetId: number, total : number}[] = []
	for (const budgetId in transactionsGroupedByBudget ) {

		const total = transactionsGroupedByBudget[budgetId].reduce((sum, { amount}) => {
			return sum + Number(amount)
		}, 0)
	
		budgetTotals.push({
			budgetId : Number(budgetId),
			total : Math.abs( Math.round(total * 100) / 100 )
		})
	}

    // Merge budgetTotals into budgets array
	return budgets.map( budget => {

		const match = budgetTotals.find( t => t.budgetId === budget.id )
		const totalSpent = match ? match.total : 0
		let percentSpent = Math.min( Math.round( totalSpent / budget.amount * 100 ), 100)

		return { ...budget, totalSpent, percentSpent }
	})
}


/**
 * @function calcBudgetPieChartData
 * Calculates the data needed to be passed intp a generic Pie Chart from a Budget[] Array
 */
type PieChart = {
	label : string,
	amount : number
}[]

export function calcBudgetPieChartData(budgetsWithSpendingTotals : Budget[]) {

	// Number of budget slices to show. Does not include "other" category that is added afterwards
	const numOfSlices = 7

	const budgetsPieChartSorted: PieChart = budgetsWithSpendingTotals
		.filter( budget => !budget.name.includes('Income') )
		.map( budget => ({
			label : budget.name,
			amount : budget.totalSpent ?? 0
		}))
		.sort((a,b) => a.amount < b.amount ? 1 : -1)
		.reduce<PieChart>( (acc, entry, i) => {
			if( i < numOfSlices) {
				acc.push(entry)
			} else {
				if( !acc[numOfSlices]) acc[numOfSlices] = {label : '🗂️ Other', amount : 0}
				acc[numOfSlices].amount += entry.amount
			}

			return acc
		}, [])

	const budgetPieChartData = [
		...budgetsPieChartSorted.slice(0, numOfSlices),
		{
			label: '🗂️ Other',
			amount: budgetsPieChartSorted
				.slice(numOfSlices)
				.reduce((sum, item) => sum + item.amount, 0)
		}
	].filter(item => item.amount > 0)
	
	return budgetPieChartData
}
