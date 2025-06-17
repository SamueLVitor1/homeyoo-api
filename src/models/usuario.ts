import mongoose, { InferSchemaType } from 'mongoose'

const CasaUsuarioSchema = new mongoose.Schema(
  {
    house_id: { type: String, required: false },
    papel: { type: String, enum: ['admin', 'membro'], required: true }
  },
  { _id: false }
)

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha_hash: { type: String, required: true },
  avatar: { type: String },
  casas: { type: [CasaUsuarioSchema], default: [] },
  data_criacao: { type: Date, default: Date.now }
})

export const Usuario = mongoose.model('Usuario', UsuarioSchema)
export type UsuarioType = InferSchemaType<typeof UsuarioSchema>