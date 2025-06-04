import { FastifyInstance } from "fastify";
import { createCasa } from "./create";


export async function casasRoutes(app: FastifyInstance){
  app.post('/casas', createCasa)
}