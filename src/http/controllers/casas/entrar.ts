import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoCasaRepository } from '../../../repositories/mongo/casa-repository'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'
import { EntrarNaCasaUseCase } from '../../../use-cases/casas/entrar-na-casa'
import { z } from 'zod'
import { makeEntrarNaCasaUseCase } from '../../../use-cases/factories/make-entrar-na-casa'

export async function entrarNaCasaController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    codigo: z.string()
  })

  const { codigo } = paramsSchema.parse(request.params)

  const useCase = makeEntrarNaCasaUseCase()

  const casa = await useCase.execute({
    codigo,
    usuarioId: request.user.sub
  })

  return reply.status(200).send({ casa })
}
