import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.categories = this.categoriesService.getList();
  }

  addItem = (item: Category) => {
    return this.categoriesService.add(item).pipe(
      map((result) => {
        this.snackBar.open('Категория добавлена', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось добавить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: Category, moveCategoryId?: number) => {
    return this.categoriesService._delete(item.id, moveCategoryId).pipe(
      map(() => {
        this.snackBar.open('Категория удалена', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось удалить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: Category) => {
    return this.categoriesService.update(item.id, item).pipe(
      map((result) => {
        this.snackBar.open('Категория обновлена', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось обновить категорию', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
