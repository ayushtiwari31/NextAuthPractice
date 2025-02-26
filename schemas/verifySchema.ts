import {z} from 'zod'

export const verifySchema=z.object({
    code:z.string().length(6,{message:"Code must have only 6 characters."})
})