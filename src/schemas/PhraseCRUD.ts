import z from 'zod'

export const RegistersSchema = z.object({
  informal: z.string(),
  formal: z.string()
})

export const PhraseSchema = z.object({
  en: z.string(),
  fa: z.array(z.string()).or(RegistersSchema),
  emoji: z.string().optional(),
  hint: z.string().optional()
})

export const CourseModuleSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  emoji: z.string().optional(),
  phrases: z.array(PhraseSchema)
})

export const ModulesListSchema = z.array(CourseModuleSchema)

export type RegistersModel = z.infer<typeof RegistersSchema>
export type PhraseModel = z.infer<typeof PhraseSchema>
export type CourseModuleModel = z.infer<typeof CourseModuleSchema>
export type ModulesListModel = z.infer<typeof ModulesListSchema>
