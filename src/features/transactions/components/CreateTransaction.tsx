import type { Budget } from "../../budgets/schema/budget.schema";
import type { Account } from "../../settings/accounts.schema";
import { LoadingButton, useLoadingButtonStatus } from "../../../components/Button/LoadingButton.tsx";
import { ArrowRightLeftIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Transaction, type CreateTransaction as CreateTransactionSchema } from "../schema/transaction.schema.ts";
import { convertDate } from "../../../lib/convertDate.ts";
import { actions } from "astro:actions";
import { sleep, stripEmojis } from "../../app/app.utils.ts";
import TransactionList from "./TransactionList.tsx";

interface Props {
    transactions : Transaction[],
    budgets : Budget[],
    accounts : Account[],
}

interface CreateTransactionFormState extends Omit<CreateTransactionSchema, "amount"> {
        amount: string
    }

export default function CreateTransaction({transactions, budgets, accounts} : Props) {

    const initialTransaction: CreateTransactionFormState = {
        userId: 1,
        type: "spending",
        accountId: accounts[0].id,
        amount: '-',
        budgetId: budgets[0].id,
        date: convertDate().to('YYYY-MM-DD'),
        description: "",
        isDeleted: false
    }

    const [transaction, setTransaction] = useState<CreateTransactionSchema>(initialTransaction)
    const [transactionList, setTransactionList] = useState<Transaction[]>(transactions)
    const saveStatus = useLoadingButtonStatus()

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        saveStatus.setAsLoading()
        const saveResponse = await actions.transaction.store(transaction)

        if( saveResponse.error ) {
            saveStatus.setAsInitial()
            throw new Error(saveResponse.error.message)
        }

        const transactionResponse = await actions.transaction.byRecent({ perPage : 25 })

        if( transactionResponse.error ) {
            saveStatus.setAsInitial()
            throw new Error(transactionResponse.error.message)
        }

        setTransactionList(transactionResponse.data.list)
        saveStatus.setAsComplete()
        await sleep(1000)

        setTransaction({
            ...transaction,
            description : initialTransaction.description,
            amount : initialTransaction.amount,
        })
    }   

    return (
        <>
            <form 
                method="post"
                onSubmit={handleSave}
                className="flex flex-col md:flex-row md:items-end gap-3 mb-8"
            >

                <label>
                    Date: <br />
                    <input 
                        type="date" 
                        name="date" 
                        className="w-full md:w-auto"
                        value={transaction.date}
                        onChange={ e => setTransaction({ ...transaction, date: e.target.value })}
                    />
                </label>

                <label>
                    Description: <br />
                    <input 
                        type="text" 
                        name="description"
                        className="w-full"
                        value={transaction.description}
                        onChange={ e => setTransaction({ ...transaction, description : e.target.value })}
                        required 
                    />
                </label>

                <label>
                    Amount: <br />
                    <input 
                        type="text"
                        name="amount"
                        value={transaction.amount} 
                        onChange={ e => setTransaction({ ...transaction, amount : e.target.value })}
                        required
                    />
                </label>

                <div className="self-stretch">
                    Type: <br />
                    <div className="border border-blue rounded min-w-max text-sm font-medium grid grid-cols-2">
                        <button 
                            type="button"
                            className={`
                                px-2 py-1 
                                ${transaction.type === 'income' ? 'bg-blue text-white' : ''}
                            `}
                            onClick={ () => setTransaction({...transaction, type : 'income'}) }
                        >
                            Income
                        </button>
                        <button 
                            type="button"
                            className={`
                                px-2 py-1
                                ${transaction.type === 'spending' ? 'bg-blue text-white' : ''}
                            `}
                            onClick={ () => setTransaction({...transaction, type : 'spending'}) }
                        >
                            Spending
                        </button>
                    </div>
                </div>

                <label>
                    Budget: <br />
                    <select 
                        name="budgetId" 
                        className="w-full" 
                        value={transaction.budgetId ?? 0}
                        onChange={ e => setTransaction({...transaction, budgetId : Number(e.target.value)})}
                        onKeyDown={ e => {
                            
                            const match = budgets.find( b => stripEmojis(b.name)
                                .toLowerCase()
                                .startsWith(e.key.toLowerCase()) 
                            ) 
    
                            if( match ) {
                                setTransaction({...transaction, budgetId : Number(match.id)})
                            }
                        }}
                    >
                        { budgets.map( budget => (
                            <option value={budget.id} key={budget.id}>
                                {budget.name}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex items-end gap-4">
                    <label className="w-full">
                        Account: <br />
                        <select 
                            name="accountId" 
                            className="w-full" 
                            value={transaction.accountId ?? 0}
                            onChange={ e => setTransaction({...transaction, accountId : Number(e.target.value)})}
                        >
                            { accounts.map( account => (
                                <option value={account.id} key={account.id}>
                                    {account.name} - {account.number}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div>
                        <LoadingButton 
                            state={saveStatus} 
                            badge="add"
                            title="Add Transaction"
                            type="submit"
                            icon={ArrowRightLeftIcon}
                        />
                    </div>
                </div>

            </form>

            <h2 className="text-lg font-semibold">Recent Transactions</h2>

            <TransactionList 
                transactions={transactionList} 
                budgets={budgets} 
                accounts={accounts} 
            />
        </>
    )
}
