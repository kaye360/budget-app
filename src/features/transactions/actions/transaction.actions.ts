import { ActionError, defineAction } from "astro:actions";
import { getTransactionsBy } from "./transaction.services";
import { db } from "../../../lib/db";
import { TransactionValidator } from "./transaction.validator";

export interface TransactionsIndexResult {
    list : unknown[]    
    info? : Record<string, unknown> | null
    error? : string | null
}

export const transaction = {

    // index : defineAction({
    //     input : TransactionValidator.index,
    //     handler : async (input) : Promise<TransactionsIndexResult> => {

    //         if( !(typeof getTransactionsBy[input.filter] === 'function') ) {
    //             throw new ActionError({
    //                 code : 'BAD_REQUEST',
    //                 message : 'Invalid transaction filter'
    //             })
    //         }
            
    //         const data = await getTransactionsBy[input.filter]({...input})
    //         return data
    //     }
    // }),
    index: defineAction({
        input: TransactionValidator.index,
        handler: async (input): Promise<TransactionsIndexResult> => {
            return {
                list : ['your', 'butt', 'is', 'working!'],
            }
            // try {
            //     const fn = getTransactionsBy[input.filter]

            //     if (typeof fn !== 'function') {
            //         throw new ActionError({
            //         code: 'BAD_REQUEST',
            //         message: 'Invalid transaction filter'
            //         })
            //     }

            //     return await fn(input)
            // } catch (err) {
            //      console.error('Transaction index failed:', err)

            //     throw new ActionError({
            //         code: 'INTERNAL_SERVER_ERROR',
            //         message:
            //         err instanceof Error ? err.message : 'Unknown error'
            //     })
            // }
        }
    }),



    store : defineAction({
        input : TransactionValidator.store,
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


    update : defineAction({
        input : TransactionValidator.update,
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

    destroy : defineAction({
        input : TransactionValidator.destroy,
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
