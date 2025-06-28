import { MongoPontuacaoRepository } from "../../repositories/mongo/pontuacao-repository"
import { BuscarPontuacaoUseCase } from "../usuarios/buscar-pontuacao"

export function makeBuscarPontuacaoUseCase() {
  const repository = new MongoPontuacaoRepository()
  return new BuscarPontuacaoUseCase(repository)
}