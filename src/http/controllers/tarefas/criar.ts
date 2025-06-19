import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoTarefaRepository } from '../../../repositories/mongo/tarefa-repository'
import { CriarTarefaUseCase } from '../../../use-cases/tarefas/criar-tarefa'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'
import { z } from 'zod'

export async function criarTarefaController(request: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    tarefa_id: z.string().min(1),
    data_limite: z.coerce.date(), // transforma string em Date
    pontuacao: z.number().min(0).default(0),
    house_id: z.string().min(1),
    responsavel_id: z.string().min(1)
  })

  const { tarefa_id, house_id, pontuacao, data_limite, responsavel_id } = bodySchema.parse(request.body)


  const tarefaRepo = new MongoTarefaRepository()
  const useCase = new CriarTarefaUseCase(tarefaRepo)

  const tarefa = await useCase.execute({
    tarefa_id,
    responsavel_id,
    house_id,
    pontuacao,
    data_limite
  })

  return reply.status(201).send({ tarefa })
}
