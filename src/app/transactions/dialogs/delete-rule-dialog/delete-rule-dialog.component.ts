import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RulesService, CategoriesService, AccountsService, Category, Account } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-rule-dialog',
  templateUrl: './delete-rule-dialog.component.html',
  styleUrls: ['./delete-rule-dialog.component.scss']
})
export class DeleteRuleDialogComponent implements OnInit {
  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  constructor(public dialogRef: MatDialogRef<DeleteRuleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rulesService: RulesService,
    private categoriesService: CategoriesService,
    private accountsService: AccountsService) { }

    ngOnInit() {
    this.categoriesService.getCategory().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getAccounts().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Account])))).subscribe(data => this.accounts = data);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.rulesService.deleteRule(this.data.id).subscribe(x=>x);
  }

  getAccountTitle(accountId: string) {
    if (!this.accounts)
      return '';

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoryTitle(categoryId: string) {
    if (!this.categories)
      return '';

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }
}
