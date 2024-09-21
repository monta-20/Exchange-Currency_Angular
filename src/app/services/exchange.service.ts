import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  
  private apiUrl : string =`https://data.fixer.io/api/latest?access_key=${environment.API_KYE}&format=1`;
  constructor(private _http : HttpClient) { }

  getConversionRates() :Observable<any>{
    return this._http.get<any>(this.apiUrl)
  }
}
