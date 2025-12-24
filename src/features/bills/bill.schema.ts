import { z } from "astro/zod";

export const Bill = z.object({
    id : z.coerce.number(),
    userId : z.coerce.number(),
    title : z.coerce.string(),
    type : z.enum(['expense', 'income']),
    amount : z.coerce.number(),
    repeats : z.enum(['weekly', 'biweekly', 'monthly']),
    date : z.coerce.string(),
    startDate : z.coerce.string()
})

export const CreateBill = Bill.omit({
    id : true
})

export type Bill = z.infer<typeof Bill>
export type CreateBill = z.infer<typeof CreateBill>