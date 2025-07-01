import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeBuscarRankingUseCase } from '../../../use-cases/factories/make-buscar-ranking'
import { MongoUsuariosRepository } from '../../../repositories/mongo/usuarios-repository'

export async function buscarRankingController(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  const useCase = makeBuscarRankingUseCase()
  const usuariosRepo = new MongoUsuariosRepository()

  const ranking = await useCase.execute({ houseId: id })

  const rankingComDados = await Promise.all(
    ranking.map(async (item) => {
      const usuario = await usuariosRepo.buscarPorId(item.user_id)

      return {
        user_id: item.user_id,
        pontos: item.pontos,
        nome: usuario?.nome ?? 'Desconhecido',
        avatar: usuario?.avatar ?? '',
      }
    })
  )

  return reply.status(200).send({ ranking: rankingComDados })
}
