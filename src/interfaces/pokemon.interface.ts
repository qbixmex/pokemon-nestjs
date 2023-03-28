import { Pokemon } from '../pokemon/entities';

export interface IPokemon {
  id: string;
  name: string;
  no: number;
  createdAt: number;
  updatedAt: number;
}