import { FastifyInstance } from "fastify";
import { criarUsuarioController } from "./criar";

export async function usuariosRoutes(app: FastifyInstance) {
  app.post('/usuarios', criarUsuarioController)
}