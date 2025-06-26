import { FastifyInstance } from "fastify"
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { AutenticarUsuarioUseCase } from "../usuarios/autenticar-usuario"
import { CriarUsuarioUseCase } from "../usuarios/criar-usuario"

export function makeAutenticarUsuarioUseCase(fastify: FastifyInstance) {
  const usuariosRepository = new MongoUsuariosRepository()

  return new AutenticarUsuarioUseCase(usuariosRepository, fastify)
}
