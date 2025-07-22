import type { Budget, Transaction } from "../types/types"
import { groupTransactionsByBudget } from "./transaction.utils"


/**
 * 
 * @function getBudgetsWithTotalSpent
 * Return a list of budgets with totals spent and percent spent for each budget
 * 
 */

interface BudgetWithTotalSpent extends Budget {
	totalSpent : number,
	percentSpent : number
}

export function getBudgetsWithTotalSpent( 
    budgets : Budget[] | undefined, 
    transactions : Transaction[] | undefined
) : BudgetWithTotalSpent[] {

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
 * 
 */
export function getAllBudgetTotalSpent( budgets : BudgetWithTotalSpent[] ) {
	const totals = budgets.reduce(
		(acc, item) => {
			acc.totalAmount += item.amount
			acc.totalSpent += item.totalSpent
			return acc
		},
		{ totalAmount: 0, totalSpent: 0, percentSpent : 0 }
	)

	totals.percentSpent = totals.totalAmount
		? Math.round((totals.totalSpent / totals.totalAmount) * 100)
		: 0

	return {
		totalAmount : Math.round(totals.totalAmount),
		totalSpent : Math.round(totals.totalSpent),
		percentSpent : Math.min( Math.round(totals.percentSpent), 100)
	}
}