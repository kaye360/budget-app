import { type FormEvent } from "react"
import type { RecurringTransaction } from "../recurringTransaction.ts"
import type { ForecastState } from "./ForecastEditor.tsx"
import EditReccuringTransaction from "./EditRecurringTransaction.tsx"

interface Props {
    forecastState : ForecastState
}


export default function EditForecastForm({ forecastState } : Props) {

    const { forecast, setForecast } = forecastState

    const handleEditForecast = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const handleTransactionChange = (index: number, field: keyof RecurringTransaction, value: any) => {
        setForecast( prev =>
            prev.map((t, i) => i === index ? { ...t, [field]: value } : t)
        )
    }

    return (
        <div>
            <h2 className="font-semibold">
                Edit recurring transactions
            </h2>
            
            <form
                onSubmit={handleEditForecast}
                className="grid gap-4"
            >

                { forecast.map( transaction => (
                    <div className="flex gap-2">
                        <EditReccuringTransaction 
                            recurringTransaction={transaction} 
                            setRecurringTransaction={() => handle}
                        />
                    </div>
                ))}

                {/* { forecast.map( (transaction, i) => (
                    <div 
                        className="flex items-center gap-y-1 gap-x-2.5"
                        key={transaction.id}
                    >
                        
                        <label>
                            Title
                            <input 
                                type="text" 
                                value={transaction.title}
                                onChange={ e => handleTransactionChange(i, 'title', e.target.value)}
                            />
                        </label>

                        <label>
                            Amount
                            <input
                                type="text"
                                value={transaction.amount}
                                onChange={ e => handleTransactionChange(i, 'amount', e.target.value)}
                            />
                        </label>

                        <label>
                            Repeats
                            <select
                                value={transaction.repeats}
                                onChange={ e => handleTransactionChange(i, 'repeats', e.target.value) }
                            >
                                <option value="monthly">Monthly</option>
                                <option value="biweekly">Bi-weekly</option>
                                <option value="weekly">Weekly</option>
                            </select>
                        </label>

                        {transaction.repeats === 'monthly' && (
                            <label>
                                Transaction Date
                                <select
                                    value={transaction.repeats}
                                    onChange={ e => handleTransactionChange(i, 'repeats', e.target.value)}
                                >
                                    <option value="first">First Day</option>
                                    <option value="last">Last Day</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </label>
                        )}

                    </div>
                ))} */}

            </form>



        </div>
    )
}