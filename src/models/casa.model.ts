import mongoose, { InferSchemaType } from 'mongoose';

const MembroSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  nome: { type: String, required: true },
  papel: { type: String, enum: ['admin', 'membro'], required: true },
  avatar: { type: String, required: false }
}, { _id: false });

const CasaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_criacao: { type: Date, default: Date.now },
  membros: { type: [MembroSchema], default: [] },
  codigo_convite: { type: String, required: true, unique: true }, 
});

export const CasaModel = mongoose.model('Casa', CasaSchema);
export type Casa = InferSchemaType<typeof CasaSchema>;