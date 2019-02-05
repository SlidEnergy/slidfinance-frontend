import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Bank } from 'src/app/api';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Bank) { }

  ngOnInit() {
  }

}
