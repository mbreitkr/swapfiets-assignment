import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { BikeColor } from "../../interfaces/bike.model";
import { BikesApiService } from "../../services/bikes-api.service";
import { BikeSearchFormValues } from "../../interfaces/bike-search-form.model";

interface BikeSearchForm {
  city: FormControl<string>;
  color: FormControl<string>;
}

@Component({
  selector: "app-bike-search-input",
  imports: [ReactiveFormsModule],
  templateUrl: "./bike-search-input.component.html",
  styleUrl: "./bike-search-input.component.scss",
})
export class BikeSearchInputComponent implements OnInit {
  isLoading = input(false);
  searchSubmit = output<BikeSearchFormValues>();

  colors = signal<BikeColor[] | undefined>(undefined);

  private bikeApi = inject(BikesApiService);

  searchForm = new FormGroup<BikeSearchForm>({
    city: new FormControl("", {
      validators: Validators.required,
      nonNullable: true,
    }),
    color: new FormControl("", { nonNullable: true }),
  });

  ngOnInit(): void {
    this.bikeApi.getBikeColors().subscribe((c) => {
      this.colors.set(c);
    });
  }

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
    const formValues = this.searchForm.value as BikeSearchFormValues;
    if (this.searchForm.valid) this.searchSubmit.emit(formValues);
  }
}
