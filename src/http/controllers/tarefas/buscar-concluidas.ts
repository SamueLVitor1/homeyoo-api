import { FastifyRequest, FastifyReply } from "fastify"
import { makeBuscarTarefasConcluidasUseCase } from "../../../use-cases/factories/make-buscar-tarefas-concluidas"

export async function buscarTarefasConcluidasController(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeBuscarTarefasConcluidasUseCase()

  const quantidade = await useCase.execute({
    usuarioId: request.user.sub
  })

  return reply.send({ quantidadeConcluidas: quantidade })
}