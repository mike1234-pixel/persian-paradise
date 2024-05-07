import * as yup from 'yup'

export const RegistersSchema = yup.object().shape({
  informal: yup.string(),
  formal: yup.string()
})

export const PhraseSchema = yup.object().shape({
  en: yup.string().required(),
  fa: yup.array().of(yup.string().required()).required(),
  emoji: yup.string().optional(),
  hint: yup.string().optional()
})

export const CourseModuleSchema = yup.object().shape({
  title: yup.string(),
  subtitle: yup.string().optional(),
  emoji: yup.string().optional(),
  phrases: yup.array().of(PhraseSchema)
})

export const ModulesListSchema = yup.array().of(CourseModuleSchema)

export type RegistersModel = yup.InferType<typeof RegistersSchema>
export type PhraseModel = yup.InferType<typeof PhraseSchema>
export type CourseModuleModel = yup.InferType<typeof CourseModuleSchema>
export type ModulesListModel = yup.InferType<typeof ModulesListSchema>
