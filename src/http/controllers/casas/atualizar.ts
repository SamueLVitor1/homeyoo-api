import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAtualizarCasaUseCase } from '../../../use-cases/factories/make-atualizar-casa'

export async function atualizarCasaController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().min(1)
  })

  const bodySchema = z.object({
    nome: z.string().optional(),
    metaAtual: z.number().optional()
  })

  const { id } = paramsSchema.parse(request.params)
  const { nome, metaAtual } = bodySchema.parse(request.body)

  const useCase = makeAtualizarCasaUseCase()
  await useCase.execute({ casa_id: id, nome, metaAtual })

  return reply.status(200).send()
}
