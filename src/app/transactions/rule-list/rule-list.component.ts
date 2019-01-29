import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { AccountsService, CategoriesService, Rule, Category, Account } from 'src/app/api';
import { map } from 'rxjs/operators';
import { DeleteRuleDialogComponent } from '../dialogs/delete-rule-dialog/delete-rule-dialog.component';
import { EditRuleDialogComponent } from '../dialogs/edit-rule-dialog/edit-rule-dialog.component';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  @Input('rules') set generatedRulesInternal(value: Rule[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Rule>();

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['account', 'mcc', 'bankCategory', 'description', 'category', 'actions'];
  loadingVisible = true;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private accountsService: AccountsService) { }

  ngOnInit() {
    this.categoriesService.getCategory().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getAccounts().pipe(map(x => new Map(x.map(i => [i.id, i] as [string, Account])))).subscribe(data => this.accounts = data);
    this.dataSource.sort = this.sort;
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

  startEdit(i: number, rule: Rule) {
    // this.id = id;
    // // index row is used just for debugging proposes and can be removed
    // this.index = i;
    // console.log(this.index);
    const dialogRef = this.dialog.open(EditRuleDialogComponent, {
      data: rule
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  deleteItem(i: number, rule: Rule) {
    // this.index = i;
    // this.id = id;
    const dialogRef = this.dialog.open(DeleteRuleDialogComponent, {
      data: rule
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }

}
