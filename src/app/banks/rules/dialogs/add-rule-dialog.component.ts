import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Rule, Category, CategoriesService, AccountsService, BankAccount} from 'src/app/api';
import {map} from 'rxjs/operators';
import {MccService} from '../../../core/mcc/mcc.service';
import {Mcc} from '../../../core/mcc/mcc';

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
              private mccService: MccService) {
  }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);

    this.mccService.getList().subscribe(x => this.mcc = x);
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
