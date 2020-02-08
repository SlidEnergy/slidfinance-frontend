import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BanksService, CashbackCategory, CashbackCategoryType, Product} from 'src/app/api';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-cashback-category-dialog',
    templateUrl: './add-cashback-category-dialog.component.html',
    styleUrls: ['./add-cashback-category-dialog.component.scss']
})
export class AddCashbackCategoryDialogComponent implements OnInit {
    type = CashbackCategoryType;

    constructor(@Inject(MAT_DIALOG_DATA) public data: CashbackCategory, private banksService: BanksService) {
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
