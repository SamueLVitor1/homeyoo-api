import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { MongoCasaRepository } from '../../../repositories/mongo/casa-repository'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'
import { CriarCasaUseCase } from '../../../use-cases/casas/criar-casa'
import { makeCriarCasaUseCase } from '../../../use-cases/factories/make-criar-casa'

export async function criarCasaController(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    nome: z.string().min(2)
  })

  const { nome } = schema.parse(request.body)

  // ID do usuário no token

  const usuariosRepo = new MongoUsuariosRepository()
  const usuario = await usuariosRepo.buscarPorId(request.user.sub)

  if (!usuario) {
    return reply.status(404).send({ error: 'Usuário não encontrado' })
  }

  const useCase = makeCriarCasaUseCase()

  const casa = await useCase.execute({
    nome,
    usuario: {
      id: usuario._id.toString(),
      nome: usuario.nome,
      avatar: usuario.avatar ?? ''
    }
  })

  return reply.status(201).send(casa)
}
