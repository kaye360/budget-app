import { defineAction } from "astro:actions";
import { db } from "../../../lib/db";
import { CreateTransaction, Transaction, UpdateTransaction } from "../schema/transaction.schema";
import { z } from "astro/zod";
import { convertDate } from "../../../lib/convertDate";

const userId = 1  // @todo Auth

export const transaction = {

    /**
     * Get All transactions from a userId
     */
    all : defineAction({
        handler : async () => {
            const { data, count, error } = await db.from('TransactionView')
                .select('*', { count: 'exact'})
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
    
            return { 
                list : (data ?? []) as Transaction[], 
                info : {
                    count
                },
                error
            } 
        }
    }),

    /**
     * Get Recent Transactions by userId
     */
    byRecent : defineAction({
        input : z.object({
            page : z.number().optional(),
            perPage : z.number().optional()
        }),
        handler : async (input) => {

            const { page = 0, perPage = 50} = input
            const start = page * perPage
            const end = start + perPage - 1
    
            const { data, count, error } = await db.from('TransactionView')
                .select('*', { count: 'exact'})
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .range(start, end)
    
            return { 
                list : (data ?? []) as Transaction[], 
                info : { 
                    count, 
                    page, 
                    perPage, 
                    totalPages : Math.ceil( (count ?? 0) / perPage) 
                },
                error
            } 
        }
    }),

    /**
     * Get Trasactions in a given month by userId
     */
    byMonth : defineAction({
        input : z.object({
            date : z.string()
        }),
        handler : async ({date}) => {   
            
            const [year, month] = date.split('-').map(Number)
            const startDate = `${year}-${month}-01`
            const endDate = (new Date(year, month, 0)).toISOString().slice(0,10)
    
            const { data : transactions, error : tError } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .gte('date', startDate)
                .lte('date', endDate)
    
            const { data : monthData, error : mError } = await db.from('TransactionView')
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
                list : (transactions ?? []) as Transaction[], 
                info : {
                    months
                },
                error : tError ?? mError ?? null
            }
        }
    }),

    /**
     * Get transactions in a given range of months by userId
     */
    byMonthRange : defineAction({
        input : z.object({
            start : z.string(),
            end : z.string()
        }),
        handler : async ({start, end}) => {

            const startDate = `${start}-01`
            const [year, month] = end.split("-").map(Number)
            const nextMonth = month === 12 ? 1 : month + 1
            const nextYear = month === 12 ? year + 1 : year
            const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`

            const { data, error } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .gte('date', startDate)
                .lte('date', endDate)

            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Get Transactions by budget
     */
    byBudget : defineAction({
        input : z.object({ 
            budgetId : z.union([ z.number(), z.null() ]).optional()
        }),
        handler : async ({budgetId}) => {

            let query =  db.from('TransactionView')
                .select('*')
                .order('date', { ascending: false })
                .eq('userId', userId)
                .eq('isDeleted', false)
    
            if (budgetId === null) {
                query = query.is('budgetId', null)
            } else if (budgetId) {
                query = query.eq('budgetId', Number(budgetId))
            }
    
            const { data, error } = await query

            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Get Transactions by accountId
     */
    byAccount : defineAction({
        input : z.object({ 
            accountId : z.number()
        }),
        handler : async ({accountId}) => {  

            const { data, error } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending: false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .eq('accountId', Number(accountId))
            
            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Get Transactions that are deleted by userId
     */
    byDeleted : defineAction({
        handler : async () => {

            const { data, error } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', true)
            
            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Get Transactions that are uncategorized by userId
     */
    byUncategorized : defineAction({
        handler : async () => {

            const { data, error } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('budget', 'Uncategorized')
            
            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Search Transactions by description for userId
     */
    search : defineAction({
        input : z.object({
            query : z.string()
        }),
        handler : async ({query}) => {

            const { data, error } = await db.from('TransactionView')
                .select('*')
                .order('date', { ascending : false })
                .eq('userId', userId)
                .eq('isDeleted', false)
                .ilike('description', `%${query}%`)
            
            return {
                list : (data ?? []) as Transaction[],
                error
            }
        }
    }),

    /**
     * Store a new transaction
     */
    store : defineAction({
        input : CreateTransaction,
        handler : async (input) => {

            /**
             * @todo implement auth, accounts
            */
            const { error } = await db
                .from('Transactions')
                .insert({...input, amount : Number(input.amount)})

            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    }),

    /**
     * Update an existing transaction
     */
    update : defineAction({
        input : UpdateTransaction,
        handler : async(input) => {

            /**
             * @todo auth
             */
            const { error } = await db
                .from('Transactions')
                .update({
                    ...input,
                    userId : 1,
                })
                .eq('id', input.id)

            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    }),

    /**
     * Delete a transaction
     */
    destroy : defineAction({
        input : z.object({
            id : z.number()
        }),
        handler : async (input) => {

            const { error } = await db
                .from('Transactions')
                .update({ isDeleted : true})
                .eq('id', input.id)
        
            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    })

}
