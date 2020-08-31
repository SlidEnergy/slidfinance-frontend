import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AccountsService, CategoriesService, Rule, Category, BankAccount, Mcc} from 'src/app/api';
import { map, filter, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddRuleDialogComponent } from './dialogs/add-rule-dialog.component';
import { DeleteRuleDialogComponent } from './dialogs/delete-rule-dialog.component';
import { EditRuleDialogComponent } from './dialogs/edit-rule-dialog.component';
import {EntityDataContextService} from '../../core/entity/entity-data-context.service';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input('rules') set generatedRulesInternal(value: Rule[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }
  @Input() itemAdding: (item: Rule) => Observable<Rule>;
  @Input() itemDeleting: (item: Rule) => Observable<boolean>;
  @Input() itemChanging: (item: Rule) => Observable<Rule>;

  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Rule>();

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'mcc', 'bankCategory', 'description', 'category', 'actions'];
  loadingVisible = true;

  mcc: Mcc[];

  constructor(
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private accountsService: AccountsService,
    private dataContext: EntityDataContextService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;

    this.dataContext.mcc.getListLazy().subscribe(x => this.mcc = x);
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

  getMccCodeById(id: number) {
    if(!this.mcc)
      return;

    let mcc = this.mcc.find(x => x.id == id);
    if(!mcc)
      return;

    return mcc.code;
  }

  addNew() {
    const dialogRef = this.dialog.open(AddRuleDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemAdding(result).pipe(filter(x => !!x))))
      .subscribe(rule => {
        // this.dataSource.data = this.dataSource.data.filter(value => value.accountId != rule.accountId &&
        //   value.bankCategory != rule.bankCategory && value.description != rule.description && value.mcc != rule.mcc);
      });
  }

  editItem(item: Rule) {
    const dialogRef = this.dialog.open(EditRuleDialogComponent, {
      data: { ...item }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemChanging(result).pipe(filter(x => !!x))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
      });
  }

  deleteItem(item: Rule) {
    const dialogRef = this.dialog.open(DeleteRuleDialogComponent, {
      data: item
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(() => this.itemDeleting(item).pipe(filter(x => x))))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
      });
  }
}
