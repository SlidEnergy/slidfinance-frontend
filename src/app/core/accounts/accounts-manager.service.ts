import { Injectable } from '@angular/core';
import {ApiContextService} from "../api-context.service";
import * as api from "../../api";
import {map} from "rxjs/operators";
import {BankAccount} from "../../api";

@Injectable({
  providedIn: 'root'
})
export class AccountsManagerService {

  constructor(private context: ApiContextService,
              private api: api.AccountsService) { }

  getList() {
    return this.context.accounts;
  }

  getById(id: number) {
    return this.context.accounts.pipe(map(entities=> entities.find(entity => entity.id == id)));
  }
}
