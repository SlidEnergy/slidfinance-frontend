import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Transaction } from 'src/app/api';

@Component({
  selector: 'app-transaction-list-dialog',
  templateUrl: './transaction-list-dialog.component.html',
  styleUrls: ['./transaction-list-dialog.component.scss']
})
export class TransactionListDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Transaction[]) { }

  ngOnInit() {
  }

}
