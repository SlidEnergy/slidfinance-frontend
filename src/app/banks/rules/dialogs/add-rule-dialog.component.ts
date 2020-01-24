import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Rule, Category, CategoriesService, AccountsService, BankAccount, Mcc} from 'src/app/api';
import {map} from 'rxjs/operators';
import {AppEntityServicesService} from '../../../core/store/entity/app-entity-services.service';

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.scss']
})

export class AddRuleDialogComponent implements OnInit {
  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;
  mcc: Mcc[];

  constructor(public dialogRef: MatDialogRef<AddRuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Rule,
              private categoriesService: CategoriesService,
              private accountsService: AccountsService,
              private dataContext: AppEntityServicesService) {
  }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);

    this.dataContext.mcc.getListLazy().subscribe(x => this.mcc = x);
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  getAccountsArray() {
    return this.accounts && Array.from(this.accounts.values());
  }

  getCategoriesArray() {
    return this.categories && Array.from(this.categories.values());
  }

  getMccArray() {
    return this.mcc;
  }
}
