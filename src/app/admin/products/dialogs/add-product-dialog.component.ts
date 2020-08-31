import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bank, BanksService, Product} from 'src/app/api';
import {map} from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import {EntityDataContextService} from '../../../core/entity/entity-data-context.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  banks: Map<number, Bank>;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: Product,
      private dataContext: EntityDataContextService) {
  }

  ngOnInit() {
    this.dataContext.banks.getListLazy().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Bank])))).subscribe(data => this.banks = data);
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  getBanksArray() {
    return this.banks && Array.from(this.banks.values());
  }
}
