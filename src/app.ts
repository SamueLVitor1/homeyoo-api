import fastify from "fastify";
import connectDB from "./lib/mongoose";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";
import jwt from '@fastify/jwt'
import { casasRoutes } from "./http/controllers/casas/routes";
import { tarefasRoutes } from "./http/controllers/tarefas/routes";

connectDB();
export const app = fastify()

app.register(jwt, {
  secret: 'chave_homeyoo', // depois troca por variável de ambiente!
})

app.register(usuariosRoutes)
app.register(casasRoutes)
app.register(tarefasRoutes)