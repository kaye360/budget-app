import { z } from "astro/zod"

/**
 * Transaction Schema based on TransactionView
 */
export const Transaction = z.object({
    accountId: z.coerce.number().nullable(),
    amount: z.coerce.number(),
    accountName : z.coerce.string(),
    accountNumber : z.coerce.number(),
    budget: z.coerce.string(),
    budgetId: z.coerce.number().nullable(),
    date: z.coerce.string(),
    description: z.coerce.string(),
    isDeleted: z.coerce.boolean(),
    userId: z.coerce.number(),
    type : z.enum(["spending", "income"]),
    id : z.coerce.number()
})

/**
 * CreateTransaction Schema - Based on Transaction table
 */
export const CreateTransaction = Transaction
    .omit({ 
        id : true,
        budget : true,
        accountName : true,
        accountNumber : true
    })
    .extend({
        amount : z.union([z.string(), z.number()])
    })

/**
 * UpdateTransaction Schema - Based on Transaction Table
 * Only Id is required
 * Any other properties will be automatically stripped away - eg from TransactionView
 */
export const UpdateTransaction = Transaction
    .omit({ 
        budget : true,
        accountName : true,
        accountNumber : true,
    })
    .partial()
    .extend({ id : z.coerce.number() })
    .strip()

/**
 * Typescript types
 */
export type Transaction = z.infer<typeof Transaction>
export type CreateTransaction = z.infer<typeof CreateTransaction>
export type UpdateTransaction = z.infer<typeof UpdateTransaction>