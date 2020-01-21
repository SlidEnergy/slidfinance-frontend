import {Component, OnInit} from '@angular/core';
import {Product, ProductsService} from 'src/app/api';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, catchError, filter, startWith} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Observable<Product[]>;
  isProductSelected: Observable<boolean>;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {
    this.isProductSelected = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      startWith({url: this.router.url}),
      map(event => event.url != '/products')
    );
  }

  ngOnInit() {
    this.products = this.productsService.getList();
  }
}
