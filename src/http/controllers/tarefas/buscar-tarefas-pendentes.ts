import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscarTarefasPendentesUseCase } from '../../../use-cases/factories/make-buscar-tarefas-pendentes-usuarios'


export async function buscarTarefasPendentesController(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const useCase = makeBuscarTarefasPendentesUseCase()

  const tarefas = await useCase.execute({ userId })

  return reply.status(200).send({ tarefas })
}