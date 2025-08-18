import type { Transaction } from "../../types/types"

/*
 * 
 * @function groupTransactionsByBudget
 * Take a list of transactions and group them by budget
 * 
 */
export function groupTransactionsByBudget(transactions : Transaction[]) {

    const transactionsGrouped: {[key: number] : Transaction[] } = {}

    transactions.forEach( transaction => {

        if( ! (typeof transaction.budgetId === 'number' ) ) {
            return
        }

        if( ! transactionsGrouped[transaction.budgetId] ) {
            transactionsGrouped[transaction.budgetId] = []
        }

        transactionsGrouped[transaction.budgetId].push(transaction)
        
    })

    return transactionsGrouped
}