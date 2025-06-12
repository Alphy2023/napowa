import { z } from "zod"


export const RoleFormSchema = z.object({
  name: z.string().min(1, "Role name is required").max(50, "Role name too long"),
  permissions: z.record(z.array(z.string())),
})

export type RoleFormValues = z.infer<typeof RoleFormSchema>

