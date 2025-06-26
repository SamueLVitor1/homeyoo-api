import { FastifyRequest, FastifyReply } from 'fastify'
import { MongoTarefaRepository } from '../../../repositories/mongo/tarefa-repository'
import { z } from 'zod'
import { ConcluirTarefaUseCase } from '../../../use-cases/tarefas/concluir-tarefa'
import { MongoPontuacaoRepository } from '../../../repositories/mongo/pontuacao-repository'

export async function concluirTarefaController(request: FastifyRequest, reply: FastifyReply) {

  const bodySchema = z.object({
    house_id: z.string().min(1),
    tarefa_id: z.string().min(1)
  })

  const user_id = request.user.sub

  const { house_id, tarefa_id} = bodySchema.parse(request.body)


  const tarefaRepo = new MongoTarefaRepository()
  const pontuacaoRepo = new MongoPontuacaoRepository()
  const useCase = new ConcluirTarefaUseCase(tarefaRepo, pontuacaoRepo)

  const tarefa = await useCase.execute({
    house_id, tarefa_id, user_id
  })

  return reply.status(200).send({ tarefa })
}
