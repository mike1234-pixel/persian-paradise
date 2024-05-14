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

export const PhraseCreateEditSchema = PhraseSchema.extend({
  module: string(),
  faHoldingValue: string().optional()
})

export type RegistersModel = ReturnType<(typeof RegistersSchema)['parse']>
export type PhraseModel = ReturnType<(typeof PhraseSchema)['parse']>
export type PhraseCreateEditModel = ReturnType<
  (typeof PhraseCreateEditSchema)['parse']
>
