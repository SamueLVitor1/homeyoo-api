import fastify from "fastify";
import connectDB from "./lib/mongoose";
import { usuariosRoutes } from "./http/controllers/usuarios/routes";
import { casasRoutes } from "./http/controllers/casas/routes";

connectDB();

export const app = fastify()

app.register(usuariosRoutes)
app.register(casasRoutes)