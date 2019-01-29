import { Component, OnInit, Inject } from '@angular/core';
import { Category, CategoriesService } from 'src/app/api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit {

  categories: Map<string, Category>;
  accounts: Map<string, Account>;

  constructor(public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category,
              private categoriesService: CategoriesService) {}

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  getAccountsArray() {
    return this.accounts && Array.from(this.accounts.values());
  }

  getCategoriesArray() {
    return this.categories && Array.from(this.categories.values());
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.categoriesService.addCategory(this.data).subscribe(x=>x);
  }
}
