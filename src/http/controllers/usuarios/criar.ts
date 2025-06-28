import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCriarUsuarioUseCase } from '../../../use-cases/factories/make-criar-usuario'


export async function criarUsuarioController(req: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    avatar: z.string().optional(),
  })

  const { nome, email, senha, avatar } = bodySchema.parse(req.body)
  console.log(req.body)
  try {
    const useCase = makeCriarUsuarioUseCase()

    const usuario = await useCase.execute({
      nome, email, senha, avatar
    })

    return reply.status(201).send()
  } catch (error: any) {
    return reply.status(400).send({ error: error.message })
  }
}
