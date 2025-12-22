import { z } from "astro:schema";
import { db } from "../../../lib/db";
import { convertDate } from "../../../lib/convertDate";
import type { TransactionValidator } from "./transaction.validator";
import { transaction, type TransactionsIndexResult } from "./transaction.actions";


/**
 * @todo Auth
 */
const userId = 1

type Params = z.infer<typeof TransactionValidator.index>

export const getTransactionsBy : Record<string, (input : Params) => Promise<TransactionsIndexResult>> = {

    all : async () => {
        const { data, count } = await db.from('TransactionView')
            .select('*', { count: 'exact'})
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)

        return { 
            list : data ?? [], 
            info : {
                count
            } 
        } 
    },

    recent : async ({ page = 0, perPage = 50} : Params ) => {

        const start = page * perPage
        const end = start + perPage - 1

        const { data, count } = await db.from('TransactionView')
            .select('*', { count: 'exact'})
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .range(start, end)

        return { 
            list : data ?? [], 
            info : { 
                count, 
                page, 
                perPage, 
                totalPages : Math.ceil( (count ?? 0) / perPage) 
            }
        } 
    },

    month : async ({ filterValue: date} : Params ) => {

        if( !date ) {
            return {
                list : [],
                error : 'No date provided'
            }
        }

        const [year, month] = date.split('-').map(Number)
        const startDate = `${year}-${month}-01`
        const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)

        const { data : transactions } = await db.from('TransactionView')
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

        return { 
            list : transactions ?? [], 
            info : {
                months
            }
        }
    },

    monthRange : async ({filterValue} : Params) => {

        console.log("monthRange Called")

        if( typeof filterValue !== 'object' || !filterValue ) {
            return {
                list : [],
                error : 'Invalid monthRange input value'
            }
        }

        const { start, end } = filterValue

        if( !start || !end ) {
            return {
                list : [],
                error : 'Invalid start or end date'
            }
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

        return {
            list : data ?? [],
        }
    },

    monthRange_TESTING : async ({filterValue} : Params) => {

        console.log("monthRange Called")

        if( typeof filterValue !== 'object' || !filterValue ) {
            return {
                list : [],
                error : 'Invalid monthRange input value'
            }
        }

        const { start, end } = filterValue

        if( !start || !end ) {
            return {
                list : [],
                error : 'Invalid start or end date'
            }
        }

        const startDate = `${start}-01`; // first day of July
        const [year, month] = end.split("-").map(Number);
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;

        // const { data } = await db.from('TransactionView')
        //     .select('*')
        //     .order('date', { ascending : false })
        //     .eq('userId', userId)
        //     .eq('isDeleted', false)
        //     .gte('date', startDate)
        //     .lte('date', endDate)

        return {
            list : [1,2,3,4,5,6]
        }
    },

    budget : async ({ filterValue: budgetId} : Params) => {

        let query =  db.from('TransactionView')
            .select('*')
            .order('date', { ascending: false })
            .eq('userId', userId)
            .eq('isDeleted', false)

        if (budgetId === 'null') {
            query = query.is('budgetId', null)
        } else if (budgetId) {
            query = query.eq('budgetId', Number(budgetId))
        }

        const { data } = await query
        return {
            list : data ?? []
        }
    },

    account : async ({ filterValue: accountId} : Params) => {

        if (accountId === null) {
            return {
                list : [],
                error : 'Invalid accountId'
            }
        } 

        let query =  db.from('TransactionView')
            .select('*')
            .order('date', { ascending: false })
            .eq('userId', userId)
            .eq('isDeleted', false)

        if (accountId === 'null') {
            query = query.is('accountId', null)
        } else if (accountId) {
            query = query.eq('accountId', Number(accountId))
        }
        
        const { data } = await query

        return {
            list : data ?? []
        }
    },

    deleted : async () => {

        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', true)
        
        return {
            list : data ?? []
        }
    },

    uncategorized : async () => {
        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('budget', 'Uncategorized')
        
        return {
            list : data ?? []
        }
    },

    search : async ({ filterValue : query} : Params) => {
        const { data } = await db.from('TransactionView')
            .select('*')
            .order('date', { ascending : false })
            .eq('userId', userId)
            .eq('isDeleted', false)
            .ilike('description', `%${query}%`)
        
        return {
            list : data ?? []
        }
    }

}
