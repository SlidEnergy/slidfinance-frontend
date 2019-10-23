import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RulesService, Rule, Category, CategoriesService, AccountsService, BankAccount } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-rule-dialog',
  templateUrl: './edit-rule-dialog.component.html',
  styleUrls: ['./edit-rule-dialog.component.scss']
})
export class EditRuleDialogComponent implements OnInit {
  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  constructor(public dialogRef: MatDialogRef<EditRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rule,
    public rulesService: RulesService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
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
}
