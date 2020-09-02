import {Component, Input, OnInit} from '@angular/core';
import {AccountsService, BankAccount, SaltedgeService} from 'src/app/api';
import {MatDialog} from '@angular/material/dialog';
import {AddAccountDialogComponent} from './dialogs/add-account-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
    accounts: BankAccount[];

    @Input('accounts') set accountsInput(value: BankAccount[]) {
        if (value) {
            this.loadingVisible = false;
            this.accounts = value;
        }
    }

    loadingVisible = true;

    constructor(private dialog: MatDialog,
                private router: Router,
                private snackBar: MatSnackBar,
                private accountsService: AccountsService,
                private saltedgeService: SaltedgeService) {
    }

    ngOnInit() {
    }

    row_click(row: BankAccount) {
        this.router.navigate(['banks', row.id, 'accounts']);
    }

    addNew() {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: {}
        });

        dialogRef.afterClosed().pipe(
            filter(x => x),
            switchMap(item => this.accountsService.add(item))
        ).subscribe(result => {
                this.snackBar.open('Счет привязан', undefined, {duration: 5000, panelClass: ['background-green']});
                this.accounts.push(result);
            },
            error => {
                console.error(error);
                this.snackBar.open('Не удалось привязать счет', undefined, {duration: 5000, panelClass: ['background-red']});
            });
    }

    getTotalOwnFunds() {
        if (this.accounts) {
            return this.accounts.map(b => b.balance - b.creditLimit).reduce((acc, value) => acc + value, 0);
        }
    }

    importAll() {
        this.saltedgeService.runImport().subscribe(value => {
            this.snackBar.open('Импорт запущен', undefined, {duration: 5000, panelClass: ['background-green']});
        }, error => {
            console.error(error);
            this.snackBar.open('Не удалось запустить импорт', undefined, {duration: 5000, panelClass: ['background-red']});
        });
    }
}
