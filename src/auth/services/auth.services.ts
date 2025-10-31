import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Usuario | null> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword: boolean = await this.bcrypt.compararSenhas(
      password,
      buscaUsuario.senha,
    );

    if (!matchPassword)
      throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...usuarioSemSenha } = buscaUsuario;
    return usuarioSemSenha as Usuario;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const usuarioValido = await this.validateUser(
      usuarioLogin.usuario,
      usuarioLogin.senha,
    );

    if (!usuarioValido)
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: usuarioValido.id,
      username: usuarioValido.usuario,
    };

    return {
      id: usuarioValido.id,
      nome: usuarioValido.nome,
      usuario: usuarioValido.usuario,
      senha: '',
      foto: usuarioValido.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
