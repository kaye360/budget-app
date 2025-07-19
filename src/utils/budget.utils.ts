import type { Budget, Transaction } from "../types/types"
import { groupTransactionsByBudget } from "./transaction.utils"


/**
 * 
 * @function getBudgetsWithTotalSpent
 * Return a list of budgets with totals spent and percent spent for each budget
 * 
 */
export function getBudgetsWithTotalSpent( 
    budgets : Budget[] | undefined, 
    transactions : Transaction[] | undefined
) {

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
