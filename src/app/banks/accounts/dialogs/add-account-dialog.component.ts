import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bank, BankAccount, BanksService} from 'src/app/api';
import {FormControl, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-add-account-dialog',
    templateUrl: './add-account-dialog.component.html',
    styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent implements OnInit {
    banks: Map<number, Bank>;

    formControl = new FormControl('', [
        Validators.required
    ]);

    constructor(@Inject(MAT_DIALOG_DATA) public data: BankAccount,
                private banksService: BanksService) {
    }

    ngOnInit() {
        this.banksService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Bank])))).subscribe(data => this.banks = data);
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    getBanksArray() {
        return this.banks && Array.from(this.banks.values());
    }
}
