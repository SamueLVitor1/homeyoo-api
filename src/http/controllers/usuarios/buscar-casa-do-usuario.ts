import { FastifyRequest, FastifyReply } from "fastify"
import { makeBuscarCasaDoUsuarioCase } from "../../../use-cases/factories/make-buscar-casa-do-usuario"


export async function buscarCasaDoUsuarioController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeBuscarCasaDoUsuarioCase()

  const casa = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ casa })
}