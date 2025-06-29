import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListarTarefasPorCasaUseCase } from '../../../use-cases/factories/make-listar-por-casa'

export async function listarTarefasPorCasaController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().min(1)
  })

  const { id } = paramsSchema.parse(request.params)
 
  const useCase = makeListarTarefasPorCasaUseCase()

  const { tarefas } = await useCase.execute({ house_id: id })

  return reply.status(200).send({ tarefas })
}
