import type { Transaction } from "../schema/transaction.schema"

/**
 * Groups an array of transactions by their `budgetId`.
 *
 * Each transaction with a numeric `budgetId` will be added to an object
 * keyed by that `budgetId`. Transactions without a numeric `budgetId`
 * are ignored.
 *
 * @param {Transaction[]} transactions - The array of transactions to group.
 * 
 */
export function groupTransactionsByBudget(transactions : Transaction[]) : Record<number, Transaction[]> {

    const transactionsGrouped: Record<number, Transaction[]> = {}

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