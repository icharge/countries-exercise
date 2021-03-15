import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './model/country';
import { CountryService } from './service/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'countries';

  countriesSub: Subscription;
  countries: Country[];
  filtered$: Observable<Country[]>;
  private searchText$ = new Subject<string>();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countriesSub = this.countryService
      .loadAllCountries()
      .subscribe((countries) => {
        this.countries = countries;
        this.filtered$ = of(countries);
      });

    this.filtered$ = this.searchText$.pipe(
      map((search) => this.countries.filter((c) => c.name === search))
    );
  }

  ngOnDestroy(): void {
    this.countriesSub?.unsubscribe();
  }
}
