import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from '../model/country';
import { CountryResponse } from '../model/country-response';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

export const countryUrl = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CountryService');
  }

  loadAllCountries(): Observable<Country[]> {
    return this.http.get(countryUrl).pipe(
      map((countries: CountryResponse[]) =>
        countries.map(
          (country) =>
            ({
              id: `${country.region}_${country.cioc}_${country.demonym}`,
              flag: country.flag,
              name: country.name,
              latlng: country.latlng,
              capital: country.capital,
              subregion: country.subregion,
              population: country.population,
            } as Country)
        )
      ),
      catchError(this.handleError('load', [] as Country[]))
    );
  }
}
