import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Bank } from 'src/app/api';

@Component({
  selector: 'app-edit-bank-dialog',
  templateUrl: './edit-bank-dialog.component.html',
  styleUrls: ['./edit-bank-dialog.component.scss']
})
export class EditBankDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Bank) { }

  ngOnInit() {
  }

}
