import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MongoTarefaRepository } from '../../../repositories/mongo/tarefa-repository'
import { ListarTarefasPorCasaUseCase } from '../../../use-cases/tarefas/listar-por-casa'

export async function listarTarefasController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().min(1)
  })

  const { id } = paramsSchema.parse(request.params)

  const repo = new MongoTarefaRepository()
  const useCase = new ListarTarefasPorCasaUseCase(repo)

  const { tarefas } = await useCase.execute({ house_id: id })

  return reply.status(200).send({ tarefas })
}
