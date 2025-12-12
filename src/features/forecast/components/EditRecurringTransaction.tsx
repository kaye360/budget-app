/**
 * 
 * EditReccuringTransaction component that can be used in CreateReturringTransactionForm and EditForecastFrom
 * to make them visuallly consistent
 * 
 * Should be just the inputs and wrapped in a form element in higher component
 * Should be able to accept a RecurringTransacgtion of CreateRecurringTransaction
 * 
 * 
 * 
 */

import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import type { CreateRecurringTransaction, RecurringTransaction } from "../recurringTransaction"

interface Props {
    recurringTransaction : RecurringTransaction | CreateRecurringTransaction
    setRecurringTransaction : Dispatch<SetStateAction<RecurringTransaction | CreateRecurringTransaction>>
}

export default function EditReccuringTransaction({
    recurringTransaction,
    setRecurringTransaction
} : Props) {

    const [createForecastDateType, setCreateForecastDateType] = useState<'first' | 'last' | 'custom'>('first')

    const handleDateTypeChange = (e: FormEvent<HTMLSelectElement>) => {
        const currentType = e.currentTarget.value as typeof createForecastDateType
        setCreateForecastDateType(currentType)
        if( currentType !== 'custom' ) {
            setRecurringTransaction({...recurringTransaction, date : currentType})
        }
    }

    return(
        <>
            <label className="flex-1">
                Title
                <input
                    type="text"
                    value={recurringTransaction.title}
                    onChange={ e => setRecurringTransaction({...recurringTransaction, title: e.target.value})}
                />
            </label>
            <label className="flex-1">
                Amount
                <input
                    type="number"
                    step={0.01}
                    value={recurringTransaction.amount}
                    onChange={ e => setRecurringTransaction({...recurringTransaction, amount: Number(e.target.value)})}
                />
            </label>
            <label className="flex-1">
                Repeats
                <select
                    value={recurringTransaction.repeats}
                    onChange={ e => setRecurringTransaction({...recurringTransaction, repeats : e.target.value as RecurringTransaction['repeats']})}
                >
                    <option value="monthly">Monthly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="weekly">Weekly</option>
                </select>
            </label>
            { recurringTransaction.repeats === 'monthly' && (
                <label className="flex-1">
                    Date
                    <select
                        onChange={handleDateTypeChange}
                    >
                        <option value="first">First Day</option>
                        <option value="last">Last Day</option>
                        <option value="custom">Custom</option>
                    </select>
                    { createForecastDateType === 'custom' && (
                        <input
                            type="number"
                            value={recurringTransaction.date}
                            onChange={ e => setRecurringTransaction({...recurringTransaction, date: e.target.value})}
                            className="mt-2"
                        />
                    )}
                </label>
            )}
            { (recurringTransaction.repeats === 'biweekly' || recurringTransaction.repeats === 'weekly') && (
                <label className="flex-1">
                    Start Date
                    <input
                        type="date"
                        value={recurringTransaction.date}
                        onChange={ e => setRecurringTransaction({...recurringTransaction, date: e.target.value})}
                    />
                </label>
            )}
            <div className="self-end">
                Type:
                <div className="border border-blue/40 rounded min-w-max text-xs font-medium grid grid-cols-2">
                    <button
                        type="button"
                        className={`
                            p-1 h-full font-semibold
                            ${recurringTransaction.type === 'income' ? 'bg-blue/40' : ''}
                        `}
                        onClick={ () => setRecurringTransaction({...recurringTransaction, type : 'income'}) }
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        className={`
                            p-1 h-full font-semibold
                            ${recurringTransaction.type === 'expense' ? 'bg-blue/40' : ''}
                        `}
                        onClick={ () => setRecurringTransaction({...recurringTransaction, type : 'expense'}) }
                    >
                        Expense
                    </button>
                </div>
            </div>
        </>
    )
}