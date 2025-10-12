import { ActionError, defineAction } from "astro:actions";
import { getTransactionsBy } from "./transaction.services";
import { db } from "../../../lib/db";
import { TransactionValidator } from "./transaction.validator";

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
        input : TransactionValidator.store,
        handler : async (input) => {

            /**
             * @todo implement auth, accounts
            */
            const { error } = await db
                .from('Transactions')
                .insert(input)

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
        
            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    })

}
