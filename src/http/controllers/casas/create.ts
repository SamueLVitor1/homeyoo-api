import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { MongoCasaRepository } from "../../../repositories/mongo/mongo-casa-repository";
import { CreateCasaUseCase } from "../../../use-cases/casas/create-casa";


export async function createCasa(request: FastifyRequest, reply: FastifyReply) {

  const createCasaBodySchema = z.object({
    nome: z.string().min(1, "Nome da casa é obrigatório"),
    membros: z.array(
      z.object({
        user_id: z.string(),
        nome: z.string(),
        papel: z.enum(["admin", "membro"]),
        avatar: z.string().optional()
      })
    )
  });

  const { nome, membros } = createCasaBodySchema.parse(request.body);

  try {
    const casaRepository = new MongoCasaRepository();
    const createCasaUseCase = new CreateCasaUseCase(casaRepository);

    const { casa } = await createCasaUseCase.execute({ nome, membros });

    return reply.status(201).send({
      message: "Casa criada com sucesso!",
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
