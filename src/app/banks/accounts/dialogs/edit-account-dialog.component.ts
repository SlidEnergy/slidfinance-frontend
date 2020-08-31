import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BankAccount, SaltedgeService} from 'src/app/api';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-account-dialog',
    templateUrl: './edit-account-dialog.component.html',
    styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {
    formControl = new FormControl('', [
        Validators.required
    ]);

    constructor(@Inject(MAT_DIALOG_DATA) public data: BankAccount,
                private saltedgeService: SaltedgeService) {
    }

    ngOnInit() {
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    getSaltedgeBankAccountArray() {
    }
}
