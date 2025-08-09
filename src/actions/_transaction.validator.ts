import { z } from "astro:content";

/**
 * Base Transaction Schema
 */
const transactionSchema = z.object({
    date: z.string().length(10),
    description: z.string().min(1),
    amount: z.number(),
    budgetId: z.number(),
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

    store : transactionSchema,

    update : transactionSchema.partial().extend({
        id : z.number()
    }),

    destroy : z.object({
        id : z.number()
    })

}