import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db } from "../../lib/db"

/**
 * @todo implement auth
 */
const userId = 1

export const budget = {
    
    index : defineAction({
        handler : async () => {

            const { data, error } = await db.from('Budgets')
                .select('*')
                .eq('userId', userId)


            if( error ) {
                throw new Error( error.message )
            }

            // Sort while ignoring emojis
            const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

            function stripLeadingEmoji(str : string) {
                const segments = [...segmenter.segment(str)];
                return segments.length > 1
                    ? segments.slice(1).map(s => s.segment).join("").trim()
                    : str;
            }   

            const sorted = data.sort((a,b) => 
                stripLeadingEmoji(a.name).localeCompare(stripLeadingEmoji(b.name))
            )

            return sorted 
        }
    }),

    store : defineAction({
        input : z.object({
            name: z.coerce.string(),
            // Accept a string or number but coerce to number
            amount: z.union([z.string(), z.number()]).transform(value => Number(value))
        }),
        handler : async ({name, amount}) => {

            const { data, error } = await db.from('Budgets')
                .insert([{ userId , name, amount }])
                .select()

            if( error ) {
                throw new Error( error.message )
            }

            return data
        }
    }),

    update : defineAction({
        input : z.object({
            name: z.string(),
            amount : z.number(),
            id : z.number()
        }),
        handler : async({name, amount, id}) => {

            const { error } = await db
                .from('Budgets')
                .update({ name, amount })
                .eq('id', id)
                .eq('userId', userId)

            if( error ) {
                throw new Error(error.message)
            }

            return true
        }
    }),

    destroy : defineAction({
        input : z.object({
            id : z.number()
        }),
        handler : async ({id}) => {

            const { error } = await db
                .from('Budgets')
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
