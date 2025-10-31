import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { TemaService } from '../../tema/services/tema.service';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
    private temaService: TemaService,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: { tema: true, usuario: true },
    });
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: { tema: true, usuario: true },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    const onTitulo = await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: { tema: true, usuario: true },
    });

    if (onTitulo.length === 0)
      throw new HttpException('Titulos não encontrado', HttpStatus.BAD_REQUEST);

    return onTitulo;
  }

  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);

    return await this.postagemRepository.save(postagem);
  }

  async update(id: number, newPostagem: Postagem): Promise<Postagem> {
    await this.findById(id);

    await this.temaService.findById(newPostagem.tema.id);

    return await this.postagemRepository.save(newPostagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    const deletePost = await this.postagemRepository.delete(id);

    if (!id)
      throw new HttpException('id não informado', HttpStatus.BAD_REQUEST);

    return deletePost;
  }
}
