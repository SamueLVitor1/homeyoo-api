import { FastifyInstance } from "fastify";
import { criarUsuarioController } from "./criar";
import { loginController } from "./login";
import { buscarPontuacaoController } from "./buscar-pontuacao";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { buscarCasaDoUsuarioController } from "./buscar-casa-do-usuario";

export async function usuariosRoutes(app: FastifyInstance) {
  app.post('/usuarios', criarUsuarioController)
  app.post('/login', loginController)

  app.get('/usuarios/pontuacao', { preHandler: [verifyJWT] }, buscarPontuacaoController)
  app.get('/usuarios/casa', { preHandler: [verifyJWT] }, buscarCasaDoUsuarioController)
}