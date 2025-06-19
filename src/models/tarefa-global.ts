import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'

const TarefaGlobalSchema = new Schema({
  nome: { type: String, required: true, unique: true }
})

export const TarefaGlobal = model('TarefaGlobal', TarefaGlobalSchema, 'tarefasglobais')
//                                    ^ nome do model        ^ schema         ^ nome exato da collection
export type TarefaGlobalType = HydratedDocument<InferSchemaType<typeof TarefaGlobalSchema>>