import { FastifyInstance } from "fastify";
import { criarUsuarioController } from "./criar";
import { loginController } from "./login";

export async function usuariosRoutes(app: FastifyInstance) {
  app.post('/usuarios', criarUsuarioController)
  app.post('/login', loginController)
}