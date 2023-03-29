import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async findAll(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonModel.find().lean().select('-__v');
    return pokemons.map(pokemon => {
      const { _id, ...rest } = pokemon;
      return { id: _id, ...rest };
    }) as Pokemon[];
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

      return {
        id: pokemon._id,
        name: pokemon.name,
        no: pokemon.no,
        createdAt: pokemon.createdAt,
        updatedAt: pokemon.updatedAt,
      } as Pokemon;

    } catch (error) {
      this.handleExceptions(error);
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

    try {

      await pokemon.updateOne(updatePokemonDto);

      const updatedPokemon = await this.findOne(term);

      return {
        id: updatedPokemon._id,
        name: updatedPokemon.name,
        no: updatedPokemon.no,
        createdAt: updatedPokemon.createdAt,
        updatedAt: updatedPokemon.updatedAt,
      } as Pokemon;

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove( id: string ): Promise<{ message: string }> {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id '${ id } not found!'`);
    }

    return {
      message: `Pokemon deleted successfully`
    };

  }

  private handleExceptions( error: any ) {
    if (error.code === 11000) {
      const errorKey = JSON.stringify(error.keyValue); 
      throw new BadRequestException(`Duplication Error: '${errorKey}' already exists!`);
    }

    console.log(error);

    throw new InternalServerErrorException('Something went wrong, check server logs');
  }
}
