import { el } from "../lib/el"
import { fetchData } from "../lib/fetch"
import { objectValuesToString } from "./app.utils"
import type { Transaction } from "../types/types"


/**
 * 
 * @function getTransactions
 * Fetch Transactions wrapper
 * 
 */
export interface GetTransactions {
    data : Transaction[],
    totalPages? : number,
    count? : number
}

export async function getTransactions(
    userId : number,
    options? : {
        by? : string,
        page? : number,
        perPage? : number,
        month? : number,
    }
) : Promise<GetTransactions> {
    const params = options ? '&' + new URLSearchParams( objectValuesToString(options) ) : ''

    const res = await fetchData<GetTransactions>(`/api/transactions?id=${userId}&${params}`)

    if( res.error || !res.response ) return { data : [], totalPages : 0, count : 0 }

    return res.response
}


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
        Object.entries(transaction).forEach(([key, value]) => {
            el.setAttribute(key.toLowerCase(), String(value))
        })
    })

    return newTransaction
}
