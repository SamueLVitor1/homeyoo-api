import { FastifyRequest, FastifyReply } from "fastify"
import { makeContarTarefasPendentesUseCase } from "../../../use-cases/factories/make-contar-tarefas-pendentes"


export async function contarTarefasPendentesController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeContarTarefasPendentesUseCase()

  const quantidade = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ quantidadePendentes: quantidade })
}