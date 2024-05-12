import { object, string, array } from 'zod'

export const RegistersSchema = object({
  informal: string(),
  formal: string()
})

export const PhraseSchema = object({
  en: string(),
  fa: array(string()).or(RegistersSchema),
  emoji: string().optional(),
  hint: string().optional()
})

export const CourseModuleSchema = object({
  title: string(),
  subtitle: string().optional(),
  emoji: string().optional(),
  phrases: array(PhraseSchema)
})

export const ModulesListSchema = array(CourseModuleSchema)

export type RegistersModel = ReturnType<(typeof RegistersSchema)['parse']>
export type PhraseModel = ReturnType<(typeof PhraseSchema)['parse']>
export type CourseModuleModel = ReturnType<(typeof CourseModuleSchema)['parse']>
export type ModulesListModel = ReturnType<(typeof ModulesListSchema)['parse']>
