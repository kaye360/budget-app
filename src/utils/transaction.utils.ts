import { el } from "../lib/el"
import type { Transaction } from "../types/types"

/**
 * 
 * @function groupTransactionsByBudget
 * Take a list of transactions and group them by budget
 * 
 * @todo make this return a list of full budgets and split the second part into another function
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


/**
 * 
 * @function renderTransactions
 * Render a list of transactions onto the page
 * 
 */
export function renderTransactions(
    transactions: Transaction[], 
    transactionList: HTMLElement | null
) {

    const template = el<HTMLTemplateElement>('#transaction-template')

    if( !transactionList || !template ) {
        console.warn('Invalid transactionList or template')
        return
    }

    transactions.forEach( transaction => {
        const newTransaction = createTransactionFromTemplate(template, transaction)
        if( newTransaction ) transactionList.appendChild(newTransaction)
    })
}

// Helper for renderTransactions
function createTransactionFromTemplate( 
    template: HTMLTemplateElement,
    transaction : Transaction
) : Element | null {

    const fragment = template.content.cloneNode(true)

    const newTransaction = el('transaction-item', fragment, el => {
        el.setAttribute('state', JSON.stringify(transaction))
    })

    return newTransaction
}
