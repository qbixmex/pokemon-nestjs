import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities';
import { IPokemon } from '../interfaces';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<IPokemon> {

    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      
      return {
        id: pokemon._id as string,
        name: pokemon.name,
        no: pokemon.no,
        createdAt: pokemon.createdAt,
        updatedAt: pokemon.updatedAt,
      };

    } catch (error) {

      if (error.code === 11000) {
        const errorKey = JSON.stringify(error.keyValue); 
        throw new BadRequestException(`Duplication Error: '${errorKey}' already exists!`);
      }

      console.log(error);

      throw new InternalServerErrorException('Something went wrong, check server logs');

    }    

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
