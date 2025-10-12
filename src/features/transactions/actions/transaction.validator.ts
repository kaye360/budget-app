import { z } from "astro/zod"

/**
 * Base Transaction Schema
 */
const transactionSchema = z.object({
    date: z.string().length(10),
    description: z.string().min(1),
    amount: z.number(),
    budgetId: z.number().nullable().optional(),
    accountId: z.number(),
    isDeleted : z.boolean(),
    userId : z.number(),
    source : z.string(),
})


/**
 * Action input validators for Transactions
 */
export const TransactionValidator =  {

    index : z.object({
        filter : z.string(),
        filterValue : z.string().optional(),
        page : z.number().optional(),
        perPage : z.number().optional()
    }),

    store : z.union([
        transactionSchema,
        z.array(transactionSchema)
    ]).transform( t => Array.isArray(t) ? t : [t]),

    update : transactionSchema.partial().extend({
        id : z.number()
    }),

    destroy : z.object({
        id : z.number()
    })

}