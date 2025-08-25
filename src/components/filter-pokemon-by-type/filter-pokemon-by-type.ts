import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-filter-pokemon-by-type',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './filter-pokemon-by-type.html',
  styleUrl: './filter-pokemon-by-type.scss'
})
export class FilterPokemonByType implements OnInit {

  readonly pokemonTypes = input.required<string[]>()
  readonly outputTypes = output<string[]>()

  public form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  public ngOnInit() {
    this.form = this._fb.group({})

    this.pokemonTypes().forEach((type: string) => {
      this.form.addControl(type, new FormControl(false))
    })

    // Отписка не нужна, т.к нет других страниц
    this.form.valueChanges
      .pipe(
        tap((values) => {
          const types = Object.keys(values).filter((k) => {
            return values[k]
          })
          this.outputTypes.emit(types)
        }),
      )
      .subscribe()
  }

}
