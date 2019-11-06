import * as api from '../../api';

export class Mcc {
  model: api.Mcc;

  get code() {
    return this.model.code;
  }

  get title() : string {
    return this.model.ruTitle || this.model.title;
  }

  get category() {
    return this.model.category;
  }

  constructor(mcc: api.Mcc) {
    this.model = mcc;
  }
}