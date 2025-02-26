import {z} from 'zod'


export const fullnameValidation=z
    .string()
    .min(2,"FullName must have atleast 2 characters.")
    .max(30,"FullName should not have length more than 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/,"FullName must not contain any special character.")

export const signUpSchema=z.object({
    fullname:fullnameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must have atleast 6 characters."})
})