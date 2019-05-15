import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RulesService, Rule, Category, CategoriesService, AccountsService, BankAccount } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-rule-dialog',
  templateUrl: './add-rule-dialog.component.html',
  styleUrls: ['./add-rule-dialog.component.scss']
})

export class AddRuleDialogComponent implements OnInit {
  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  constructor(public dialogRef: MatDialogRef<AddRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rule,
    public rulesService: RulesService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private snackBar: MatSnackBar) { }

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

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.rulesService.add(this.data)
      .subscribe(() => {
        this.snackBar.open('Правило добавлено', undefined, { duration: 5000, panelClass: ['background-green'] });
      }, () => {
        this.snackBar.open('Не удалось добавить правило', undefined, { duration: 5000, panelClass: ['background-red'] });
      });
  }
}