import {Component, OnInit} from '@angular/core';
import {Product, ProductsService} from 'src/app/api';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Observable<Product[]>;

  constructor(
    private router: Router,
    private productsService: ProductsService,
  ) {
  }

  ngOnInit() {
    this.products = this.productsService.getList();
  }
}
