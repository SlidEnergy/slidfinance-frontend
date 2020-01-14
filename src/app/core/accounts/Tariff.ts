import {CashbackCategoriesService, CashbackCategoryMccService, ProductTariff as ApiTariff} from '../../api';
import {CashbackCategory} from './CashbackCategory';
import {map} from 'rxjs/operators';

export class Tariff {
  get id() {
    return this.model.id;
  }

  get title() {
    return this.model.title;
  }

  constructor(private model: ApiTariff, private categoriesService: CashbackCategoriesService, private cashbackMccService: CashbackCategoryMccService) {

  }

  getCategories() {
    return this.categoriesService.getList(this.id).pipe(
      map(categories => categories.map(category => new CashbackCategory(category, this.cashbackMccService)))
    );
  }
}
