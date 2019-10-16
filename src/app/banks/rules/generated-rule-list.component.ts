import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Category, GeneratedRule, CategoriesService, AccountsService, BankAccount, Rule } from 'src/app/api';
import { map, filter, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddRuleDialogComponent } from './dialogs/add-rule-dialog.component';

@Component({
  selector: 'app-generated-rule-list',
  templateUrl: './generated-rule-list.component.html',
  styleUrls: ['./generated-rule-list.component.scss']
})
export class GeneratedRuleListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input('generatedRules') set generatedRulesInternal(value: GeneratedRule[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }
  @Input() generatedItemAdding: (item: Rule) => Observable<Rule>;

  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<GeneratedRule>();

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'mcc', 'bankCategory', 'description', 'category', 'count', 'actions'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
    this.dataSource.paginator = this.paginator;
  }

  sortingDataAccessor(rule: GeneratedRule, property: string) {
    switch (property) {
      case 'category': {
        if (rule.categories.length > 1)
          return '';

        let category = this.categories.get(rule.categories[0].categoryId);
        return category ? category.title : '';
      }
      case 'account': {
        if (!rule.accountId)
          return '';

        let account = this.accounts.get(rule.accountId);
        return account ? account.title : '';
      }

      default: return rule[property];
    }
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

  addRule_click(rule: GeneratedRule, categoryId: number) {
    const dialogRef = this.dialog.open(AddRuleDialogComponent, {
      data: { ...rule, categoryId }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap((result) => this.generatedItemAdding(result).pipe(filter(x => !!x))))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(value => !(value.accountId == rule.accountId &&
          value.bankCategory == rule.bankCategory && value.description == rule.description && value.mcc == rule.mcc));
      });
  }
}
