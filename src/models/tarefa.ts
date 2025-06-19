import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose'

const TarefaSchema = new Schema({
  tarefa_id: { type: String, required: true },
  house_id: { type: String, required: true },
  responsavel_id: { type: String, required: true },
  pontuacao: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'concluida'], default: 'pendente' },
  data_criacao: { type: Date, default: Date.now },
  data_limite: { type: Date },
  data_conclusao: { type: Date }
})

export const Tarefa = model('Tarefa', TarefaSchema, 'tarefas')
export type TarefaType = HydratedDocument<InferSchemaType<typeof TarefaSchema>>

