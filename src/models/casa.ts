import mongoose, { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const MembroSchema = new Schema(
  {
    user_id: { type: String, required: true },
    nome: { type: String, required: true },
    papel: { type: String, enum: ['admin', 'membro'], required: true },
    avatar: { type: String, required: false }
  },
  { _id: false }
)

const CasaSchema = new Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  data_criacao: { type: Date, default: Date.now },
  membros: { type: [MembroSchema], default: [] },
  metaAtual: { type: Number, default: 0 }, 
})
export const Casa = model('Casa', CasaSchema)

export type CasaType = HydratedDocument<InferSchemaType<typeof CasaSchema>>