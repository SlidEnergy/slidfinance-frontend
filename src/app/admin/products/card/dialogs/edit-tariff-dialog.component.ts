import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bank } from 'src/app/api';

@Component({
  selector: 'app-edit-tariff-dialog',
  templateUrl: './edit-tariff-dialog.component.html',
  styleUrls: ['./edit-tariff-dialog.component.scss']
})
export class EditTariffDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Bank) { }

  ngOnInit() {
  }

}
