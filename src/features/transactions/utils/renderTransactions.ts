import { el } from "../../../lib/el"
import type { Transaction } from "../../../types/types"

/**
 * 
 * @function renderTransactions
 * Render a list of transactions onto the page
 * 
 * @todo add template to list of props
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
