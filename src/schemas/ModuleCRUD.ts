import { object, string, array } from 'zod'
import { PhraseSchema } from './PhraseCRUD'

export const CourseModuleSchema = object({
  title: string(),
  subtitle: string().optional(),
  emoji: string().optional(),
  phrases: array(PhraseSchema).optional()
})

export const CourseModuleCreateEditSchema = CourseModuleSchema

export const ModulesListSchema = array(CourseModuleSchema)

export type CourseModuleModel = ReturnType<(typeof CourseModuleSchema)['parse']>
export type CourseModuleCreateEditModel = ReturnType<
  (typeof CourseModuleCreateEditSchema)['parse']
>
export type ModulesListModel = ReturnType<(typeof ModulesListSchema)['parse']>
