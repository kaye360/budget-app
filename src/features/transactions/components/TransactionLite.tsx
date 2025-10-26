import { convertDate } from "../../../lib/convertDate";
import type { Transaction as TransactionSchema } from "../schema/transaction.schema";

interface Props {
    transaction : TransactionSchema
}

export default function Transaction({transaction} : Props) {

    return (
        <div 
            className={`flex flex-wrap md:flex-nowrap items-center gap-y-1 gap-x-2 px-2 py-4 rounded-md`}
        >

            <span className="text-sm text-accent-text min-w-fit">
                { convertDate(transaction.date).to('MMM-DD-YYYY')}
            </span>

            <div className="block font-semibold text-xl md:text-xl rounded w-full md:w-auto">
                {transaction.description}
            </div>
            
            <div className="bg-blue/20 px-2 py-1 text-sm md:text-xs font-medium rounded-sm tracking-wide capitalize flex items-center min-w-fit order-10 md:order-none">
                    {transaction.budget}
            </div>

        </div>
    )
}