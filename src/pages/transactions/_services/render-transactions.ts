import type { Transaction } from "../../../types/Transaction";
import Qry from "../../../utils/Qry";

export function renderTransactions(transactions: Transaction[], transactionList: HTMLElement | null) {

    transactions.map( t => {
        const transactionTemplate = Qry.one<HTMLTemplateElement>('#transaction-template')
        
        if( !transactionTemplate || !transactionList ) {
            console.warn('Invalid transactinTemplate or transactionList')
            return
        }

        const transactionFragment = transactionTemplate.content.cloneNode(true) as DocumentFragment
        const transactionItem = Qry.one('transaction-item', transactionFragment)

        Object.entries(t).forEach(([key, value]) => {
            transactionItem?.setAttribute(key.toLowerCase(), String(value))
        })

        if( transactionItem ) { 
            transactionList.appendChild(transactionItem)
        }
    })
}