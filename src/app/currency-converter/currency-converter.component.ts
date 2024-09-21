import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
   conversionRates: any = {} ;
   currencies:string[] = [];
   amount=1;
   fromCurrency: string = 'EUR'; // Default 'from' currency
   toCurrency: string = 'TND'; // Default 'to' currency
   convertedAmount: number | null = null; // Result of conversion

  constructor(private _serv:ExchangeService) { 
  }
  ngOnInit(): void {
    this.fetchConversionRates();
  }

  fetchConversionRates() {
    this._serv.getConversionRates().subscribe(
      (response) => {
        console.log('API Response:', response); // Debug log
        if (response.success) { // Check for the correct key
          this.conversionRates = response.rates; // Update this line
          this.currencies = Object.keys(this.conversionRates); // Extract currency codes
          console.log('Currencies:', this.currencies); // Debug log
          // Set default currencies if needed
         
        } else {
          console.error('Error fetching conversion rates', response.error);
        }
      },
      (error) => {
        console.error('Error fetching conversion rates', error);
      }
    );
  }

  convertCurrency() {
    if (this.conversionRates[this.fromCurrency] && this.conversionRates[this.toCurrency]) {
        const fromRate = this.conversionRates[this.fromCurrency];
        const toRate = this.conversionRates[this.toCurrency];
        console.log('From Rate:', fromRate, 'To Rate:', toRate);
        this.convertedAmount = (this.amount / fromRate) * toRate;
        console.log('Converted Amount:', this.convertedAmount);
    } else {
        console.error('Invalid currency selected');
    }
}

  
  

  

}
