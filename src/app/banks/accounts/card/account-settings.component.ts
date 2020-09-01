import {Component, Input, OnInit} from '@angular/core';
import {MessageDialogComponent} from '../../../shared/message-dialog/message-dialog.component';
import {filter, map, switchMapTo} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {SaltedgeBankAccountRecord} from './SaltedgeBankAccountRecord';
import {Observable} from 'rxjs';
import {EntityDataContextService} from '../../../core/entity/entity-data-context.service';
import {AccountsService, BankAccount} from '../../../api';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    @Input() account: BankAccount;
    saltedgeAccounts: Observable<SaltedgeBankAccountRecord[]>;

    constructor(private dialog: MatDialog,
                private accountsService: AccountsService,
                private snackBar: MatSnackBar,
                private router: Router,
                private entityDataContext: EntityDataContextService
    ) {
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
                            providerName: record.connection.provider_name,
                            balance: account.balance
                        });
                    }
                }

                return accounts;
            })
        );
    }

    deleteItem() {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            data: {caption: 'Вы уверены что хотите удалить карту?', text: this.account.title}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMapTo(this.accountsService._delete(this.account.id))
        ).subscribe(
            data => {
                this.snackBar.open('Карта удалена', undefined, {duration: 5000, panelClass: ['background-green']});
                this.router.navigate(['banks']);
            },
            error => {
                this.snackBar.open('Не удалось удалить карту', undefined, {duration: 5000, panelClass: ['background-red']});
            }
        );
    }

    saltedgeAccount_selectionChange() {
        if (this.account.saltedgeBankAccountId) {
            this.saveChanges();
        }
    }

    saveChanges() {
        this.accountsService.update(this.account.id, this.account).subscribe(
            value => this.snackBar.open('Изменения сохранены', undefined, {duration: 5000, panelClass: ['background-green']}),
            error => this.snackBar.open('Не удалось сохранить изменения', undefined, {duration: 5000, panelClass: ['background-red']})
        );
    }
}
