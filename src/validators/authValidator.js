import {z} from 'zod'

const registerSchema = z.object({
  name: z.string(),
  email: z.string.email(),
  password: z.string().min(8, "Passowrd must be 8 character")
})

export { registerSchema }