import { z } from "astro/zod"

/**
 * Transaction Schema based on TransactionView
 */
export const Transaction = z.object({
    accountId: z.coerce.number(),
    amount: z.coerce.number(),
    budget: z.coerce.string(),
    budgetId: z.coerce.number().nullable(),
    date: z.coerce.string(),
    description: z.coerce.string(),
    isDeleted: z.coerce.boolean(),
    userId: z.coerce.number(),
    id : z.coerce.number()
})

/**
 * CreateTransaction Schema - Based on Transaction table
 */
export const CreateTransaction = Transaction.omit({ 
    id : true,
    budget : true
})

/**
 * UpdateTransaction Schema - Based on Transaction Table
 * Only Id is required
 * Any other properties will be automatically stripped away - eg from TransactionView
 */
export const UpdateTransaction = Transaction
    .omit({ budget : true })
    .partial()
    .extend({ id : z.coerce.number() })
    .strip()

/**
 * Typescript types
 */
export type Transaction = z.infer<typeof Transaction>
export type CreateTransaction = z.infer<typeof CreateTransaction>
export type UpdateTransaction = z.infer<typeof UpdateTransaction>