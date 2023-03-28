import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';

import { ParseMongoIdPipe } from '../common/pipes';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  async findOne(@Param('term') term: string): Promise<Pokemon> {
    return await this.pokemonService.findOne(term);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPokemonDto: CreatePokemonDto
  ): Promise<Pokemon> { 
    return await this.pokemonService.create(createPokemonDto);
  }

  @Patch(':term')
  async update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return await this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id') 
  async remove(
    @Param('id', ParseMongoIdPipe) id: string
  ): Promise<{ message: string }> {
    return await this.pokemonService.remove(id);
  }
}
