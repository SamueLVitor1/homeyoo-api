import { ListarTarefasGlobaisUseCase } from '../../../use-cases/tarefas/listar-tarefas-globais'
import { MongoTarefaGlobalRepository } from '../../../repositories/mongo/tarefa-global-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listarTarefasGlobaisController(req: FastifyRequest, reply: FastifyReply) {
  const repo = new MongoTarefaGlobalRepository()
  const useCase = new ListarTarefasGlobaisUseCase(repo)

  const tarefas = await useCase.execute()
  return reply.status(200).send( tarefas )
}