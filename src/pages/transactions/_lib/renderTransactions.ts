import type { Transaction } from "../../../types/Transaction";
import { el } from "../../../utils/El";

export function renderTransactions(transactions: Transaction[], transactionList: HTMLElement | null) {

    transactions.map( t => {
        const transactionTemplate = el<HTMLTemplateElement>('#transaction-template')
        
        if( !transactionTemplate || !transactionList ) {
            console.warn('Invalid transactinTemplate or transactionList')
            return
        }

        const transactionFragment = transactionTemplate.content.cloneNode(true) as DocumentFragment
        const transactionItem = el('transaction-item', transactionFragment)

        Object.entries(t).forEach(([key, value]) => {
            transactionItem?.setAttribute(key.toLowerCase(), String(value))
        })

        if( transactionItem ) { 
            transactionList.appendChild(transactionItem)
        }
    })
}