import {Product as ApiProduct, TariffsService} from '../../api';

export class Product {
  get id() {
    return this.model.id;
  }

  get title() {
    return this.model.title;
  }

  constructor(private model: ApiProduct, private tariffsService: TariffsService) {

  }

  getTariffs() {
    return this.tariffsService.getList(this.id);
  }
}
