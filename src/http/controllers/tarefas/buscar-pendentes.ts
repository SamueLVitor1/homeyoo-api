import { FastifyRequest, FastifyReply } from "fastify"
import { makeBuscarTarefasPendentesUseCase } from "../../../use-cases/factories/make-buscar-tarefas-pendentes"

export async function buscarTarefasPendentesController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeBuscarTarefasPendentesUseCase()

  const quantidade = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ quantidadePendentes: quantidade })
}