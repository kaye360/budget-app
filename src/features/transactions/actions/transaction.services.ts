import { z } from "astro:schema";
import { db } from "../../../lib/db";
import { convertDate } from "../../../lib/convertDate";
import type { TransactionValidator } from "./transaction.validator";


/**
 * @todo Auth
 */
const userId = 1

type Params = z.infer<typeof TransactionValidator.index>

export const getTransactionsBy : Record<string, Function> = {

    all : async () => {
        const { data : list, count } = await db.from('TransactionView')
            .select('*', { count: 'exact'})
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)

        return { list, count } 
    },

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

    monthRange : async({filterValue} : Params) => {

        if( typeof filterValue !== 'object' || !filterValue ) {
            return { error : 'Invalid monthRange input value'}
        }

        const { start, end } = filterValue

        if( !start || !end ) {
            return { error : "Invalid start or end date"}
        }

        const startDate = `${start}-01`; // first day of July
        const [year, month] = end.split("-").map(Number);
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .gte('date', startDate)
            .lte('date', endDate)

        return data ?? []
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
