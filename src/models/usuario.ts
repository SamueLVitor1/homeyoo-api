import mongoose, { Document, InferSchemaType, HydratedDocument } from 'mongoose'

const CasaUsuarioSchema = new mongoose.Schema(
  {
    house_id: { type: String, required: false },
    papel: { type: String, enum: ['admin', 'membro'], required: true }
  },
  { _id: false }
)

const MedalhaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    displayName: { type: String, required: true },
    iconeUrl: { type: String, required: true },
    pontosNecessarios: { type: Number, required: true },
    pontosUsuario: { type: Number, required: true },
    habilitado: { type: Boolean, default: false },
    dataConquista: { type: Date, default: null }
  },
  { _id: false }
)


const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha_hash: { type: String, required: true },
  avatar: { type: String },
  streakAtual: { type: Number, default: 0, },
  maiorStreak: { type: Number, default: 0, },
  ultimoDiaStreak: { type: Date, default: null, },
  casas: { type: [CasaUsuarioSchema], default: [] },
  data_criacao: { type: Date, default: Date.now },

  medalhas: { type: [MedalhaSchema], default: [] }
})

export const Usuario = mongoose.model('Usuario', UsuarioSchema)
export type UsuarioType = HydratedDocument<InferSchemaType<typeof UsuarioSchema>>