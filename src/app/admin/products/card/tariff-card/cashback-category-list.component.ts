import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {
    CashbackCategoriesService,
    CashbackCategory,
    CashbackCategoryType,
    ProductTariff,
    ProductType,
    TariffsService
} from 'src/app/api';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {filter, switchMap, switchMapTo} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageDialogComponent} from 'src/app/shared/message-dialog/message-dialog.component';
import {MatSnackBar} from '@angular/material';
import {EditCashbackCategoryDialogComponent} from './dialogs/edit-cashback-category-dialog.component';
import {AddCashbackCategoryDialogComponent} from './dialogs/add-cashback-category-dialog.component';

@Component({
  selector: 'app-cashback-category-list',
  templateUrl: './cashback-category-list.component.html',
  styleUrls: ['./cashback-category-list.component.scss']
})
export class CashbackCategoryListComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource = new MatTableDataSource<CashbackCategory>();

  @Input('entities') set transactionsInput(value: CashbackCategory[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  @Input() cardEntityId: number;

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'actions'];
  loadingVisible = true;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cashbackCategoriesService: CashbackCategoriesService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor.bind(this);
  }

  sortingDataAccessor(item: CashbackCategory, property: string) {
    switch (property) {
      case 'title': {
        return item.title.toLowerCase();
      }

      default:
        return item[property];
    }
  }

  addNew() {
    const dialogRef = this.dialog.open(AddCashbackCategoryDialogComponent, {
      data: { tariffId: this.cardEntityId, type: CashbackCategoryType.IncreasedCashback}
    });

    dialogRef.afterClosed().pipe(
      filter(x => x),
      switchMap(item => this.cashbackCategoriesService.add(item))
    ).subscribe(
      value => {
        let data = this.dataSource.data;
        data.push(value);
        this.dataSource.data = data;
        this.snackBar.open('Категория добавлена', undefined, {duration: 5000, panelClass: ['background-green']});
      },
      error => this.snackBar.open('Не удалось добавить катекорию', undefined, {duration: 5000, panelClass: ['background-red']})
    );
  }

  editItem(item: CashbackCategory) {
    const dialogRef = this.dialog.open(EditCashbackCategoryDialogComponent, {
      data: {...item}
    });

    dialogRef.afterClosed().pipe(
      filter(x => x),
      switchMap(item => this.cashbackCategoriesService.update(item.id, item))
    ).subscribe(
      value => {
        this.dataSource.data = this.dataSource.data.map(x => x.id == value.id ? value : x);
        this.snackBar.open('Категория изменена', undefined, {duration: 5000, panelClass: ['background-green']});
      },
      error => this.snackBar.open('Не удалось изменить категорию', undefined, {duration: 5000, panelClass: ['background-red']})
    );
  }

  deleteItem(item: CashbackCategory) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {caption: 'Вы уверены что хотите удалить категорию?', text: item.title}
    });

    dialogRef.afterClosed().pipe(
      filter(x => x),
      switchMapTo(this.cashbackCategoriesService._delete(item.id))
    ).subscribe(
      value => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
        this.snackBar.open('Категория удалена', undefined, {duration: 5000, panelClass: ['background-green']});
      },
      error => this.snackBar.open('Не удалось удалить категорию', undefined, {duration: 5000, panelClass: ['background-red']})
    );
  }
}
