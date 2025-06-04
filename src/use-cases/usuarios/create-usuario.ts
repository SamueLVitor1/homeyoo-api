import { CriarUsuarioDTO, UsuariosRepositoryInterface } from "../../repositories/usuario-repository-interface";
import { hash } from "bcryptjs"; // ou outro lib de hash que preferir
import { Usuario } from "../../models/usuario.model"; // ajuste se necessário
import { ErroUsuarioJaExiste } from "../@errors/erro-usuario-ja-existe";

interface CreateUsuarioUseCaseRequest extends Omit<CriarUsuarioDTO, 'senha_hash'> {
  senha: string;
}

interface CreateUsuarioUseCaseResponse {
  usuario: Usuario;
}

export class CreateUsuarioUseCase {
  constructor(
    private usuarioRepository: UsuariosRepositoryInterface
  ) { }

  async execute(request: CreateUsuarioUseCaseRequest): Promise<CreateUsuarioUseCaseResponse> {
    const { nome, email, senha, avatar, casas } = request;

    const usuarioEmailExists = await this.usuarioRepository.buscarPorEmail(email);

    if (usuarioEmailExists) {
      throw new ErroUsuarioJaExiste();
    }


    const senha_hash = await hash(senha, 6);

    const usuario = await this.usuarioRepository.create({
      nome,
      email,
      senha_hash,
      avatar,
      casas
    });

    return {
      usuario
    }
  }
}
