import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'

const PontuacaoSchema = new Schema({
  house_id: { type: String, required: true },
  user_id: { type: String, required: true },
  pontos: { type: Number, default: 0 },
  data_atualizacao: { type: Date, default: Date.now }
})

PontuacaoSchema.index({ house_id: 1, user_id: 1 }, { unique: true })

export const Pontuacao = model('Pontuacao', PontuacaoSchema, 'pontuacoes')
export type  PontuacaoType = HydratedDocument<InferSchemaType<typeof PontuacaoSchema>>