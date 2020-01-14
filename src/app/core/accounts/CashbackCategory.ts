import {CashbackCategoriesService, CashbackCategoryMcc, CashbackCategoryMccService, CashbackCategory as ApiCategory} from '../../api';

export class CashbackCategory {
  get id() {
    return this.model.id;
  }

  get title() {
    return this.model.title;
  }

  constructor(private model: ApiCategory, private cashbackMccService: CashbackCategoryMccService) {

  }

  addMcc(cashbackMcc: CashbackCategoryMcc) {
    return this.cashbackMccService.add(this.id.toString(), cashbackMcc);
  }
}
