import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoCasaRepository } from '../../../repositories/mongo/casa-repository'
import { z } from 'zod'
import { BuscarCasaIdUseCase } from '../../../use-cases/casas/buscar-por-id'

export async function buscarCasaIdController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string()
  })

  const { id } = paramsSchema.parse(request.params)

  const casaRepo = new MongoCasaRepository()

  const useCase = new BuscarCasaIdUseCase(
    casaRepo
  )

  const casa = await useCase.execute({
    casaId: id,
  })

  return reply.status(200).send({ casa })
}
