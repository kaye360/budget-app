import type { Transaction } from "../../../types/Transaction";
import Qry from "../../../utils/Qry";

export function renderTransactions(transactions: Transaction[], transactionList: HTMLElement) {

    transactions.map( t => {
        const transactionTemplate = Qry.one<HTMLTemplateElement>('#transaction-template')
        
        const transactionFragment = transactionTemplate.content.cloneNode(true) as DocumentFragment
        const transactionItem = Qry.one('transaction-item', transactionFragment) as HTMLElement

        Object.entries(t).forEach(([key, value]) => {
            transactionItem.setAttribute(key.toLowerCase(), String(value))
        })

        transactionList.appendChild(transactionItem)
    })
}