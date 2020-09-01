import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BankAccount} from 'src/app/api';
import {FormControl, Validators} from '@angular/forms';
import {EntityDataContextService} from '../../../core/entity/entity-data-context.service';
import {map} from 'rxjs/operators';
import {SaltedgeBankAccountRecord} from './SaltedgeBankAccountRecord';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-edit-account-dialog',
    templateUrl: './edit-account-dialog.component.html',
    styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {
    saltedgeAccounts: Observable<SaltedgeBankAccountRecord[]>;
    formControl = new FormControl('', [
        Validators.required
    ]);

    constructor(@Inject(MAT_DIALOG_DATA) public data: BankAccount,
                private entityDataContext: EntityDataContextService) {
    }

    ngOnInit() {
        this.saltedgeAccounts = this.entityDataContext.saltedgeBankAccounts.getListLazy().pipe(
            map(result => {
                const accounts: SaltedgeBankAccountRecord[] = [];
                for (const record of result) {
                    for (const account of record.accounts) {
                        accounts.push({
                            accountId: account.id,
                            accountName: account.name,
                            providerName: record.connection.provider_name
                        });
                    }
                }

                return accounts;
            })
        );
    }

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    getSaltedgeBankAccountArray() {
    }
}
