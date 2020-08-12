import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bank } from 'src/app/api';

@Component({
  selector: 'app-edit-cashback-category-dialog',
  templateUrl: './edit-cashback-category-dialog.component.html',
  styleUrls: ['./edit-cashback-category-dialog.component.scss']
})
export class EditCashbackCategoryDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Bank) { }

  ngOnInit() {
  }

}
