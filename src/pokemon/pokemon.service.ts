import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { IPokemon } from 'src/interfaces';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().lean().select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {

    let pokemon: Pokemon;

    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: term })
        .select('-__v');
    }

    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById( term )
      .select('-__v');
    }

    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
      .select('-__v');
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or no: '${term}' not found!`);
    }

    return pokemon;

  }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {

    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);

      const doc = await this.pokemonModel.findOne({ _id: pokemon.id })
        .lean()
        .select('-__v');

      return doc;

    } catch (error) {

      if (error.code === 11000) {
        const errorKey = JSON.stringify(error.keyValue); 
        throw new BadRequestException(`Duplication Error: '${errorKey}' already exists!`);
      }

      console.log(error);

      throw new InternalServerErrorException('Something went wrong, check server logs');

    }    

  }

  async update(
    term: string,
    updatePokemonDto: UpdatePokemonDto
  ): Promise<Pokemon> {

    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    const pokemon = await this.findOne(term);

    await pokemon.updateOne(updatePokemonDto);

    const updatedPokemon = await this.findOne(term);

    return {
      id: updatedPokemon._id,
      name: updatedPokemon.name,
      no: updatedPokemon.no,
      createdAt: updatedPokemon.createdAt,
      updatedAt: updatedPokemon.updatedAt,
    } as Pokemon;

  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
