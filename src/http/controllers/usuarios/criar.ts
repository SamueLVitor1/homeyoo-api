import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'
import { CriarUsuarioUseCase } from '../../../use-cases/usuarios/criar-usuario'
import { z } from 'zod'


export async function criarUsuarioController(req: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    avatar: z.string().optional(),
  })

  const { nome, email, senha, avatar } = bodySchema.parse(req.body)

  try {
    const usuariosRepository = new MongoUsuariosRepository()
    const useCase = new CriarUsuarioUseCase(usuariosRepository)

    const usuario = await useCase.execute({
      nome, email, senha, avatar
    })

    return reply.status(201).send()
  } catch (error: any) {
    return reply.status(400).send({ error: error.message })
  }
}
