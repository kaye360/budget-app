import { z } from "astro/zod";

export const Bill = z.object({
    id : z.coerce.number(),
    userId : z.coerce.number(),
    title : z.coerce.string(),
    type : z.enum(['expense', 'income']),
    amount : z.coerce.number(),
    repeats : z.enum(['weekly', 'biweekly', 'monthly']),
    date : z.coerce.string(),
    startDate : z.coerce.string(),
    accountId : z.coerce.number().nullable(),
    accountName : z.coerce.string(),
    accountNumber : z.coerce.number(),
})

export const CreateBill = Bill.omit({
    id : true,
    accountName : true,
    accountNumber : true
})

export const UpdateBill = Bill
    .omit({
        accountName : true,
        accountNumber : true
    })
    .partial()
    .extend({ id : z.coerce.number() })
    .strip()

export type Bill = z.infer<typeof Bill>
export type CreateBill = z.infer<typeof CreateBill>
export type UpdateBill = z.infer<typeof UpdateBill>