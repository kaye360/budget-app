import { convertDate } from "../../../lib/convertDate";
import type { Transaction as TransactionSchema } from "../schema/transaction.schema";

interface Props {
    transaction : TransactionSchema
}

export default function Transaction({transaction} : Props) {

    return (
        <div 
            className={`flex flex-wrap md:flex-nowrap items-center gap-y-2 gap-x-2 py-4 rounded-md`}
        >

            <span className="text-sm text-accent-text min-w-fit w-full md:w-auto">
                { convertDate(transaction.date).to('MMM-DD')}
            </span>

            <span className="block font-semibold text-md rounded min-w-fit">
                {transaction.description}
            </span>

            <span className="block font-semibold text-md rounded ml-auto md:order-last ">
                {transaction.amount}
            </span>
            
            <span className="w-full">
                <span className="bg-blue/20 px-2 py-1 text-sm md:text-xs font-medium rounded-sm tracking-wide capitalize flex items-center min-w-fit order-10 md:order-0 w-fit">
                    {transaction.budget}
                </span>
            </span>

        </div>
    )
}