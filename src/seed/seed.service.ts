import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';

import { Pokemon } from '../pokemon/entities';
import { PokeResponse } from '../interfaces';
import { PokemonService } from '../pokemon/pokemon.service';

type SmallPokemon = {
  name: string;
  no: number;
};

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async seed() {

    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsToInsert: SmallPokemon[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return { message: 'Pokemons Seed' };
  }
}
