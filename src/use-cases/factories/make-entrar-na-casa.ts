import { MongoCasaRepository } from "../../repositories/mongo/casa-repository"
import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { BuscarCasaIdUseCase } from "../casas/buscar-por-id"
import { EntrarNaCasaUseCase } from "../casas/entrar-na-casa"

export function makeEntrarNaCasaUseCase() {
  const usuariosRepo = new MongoUsuariosRepository()
  const casaRepo = new MongoCasaRepository()
  return new EntrarNaCasaUseCase(casaRepo, usuariosRepo)
}