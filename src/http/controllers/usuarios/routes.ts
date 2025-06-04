import { FastifyInstance } from "fastify";
import { createUsuario } from "./create";

export async function usuariosRoutes(app: FastifyInstance){
  app.post('/usuarios', createUsuario)
}