import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankAccount } from 'src/app/api';

@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BankAccount) { }

  ngOnInit() {
  }
}