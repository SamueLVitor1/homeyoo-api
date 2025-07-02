import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRemoverMembroCasaUseCase } from '../../../use-cases/factories/make-remover-membro-casa'

export async function removerMembroCasaController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().min(1), // id da casa
    userId: z.string().min(1) // id do usuario
  })
  const { id, userId } = paramsSchema.parse(request.params)

  const useCase = makeRemoverMembroCasaUseCase()
  await useCase.execute({ casa_id: id, user_id: userId })

  return reply.status(204).send()
}
