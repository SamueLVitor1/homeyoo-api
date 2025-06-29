import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListarMembrosUseCase } from '../../../use-cases/factories/make-listar-membros'

export async function listarMembrosCasaController(req: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().min(1, 'ID da casa é obrigatório'),
  })

  const { id: house_id } = paramsSchema.parse(req.params)
  try {
    const useCase = makeListarMembrosUseCase()
    const membros = await useCase.execute({ house_id })

    return reply.status(200).send({ membros })
  } catch (error: any) {
    return reply.status(400).send({ error: error.message })
  }
}