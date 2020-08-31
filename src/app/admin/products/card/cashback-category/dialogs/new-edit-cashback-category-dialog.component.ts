import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bank } from 'src/app/api';

@Component({
  selector: 'app-edit-cashback-category-dialog',
  templateUrl: './new-edit-cashback-category-dialog.component.html',
  styleUrls: ['./new-edit-cashback-category-dialog.component.scss']
})
export class NewEditCashbackCategoryDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Bank) { }

  ngOnInit() {
  }

}
