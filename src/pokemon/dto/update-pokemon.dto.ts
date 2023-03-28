import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreatePokemonDto } from '.';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
  updatedAt?: number;
}
