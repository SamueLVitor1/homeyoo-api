import { CriarUsuarioDTO, UsuariosRepositoryInterface } from "../../repositories/usuario-repository-interface";
import { hash } from "bcryptjs"; // ou outro lib de hash que preferir
import { Usuario } from "../../models/usuario.model"; // ajuste se necessário

interface CreateUsuarioUseCaseRequest extends Omit<CriarUsuarioDTO, 'senha_hash'> {
  senha: string;
}

interface CreateUsuarioUseCaseResponse {
  user: Usuario;
}

export class CreateUsuarioUseCase {
  constructor(
    private usuarioRepository: UsuariosRepositoryInterface
  ) { }

  async execute(request: CreateUsuarioUseCaseRequest): Promise<CreateUsuarioUseCaseResponse> {
    const { nome, email, senha, avatar, casas } = request;

    // aqui você pode verificar se o e-mail já existe (recomendo fazer isso no repository depois)
    // Exemplo:
    // const userExists = await this.usuarioRepository.findByEmail(email);
    // if (userExists) throw new Error("Usuário já existe");

    const senha_hash = await hash(senha, 6);

    const userData: CriarUsuarioDTO = {
      nome,
      email,
      senha_hash,
      avatar,
      casas
    };

    await this.usuarioRepository.create(userData);

    return {
      user: {
        ...userData,
      } as Usuario
    };
  }
}
