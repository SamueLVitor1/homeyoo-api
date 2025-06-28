import { FastifyRequest, FastifyReply } from "fastify"
import { makeBuscarPontuacaoUseCase } from "../../../use-cases/factories/make-buscar-pontuacao"

export async function buscarPontuacaoController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeBuscarPontuacaoUseCase()

  const pontuacao = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ pontuacao })
}