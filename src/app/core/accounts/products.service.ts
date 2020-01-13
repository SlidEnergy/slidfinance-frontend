import {Injectable} from '@angular/core';
import {ApiContextService} from '../api-context.service';
import * as api from '../../api';
import {map} from 'rxjs/operators';
import {BankAccount, TariffsService} from '../../api';
import {Product} from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private context: ApiContextService,
              private tariffsService: TariffsService) {
  }

  getList() {
    return this.context.products.pipe(
      map(products => products.map(product => new Product(product, this.tariffsService)))
    );
  }
}
