export interface CriarTarefaDTO {
  tarefa_id: string,
  house_id: string,
  responsavel_id: string,
  pontuacao: number,
  data_limite: Date
}

// export const criarTarefaSchema = z.object({
//   titulo: z.string().min(2),
//   descricao: z.string().optional(),
//   data_limite: z.coerce.date().optional(), // transforma string em Date
//   pontuacao: z.number().min(0).default(0),
//   responsavel_id: z.string().min(1)
// })