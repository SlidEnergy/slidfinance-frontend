import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from 'src/app/api';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
        this.snackBar.open('Банк привязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось привязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: Category) => {
    return this.categoriesService.delete(item.id).pipe(
      map(() => {
        this.snackBar.open('Банк отвязан', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось отвязать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: Category) => {
    return this.categoriesService.update(item.id, item).pipe(
      map(() => {
        this.snackBar.open('Банк переименован', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось переименовать банк', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}