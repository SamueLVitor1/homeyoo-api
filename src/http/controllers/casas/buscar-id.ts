import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscarCasaIdUseCase } from '../../../use-cases/factories/make-buscar-por-id'

export async function buscarCasaIdController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string()
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeBuscarCasaIdUseCase()

  const casa = await useCase.execute({
    casaId: id,
  })

  return reply.status(200).send({ casa })
}
