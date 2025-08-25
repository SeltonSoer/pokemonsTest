import { Component, input } from '@angular/core';
import { IPokemon } from '../../interfaces/pokemons.model';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss'
})
export class Pokemon {

  public readonly pokemons = input.required<IPokemon[] | null>()

}
