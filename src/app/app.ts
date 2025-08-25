import { Component, WritableSignal } from '@angular/core';
import { Pokemon } from '../components/pokemon/pokemon';
import { IPokemon } from '../interfaces/pokemons.model';
import { FilterPokemonByType } from '../components/filter-pokemon-by-type/filter-pokemon-by-type';
import { PokemonUtilService } from '../services/util.service';

@Component({
  selector: 'app-root',
  imports: [Pokemon, FilterPokemonByType],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [PokemonUtilService],
})
export class App {

  public possibleTypes!: string[];
  public pokemons!: WritableSignal<IPokemon[]>;

  // inject убрал, потому как провайдить лучше в конструкторе,
  // если от класса не наследуемся
  constructor(
    private readonly _pokemonService: PokemonUtilService
  ) {
    this.possibleTypes = this._pokemonService._getPossibleTypes
    this.pokemons = this._pokemonService.pokemonsEditable
  }

  public filterByTypes(pokemonTypes: string[]): void {
    this._pokemonService.filterByTypes(pokemonTypes);
  }

}
