import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from '../pokemon/entities';
import { PokeResponse } from '../interfaces';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

type SmallPokemon = {
  name: string;
  no: number;
};

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async seed() {

    await this.pokemonModel.deleteMany({});

    const { results } = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsToInsert: SmallPokemon[] = [];

    results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return { message: 'Pokemons Seed' };
  }
}
