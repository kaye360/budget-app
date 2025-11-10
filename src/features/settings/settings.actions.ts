import { defineAction } from "astro:actions"
import { db } from "../../lib/db"
import { Account, CreateAccount } from "./accounts.schema"
import { z } from "astro:content"


const userId = 1

export const accounts = {

    index : defineAction({
        handler : async () => {
            const { data, error } = await db.from('Accounts')
                .select('*')
                .order('name')
                .eq('userId', userId)

            if( error ) {
                throw new Error( error.message )
            }

            return data 
        }
    }),

    store : defineAction({
        input : CreateAccount,
        handler : async (input) => {

            /**
             * @todo implement auth, accounts
            */
            const { error } = await db
                .from('Accounts')
                .insert(input)

            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    }),

    update : defineAction({
        input : z.array(Account),
        handler : async (input) => {

            const response = await Promise.all(
                input.map( async (account) => {
                    const { error} = await db.from('Accounts')
                        .update({ name : account.name, number : account.number })
                        .eq('id', account.id)
                    return error
                })
            )

            if( !response.every( r => r === null) ) {
                throw new Error(response.toString())
            }

            return true
        }
    }),

    destroy : defineAction({
        input : z.number(),
        handler : async (id) => {

            const { error } = await db
                .from('Accounts')
                .delete()
                .eq('id', id)
                .eq('userId', userId)

            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    })

}