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

  countries$: Subscription;
  countries: Country[];
  filtered: Country[];
  private searchText$ = new Subject<string>();

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countries$ = this.countryService
      .loadAllCountries()
      .subscribe((countries) => {
        this.countries = countries;
        this.filtered = countries;
      });

    /* this.filtered$ = this.searchText$.pipe(
      map((search) => this.countries.filter((c) => c.name === search))
    ); */
    this.searchText$.subscribe((search) => {
      this.filtered = this.countries.filter(
        (c) => `${c.name}`.toLowerCase().indexOf(`${search}`.toLowerCase()) >= 0
      );
    });
  }

  ngOnDestroy(): void {
    this.countries$?.unsubscribe();
    this.searchText$?.unsubscribe();
  }

  search(e: any): void {
    const { value } = e.target;
    console.debug('search key up ' + value);
    this.searchText$.next(value);
  }
}
