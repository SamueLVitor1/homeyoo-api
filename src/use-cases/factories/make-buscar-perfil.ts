import { MongoUsuariosRepository } from "../../repositories/mongo/usuarios-repository"
import { BuscarPerfilUseCase } from "../usuarios/buscar-perfil"


export function makeBuscarPerfilUseCase() {
  const repo = new MongoUsuariosRepository()
  return new BuscarPerfilUseCase(repo)
}