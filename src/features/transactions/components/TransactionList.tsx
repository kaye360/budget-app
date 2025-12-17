import Transaction, { type Props as TransactionProps } from "./Transaction";
import type { Transaction as TransactionSchema} from "../schema/transaction.schema";

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
    return(
        <div className="
            grid gap-2
            [&>form:nth-of-type(odd)]:bg-blue/10
            dark:[&>form:nth-of-type(odd)]:bg-blue/5
            [&:has(.selected)]:[&_form:not(.selected)]:opacity-20
            [&_form]:opacity-100 [&_form]:transition-opacity
        ">
            { transactions.map( (transaction: TransactionSchema) => (
			    <Transaction 
                    transaction={transaction} 
                    budgets={budgets} 
                    accounts={accounts}
                    actionButton={actionButton} 
                    key={transaction.id}
                />
		))}
        </div>
    )
}