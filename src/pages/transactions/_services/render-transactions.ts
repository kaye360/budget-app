import type { Transaction } from "../../../types/Transaction";
import { toDateWithYear } from "../../../utils/date";
import { toCurrency } from "../../../utils/money";
import Qry from "../../../utils/Qry";


export function renderTransactions(transactions: Transaction[]) {
    transactions.map( t => {
        const transactionList = Qry.one<HTMLDivElement>('transaction-list')
        const transactionTemplate = Qry.one<HTMLTemplateElement>('#transaction-item')
    
        const transaction = transactionTemplate.content.cloneNode(true) as DocumentFragment
        const date = Qry.one<HTMLDivElement>('transaction-date', transaction)
        const description = Qry.one<HTMLDivElement>('transaction-description', transaction)
        const amount = Qry.one<HTMLDivElement>('transaction-amount', transaction)
        const budget = Qry.one<HTMLDivElement>('transaction-budget', transaction)
    
        date.textContent = toDateWithYear(t.date)
        description.textContent = t.description + ` (${t.id})`
        amount.textContent = toCurrency(t.amount)
        budget.textContent = t.budget
    
        transactionList.appendChild(transaction)
    })
}