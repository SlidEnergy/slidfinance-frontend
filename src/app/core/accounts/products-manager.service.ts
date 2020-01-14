import {Injectable} from '@angular/core';
import {ApiContextService} from '../api-context.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagerService {

  constructor(private context: ApiContextService) {
  }

  getList() {
    return this.context.products;
  }
}
