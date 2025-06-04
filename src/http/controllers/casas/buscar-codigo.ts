import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { MongoCasaRepository } from "../../../repositories/mongo/mongo-casa-repository";
import { BuscarCasaPorCodigoUseCase } from "../../../use-cases/casas/buscar-por-codigo";

export async function buscarCasaPorCodigo(request: FastifyRequest, reply: FastifyReply) {

  const buscarCasaPorCodigoParamsSchema = z.object({
    codigo: z.string()
  })

  const { codigo } = buscarCasaPorCodigoParamsSchema.parse(request.params)

  const casaRepository = new MongoCasaRepository()
  const buscarCasaPorCodigoUseCase = new BuscarCasaPorCodigoUseCase(casaRepository)

  try {
    const { casa } = await buscarCasaPorCodigoUseCase.execute({
      codigo
    })

    console.log(casa)

    if (!casa) {
      return reply.status(404).send({
        message: "Casa não encontrada"
      });
    }
    return reply.status(200).send({
      message: "Casa encontrada com sucesso",
      casa
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: "Erro de validação",
        errors: error.errors
      });
    }

    return reply.status(500).send({
      message: "Erro interno do servidor",
      error
    });
  }

}