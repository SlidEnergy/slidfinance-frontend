import {Injectable} from '@angular/core';
import {ApiContextService} from '../api-context.service';
import * as api from '../../api';
import {map} from 'rxjs/operators';
import {BankAccount, CashbackCategoriesService, CashbackCategoryMccService, TariffsService} from '../../api';
import {Product} from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private context: ApiContextService,
              private tariffsService: TariffsService,
              private categoriesService: CashbackCategoriesService,
              private cashbackMccService: CashbackCategoryMccService) {
  }

  getList() {
    return this.context.products.pipe(
      map(products => products.map(product => new Product(product, this.tariffsService, this.categoriesService, this.cashbackMccService)))
    );
  }
}
