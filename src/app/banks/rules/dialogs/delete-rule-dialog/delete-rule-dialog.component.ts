import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RulesService, CategoriesService, AccountsService, Category, BankAccount } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-rule-dialog',
  templateUrl: './delete-rule-dialog.component.html',
  styleUrls: ['./delete-rule-dialog.component.scss']
})
export class DeleteRuleDialogComponent implements OnInit {
  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  constructor(public dialogRef: MatDialogRef<DeleteRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rulesService: RulesService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.rulesService.deleteRule(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Правило удалено', undefined, { duration: 5000, panelClass: ['background-green'] });
      }, () => {
        this.snackBar.open('Не удалось удалить правило', undefined, { duration: 5000, panelClass: ['background-red'] });
      });
  }

  getAccountTitle(accountId: number) {
    if (!this.accounts)
      return '';

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoryTitle(categoryId: number) {
    if (!this.categories)
      return '';

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }
}
