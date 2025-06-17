import fastify from "fastify";
import connectDB from "./lib/mongoose";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";
import jwt from '@fastify/jwt'

connectDB();
export const app = fastify()

app.register(jwt, {
  secret: 'chave_homeyoo', // depois troca por variável de ambiente!
})

app.register(usuariosRoutes)