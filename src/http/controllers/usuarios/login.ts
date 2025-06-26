import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'
import { AutenticarUsuarioUseCase } from '../../../use-cases/usuarios/autenticar-usuario'
import { z } from 'zod'
import { makeAutenticarUsuarioUseCase } from '../../../use-cases/factories/make-autenticar-usuario'

export async function loginController(req: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
  })

  const { email, senha } = bodySchema.parse(req.body)

  try {
    const useCase = makeAutenticarUsuarioUseCase(req.server)


    const { token, usuario } = await useCase.execute({ email, senha })

    return reply.status(200).send({ token, usuario })
  } catch (error: any) {
    return reply.status(400).send({ error: error.message })
  }
}
