import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BanksService, Product, ProductTariff} from 'src/app/api';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-tariff-dialog',
  templateUrl: './add-tariff-dialog.component.html',
  styleUrls: ['./add-tariff-dialog.component.scss']
})
export class AddTariffDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductTariff) {
  }

  ngOnInit() {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }
}
