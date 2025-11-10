import { z } from "astro:content"

export const Account = z.object({
    id : z.coerce.number(),
    userId : z.coerce.number(),
    name : z.coerce.string(),
    number : z.coerce.number()
})

export const CreateAccount = Account.omit({
    id: true
})

export type Account = z.infer<typeof Account>
export type CreateAccount = z.infer<typeof CreateAccount>