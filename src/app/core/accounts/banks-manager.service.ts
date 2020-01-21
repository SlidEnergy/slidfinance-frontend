import { Injectable } from '@angular/core';
import {ApiContextService} from "../api-context.service";
import * as api from "../../api";
import {map} from "rxjs/operators";
import {BankAccount} from "../../api";

@Injectable({
  providedIn: 'root'
})
export class BanksManagerService {

  constructor(private context: ApiContextService,
              private api: api.AccountsService) { }

  getList() {
    return this.context.banks;
  }

  getById(id: number) {
    return this.context.banks.pipe(map(entities=> entities.find(entity => entity.id == id)));
  }
}
