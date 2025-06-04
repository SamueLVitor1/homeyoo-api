import { FastifyInstance } from "fastify";
import { createCasa } from "./create";
import { buscarCasaPorCodigo } from "./buscar-codigo";


export async function casasRoutes(app: FastifyInstance) {
  app.post('/casas', createCasa)
  app.get('/casas/codigo/:codigo', buscarCasaPorCodigo)
}