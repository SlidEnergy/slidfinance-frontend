import { Injectable } from '@angular/core';
import {ApiContextService} from "../api-context.service";
import * as api from "../../api";
import {map} from "rxjs/operators";
import {BankAccount} from "../../api";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private context: ApiContextService,
              private api: api.AccountsService) { }

  getList() {
    return this.context.accounts;
  }

  getById(id: number) {
    return this.context.accounts.pipe(map(entities=> entities.find(entity => entity.id == id)));
  }

  delete(id: number) {
    return this.api._delete(id);
  }

  add(bank: BankAccount) {
    return this.api.add(bank);
  }

  update(id: number, bank: BankAccount) {
    return this.api.update(id, bank);
  }

}
