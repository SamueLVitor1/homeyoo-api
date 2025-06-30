import { FastifyRequest, FastifyReply } from "fastify"
import { makeContarTarefasConcluidasUseCase } from "../../../use-cases/factories/make-contar-tarefas-concluidas"

export async function contarTarefasConcluidasController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeContarTarefasConcluidasUseCase()

  const quantidade = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ quantidadeConcluidas: quantidade })
}