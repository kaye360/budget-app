import { defineAction } from "astro:actions"
import { db } from "../../lib/db"
import { z } from "astro/zod"
import { CreateRecurringTransaction } from "./recurringTransaction"


const userId = 1

export const forecast = {

    index : defineAction({
        handler : async () => {
            const { data, error } = await db.from('Forecast')
                .select('*')
                .eq('userId', userId)
                .order('title', { ascending : true})

            if( error ) {
                throw new Error( error.message )
            }

            return data 
        }
    }),

    store : defineAction({
        input : CreateRecurringTransaction,
        handler : async (input) => {

            const { data, error } = await db.from('Forecast')
                .insert([input])
                .select()

            if( error ) {
                throw new Error( error.message )
            }

            return data
        }
    }),

    update : () => {},

    destroy : defineAction({
        input : z.number(),
        handler : async (id) => {

            const { error } = await db
                .from('Forecast')
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