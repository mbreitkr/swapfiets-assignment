import { Component, effect, input, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-bike-search-input",
  imports: [ReactiveFormsModule],
  templateUrl: "./bike-search-input.component.html",
  styleUrl: "./bike-search-input.component.scss",
})
export class BikeSearchInputComponent {
  isLoading = input(false);
  searchSubmit = output<string>();

  searchForm = new FormGroup({
    city: new FormControl("", Validators.required),
  });

  constructor() {
    effect(() => {
      const isLoading = this.isLoading();
      if (!isLoading) {
        this.searchForm.enable();
      } else {
        this.searchForm.disable();
      }
    });
  }

  onSubmit(): void {
    const city = this.searchForm.value.city;
    if (city === undefined || city === null || city === "") return;

    if (this.searchForm.valid) this.searchSubmit.emit(city);
  }
}
