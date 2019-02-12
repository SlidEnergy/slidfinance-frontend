import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RulesService, Rule, Category, CategoriesService, AccountsService } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.scss']
})

export class AddRuleDialogComponent implements OnInit {
  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  constructor(public dialogRef: MatDialogRef<AddRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rule,
    public rulesService: RulesService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Account])))).subscribe(data => this.accounts = data);
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

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.rulesService.postRule(this.data).subscribe(x => x);
  }
}