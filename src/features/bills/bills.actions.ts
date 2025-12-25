import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db } from "../../lib/db"
import { CreateBill, UpdateBill, type Bill } from "./bill.schema"

/**
 * @todo implement auth
 */
const userId = 1

export const bill = {
    
    index : defineAction({
        handler : async () => {

            const { data, error } = await db.from('Bills')
                .select(`
                    *,
                    Accounts (
                        name,
                        number
                    )
                `)
                .eq('userId', userId)
                .order('date', { ascending : true })

            const bills = data?.map( bill => ({
                ...bill,
                accountName : bill.Accounts?.name || '',
                accountNumber : bill.Accounts?.number || null
            })) as Bill[]

            return {bills, error}
        }
    }),

    store : defineAction({
        input : CreateBill,
        handler : async (input) => {

            const { data, error } = await db.from('Bills')
                .insert(input)
                .select()

            return { data, error }
        }
    }),

    update : defineAction({
        input : UpdateBill,
        handler : async (input) => {

            const { error } = await db
                .from('Bills')
                .update({ ...input })
                .eq('id', input.id)
                .eq('userId', userId)

            if( error ) {
                throw new Error(error.message)
            }

            return error ? { error } : { data: true }
        }
    }),

    destroy : defineAction({
        input : z.object({
            id : z.number()
        }),
        handler : async ({id}) => {

            const { error } = await db
                .from('Bills')
                .delete()
                .eq('id', id)
                .eq('userId', userId)

            return error ? { error } : { data: true }
        }
    })

}
