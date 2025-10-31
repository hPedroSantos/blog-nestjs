import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tema } from '../entities/tema.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema) private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({ relations: { postagem: true } });
  }

  async findById(id: number): Promise<Tema> {
    const byId = await this.temaRepository.findOne({
      where: { id },
      relations: {
        postagem: true,
      },
    });

    if (!byId)
      throw new HttpException('Tema não encontrado!', HttpStatus.BAD_REQUEST);

    return byId;
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: { postagem: true },
    });
  }

  async create(tema: Tema): Promise<Tema> {
    return await this.temaRepository.save(tema);
  }

  async update(newTema: Tema): Promise<Tema> {
    return await this.temaRepository.save(newTema);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.temaRepository.delete(id);
  }
}
