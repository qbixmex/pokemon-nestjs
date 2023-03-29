export interface PokeResponse {
  count:    number;
  next:     string;
  previous: null;
  results:  TinyPokemon[];
}

export interface TinyPokemon {
  name: string;
  url:  string;
}
