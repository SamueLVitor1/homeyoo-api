import fastify from "fastify";
import connectDB from "./lib/mongoose";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";

connectDB();

export const app = fastify()

app.register(usuariosRoutes)