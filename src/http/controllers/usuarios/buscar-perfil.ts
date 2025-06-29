import { FastifyRequest, FastifyReply } from "fastify"
import { makeBuscarPerfilUseCase } from "../../../use-cases/factories/make-buscar-perfil"


export async function buscarPerfilController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeBuscarPerfilUseCase()

  const usuario = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ usuario })
}