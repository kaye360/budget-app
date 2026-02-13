import Transaction, { type Props as TransactionProps } from "./Transaction";
import type { Transaction as TransactionSchema} from "../schema/transaction.schema";
import { convertDate } from "../../../lib/convertDate";
import React from "react";

export default function TransactionList({
    transactions,
    budgets = [],
    accounts = [],
    actionButton = 'edit'
} : {
    transactions : TransactionProps['transaction'][]
    budgets : TransactionProps['budgets'],
    accounts : TransactionProps['accounts'],
    actionButton? : TransactionProps['actionButton']
}) {

    const grouped = transactions.reduce((acc, transaction) => {
        const monthKey = convertDate(transaction.date).to('YYYY-MM')

        if (!acc[monthKey]) {
            acc[monthKey] = []
        }

        acc[monthKey].push(transaction)
        return acc
    }, {} as Record<string, typeof transactions>)

    const months = Object.keys(grouped)

    return(
        <div className="
            grid gap-2
            [&>form:nth-of-type(odd)]:bg-blue/10
            dark:[&>form:nth-of-type(odd)]:bg-blue/5
            [&:has(.selected)]:[&_form:not(.selected)]:opacity-20
            [&_form]:opacity-100 [&_form]:transition-opacity
        ">

            { months.map( month => (
                <React.Fragment key={month}>
                    <div className="flex justify-between items-baseline my-4 px-2 pb-1 font-semibold border-b border-blue/20">
                        <span className="text-xl">
                            {convertDate(month).to('MMMM-YYYY')}
                        </span>
                        <span className="text-md">
                            {grouped[month].length} {grouped[month].length === 1 ? 'transaction' : 'transactions'}
                        </span>
                    </div>
                    { grouped[month]?.map( (transaction: TransactionSchema) => (
                        <Transaction 
                            transaction={transaction} 
                            budgets={budgets} 
                            accounts={accounts}
                            actionButton={actionButton} 
                            key={transaction.id}
                        />
                    ))}
                </React.Fragment>
            ))}

        </div>
    )
}