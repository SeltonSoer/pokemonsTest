import { Component, inject, WritableSignal } from '@angular/core';
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
  private readonly _pokemonsService = inject(PokemonUtilService)

  constructor() {
    this.possibleTypes = this._pokemonsService._getPossibleTypes
    this.pokemons = this._pokemonsService.pokemonsEditable
  }

  public filterByTypes(pokemonTypes: string[]): void {
    this._pokemonsService.filterByTypes(pokemonTypes);
  }

}
