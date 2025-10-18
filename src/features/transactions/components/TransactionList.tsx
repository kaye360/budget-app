import { useState } from "react"
import type { Budget, Transaction as TransactionType } from "../../../types/types"
import Transaction from "./Transaction"

interface TransactionList {
    initialTransactions : TransactionType[]
    budgets : Budget[]
    actionButton : 'edit' | 'restore'
}

export default function TransactionList({initialTransactions, actionButton, budgets} : TransactionList) {

    const [transactions, setTransactions] = useState(initialTransactions)

    return(
        <>
            <div className="grid [&>:nth-of-type(odd)]:bg-blue/5 gap-2 [&:has(.selected)]:[&>:not(.selected)]:opacity-20 [&>form]:opacity-100 [&>form]:transition-opacity">
                { transactions.map( transaction => 
                    <Transaction 
                        transaction={transaction} 
                        budgets={budgets}
                        actionButton={actionButton}
                        key={transaction.id}
                    /> 
                )}
            </div>

            <button>
                More Transactions
            </button>
        </>
    )
}