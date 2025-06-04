import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MongoUsuariosRepository } from "../../../repositories/mongo/mongo-usuarios-repository";
import { CreateUsuarioUseCase } from "../../../use-cases/usuarios/create-usuario";


export async function createUsuario(request: FastifyRequest, reply: FastifyReply) {

  const createUsuarioBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    avatar: z.string().optional(),
  })

  const { nome, email, senha, avatar } = createUsuarioBodySchema.parse(request.body)

  try {
    const mongoUsuariosRepository = new MongoUsuariosRepository()
    const createUsuarioUseCase = new CreateUsuarioUseCase(mongoUsuariosRepository)

    await createUsuarioUseCase.execute({
      nome,
      email,
      senha,
      avatar
    })

    return reply.status(201).send({
      message: 'Usuário criado com sucesso!'
    })
  } catch (error) {
    return reply.status(500).send(error)
  }

}