import {CashbackCategoriesService, CashbackCategoryMccService, Product as ApiProduct, TariffsService} from '../../api';
import {Tariff} from './Tariff';
import {map} from 'rxjs/operators';

export class Product {
  get id() {
    return this.model.id;
  }

  get title() {
    return this.model.title;
  }

  constructor(private model: ApiProduct, private tariffsService: TariffsService, private categoriesService: CashbackCategoriesService, private cashbackMccService: CashbackCategoryMccService) {

  }

  getTariffs() {
    return this.tariffsService.getList(this.id).pipe(
      map(tariffs => tariffs.map(tariff => new Tariff(tariff, this.categoriesService, this.cashbackMccService)))
    );
  }
}
