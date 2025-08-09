import { ActionError, defineAction } from "astro:actions";
import { getTransactionsBy, formDataToCreateTransactions } from "./_transaction.services";
import { z } from "astro:content";
import { db } from "../lib/db";
import { TransactionValidator } from "./_transaction.validator";
import type { Transaction } from "../types/types";


export const transaction = {

    index : defineAction({
        input : TransactionValidator.index,
        handler : async (input) => {

            if( !(typeof getTransactionsBy[input.filter] === 'function') ) {
                throw new ActionError({
                    code : 'BAD_REQUEST',
                    message : 'Invalid transaction filter'
                })
            }
            
            const data = await getTransactionsBy[input.filter]({...input})
            return data
        }
    }),


    store : defineAction({
        accept : 'form',
        input : z.any(),
        handler : async (input) => {

            /**
             * @todo implement auth, accounts
            */
            const transactions = formDataToCreateTransactions(input)
            const validated = transactions.map( transaction => 
                TransactionValidator.store.parse(transaction)
            )

            const { error } = await db
                .from('Transactions')
                .insert(validated)

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
                    source : 'manual'
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
                .select()
                .single()
        
            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    })

}
