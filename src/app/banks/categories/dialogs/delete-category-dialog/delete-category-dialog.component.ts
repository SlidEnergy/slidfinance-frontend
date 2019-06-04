import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService, Category } from 'src/app/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent implements OnInit {
  categories: Map<number, Category>;
  moveCategoryId: number;

  constructor(public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
  }

  confirmDelete(): void {
    this.dialogRef.close({ moveCategoryId: this.moveCategoryId });
  }

  getCategoryTitle(categoryId: number) {
    if (!this.categories)
      return '';

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }

  getCategoriesArray() {
    return this.categories && Array.from(this.categories.values());
  }
}
