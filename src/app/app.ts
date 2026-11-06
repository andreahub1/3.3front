import { Component } from '@angular/core';
import { ProductSearch } from './product-search/product-search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
