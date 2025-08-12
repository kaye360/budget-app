import { z } from "astro:schema";
import { db } from "../lib/db";
import { convertDate } from "../lib/convertDate";
import type { CreateTransaction } from "../types/types";
import { toOnlyDigits } from "../utils/app.utils";
import type { TransactionValidator } from "./_transaction.validator";


/**
 * @todo Auth
 */
const userId = 1

/**
 * Transaction.get handlers
 */
type GetTransactions = {
    [key : string] : Function
}

type Params = z.infer<typeof TransactionValidator.index>

export const getTransactionsBy : GetTransactions = {

    recent : async ({ page = 0, perPage = 50} : Params ) => {

        const start = page * perPage
        const end = start + perPage - 1

        const { data : list, count } = await db.from('TransactionView')
            .select('*', { count: 'exact'})
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .range(start, end)

        return { list, count, totalPages : Math.ceil( (count ?? 0) / perPage) }
    },

    month : async ({ filterValue: date} : Params ) => {

        if( !date ) {
            return { error : 'Invalid Date'}
        }

        const [year, month] = date.split('-').map(Number)
        const startDate = `${year}-${month}-01`
        const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)

        const { data : list } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .gte('date', startDate)
            .lte('date', endDate)

        const { data : monthData } = await db.from('TransactionView')
            .select('date')
            .eq('userId', userId)
            .eq('isDeleted', false)

        const uniqueMonths = [...new Set( 
            monthData?.map( month => month.date && month.date.slice(0,7) )
                .filter(Boolean)
        )]

        const months = uniqueMonths
            .sort()
            .reverse()
            .map( month => ({
                month,
                title : convertDate(month).to('MMM-YYYY')
            }))

        return { list, months }
    },

    budget : async({ filterValue: budgetId} : Params) => {

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .eq('budgetId', Number(budgetId))

        return data
    },

    deleted : async() => {

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', true)
        
        return data
    },

    uncategorized : async() => {
        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('budget', 'Uncategorized')
        
        return data
    }

}
