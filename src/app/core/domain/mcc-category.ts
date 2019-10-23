import * as api from '../../api';

export class MccCategory {
  get title() {
    return this.category;
  }

  constructor(private category: api.MccCategory) {

  }
}
