import { el } from "../lib/el"
import type { CreateTransaction, Transaction } from "../types/types"
import { toOnlyDigits } from "./app.utils"

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



/**
 * 
 * Transform formData to list of CreateTransactions[] to be inserted into DB
 * 
 */
export function formDataToCreateTransactions(
    formData : FormData
) {

    const validInputs = [
        { title : 'date', type : 'string'},
        { title : 'description', type : 'string'},
        { title : 'amount', type : 'number'},
        { title : 'budgetId', type : 'number'},
        { title : 'accountId', type : 'number'}
    ] as const
    
    const initialValue = { isDeleted : false, userId : 1, source : "manual" }
    const transactions : Record<number, { [key:string] : string | number | boolean }> = {}

    const formEntries = Object.fromEntries( formData.entries() )

    for (const key in formEntries )  {

        const [col, indexStr] = key.split('-')
        const index = Number(indexStr)
        const value = formEntries[key]

        if( typeof value !== 'string') continue

        const validInput = validInputs.find( input => input.title === col)

        if( !validInput ) {
            throw new Error(`Invalid col: ${col}`)
        }

        if( !transactions[index] ) {
            transactions[index] = initialValue
        }

        transactions[index][col] = validInput.type === 'number'
            ? toOnlyDigits(value)
            : value
    }
        
    return Object.values( transactions )
}