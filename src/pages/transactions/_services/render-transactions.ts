import type { Transaction } from "../../../types/Transaction";
import { toDateWithYear } from "../../../utils/date";
import { toCurrency } from "../../../utils/money";
import Qry from "../../../utils/Qry";


export function renderTransactions(transactions: Transaction[], transactionList: HTMLElement) {

    
    transactions.map( t => {
        const transactionTemplate = Qry.one<HTMLTemplateElement>('#transaction-template')
        
        const transactionFragment = transactionTemplate.content.cloneNode(true) as DocumentFragment
        const transaction = Qry.one('transaction-item', transactionFragment) as HTMLElement
        transaction.setAttribute('date', t.date )
        transaction.setAttribute('description', t.description )
        transaction.setAttribute('amount', t.amount.toString() )
        transaction.setAttribute('budget', t.budget || '' )
        transaction.setAttribute('accountname', t.accountName || '' )
        transaction.setAttribute('accountnumber', t.accountNumber || '' )
        transaction.setAttribute('accounttype', t.accountType || '' )

        transactionList.appendChild(transaction)
    })
}