import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Category } from 'src/app/api';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditCategoryDialogComponent } from './dialogs/edit-category-dialog.component';
import { AddCategoryDialogComponent } from './dialogs/add-category-dialog.component';
import { filter, flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from 'src/app/shared/message-dialog/message-dialog.component';
import { DeleteCategoryDialogComponent } from './dialogs/delete-category-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() itemAdding: (item: Category) => Observable<any>;
  @Input() itemDeleting: (item: Category, moveCategoryId?: number) => Observable<boolean>;
  @Input() itemChanging: (item: Category) => Observable<Category>;

  @Input('categories') set generatedRulesInternal(value: Category[]) {
    if (value) {
      this.loadingVisible = false;
      this.dataSource.data = value;
    }
  }

  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  // список транзакций пользователя
  dataSource = new MatTableDataSource<Category>();

  // Список колонок, которые нужно показать в таблице
  columnsToDisplay = ['title', 'actions'];
  loadingVisible = true;

  constructor(
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addNew() {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemAdding(result).pipe(filter(x => x))))
      .subscribe(result => {
        let data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      });
  }

  editItem(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: { ...category }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap(result => this.itemChanging(result).pipe(filter(x => !!x))))
      .subscribe((result) => {
        this.dataSource.data = this.dataSource.data.map((value) => value.id == result.id ? result : value);
      });
  }

  deleteItem(item: Category) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, {
      data: { ...item }
    });

    dialogRef.afterClosed().pipe(filter(x => x), flatMap((result) => this.itemDeleting(item, result.moveCategoryId).pipe(filter(x => x))))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((value) => value.id != item.id);
      });
  }
}
