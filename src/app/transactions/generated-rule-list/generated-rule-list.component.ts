import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { Category, GeneratedRule, CategoriesService, AccountsService, Account, Rule } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-generated-rule-list',
  templateUrl: './generated-rule-list.component.html',
  styleUrls: ['./generated-rule-list.component.scss']
})
export class GeneratedRuleListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input('generatedRules') set generatedRulesInternal(value: GeneratedRule[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }
  @Output() addClick = new EventEmitter<{rule: GeneratedRule, categoryId: string}>();

  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<GeneratedRule>();

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'mcc', 'bankCategory', 'description', 'category', 'count', 'actions'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.categoriesService.getCategory().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getAccounts().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Account])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  addRule_click(rule: GeneratedRule, categoryId: string) {
    this.addClick.emit({rule, categoryId});
  }
}
