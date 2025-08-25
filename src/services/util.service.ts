import { Injectable, signal } from '@angular/core';
import { IPokemon } from '../interfaces/pokemons.model';

@Injectable()
export class PokemonUtilService {

  public readonly pokemonsEditable = signal<IPokemon[]>([]);
  private readonly _pokemonsOriginal = signal<IPokemon[]>([]);

  private readonly _possibleTypes: string[] = ['grass', 'water', 'fire', 'electric', 'fighting'];
  private readonly _pokemonNames: string[] = ['Bulbasaur', 'Pika', 'Goomy', 'Seviper', 'Rattata'];
  private readonly _possibleSprites: string[] = [
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/323.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/726.png',
    'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'
  ];

  constructor() {
    this._generatePokemon()
  }

  public get _getPossibleTypes(): string[] {
    return this._possibleTypes;
  }

  // Фильтрация по типу
  public filterByTypes(pokemonTypes: string[]): void {
    // Если не нажаты чекбоксы, то заполняем оригинальным массивом
    if (pokemonTypes.length === 0) {
      this.pokemonsEditable.set(this._pokemonsOriginal())
      return;
    }
    const filtersPokemonByTypes = this._pokemonsOriginal().filter((pokemon: IPokemon): boolean => {
      return pokemonTypes.includes(pokemon.type);
    })
    this.pokemonsEditable.set(filtersPokemonByTypes);
  }

  private _generatePokemon(): void {
    let pokemons: IPokemon[] = []
    for (let i = 0; i < 10; i++) {
      pokemons.push({
        id: i + 1,
        name: this._utilFunc(this._pokemonNames),
        type: this._utilFunc(this._possibleTypes),
        sprite: this._utilFunc(this._possibleSprites)
      })
    }
    this._pokemonsOriginal.set(pokemons)
    this.pokemonsEditable.set(pokemons)
  }

  private _utilFunc(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)]
  }


}
