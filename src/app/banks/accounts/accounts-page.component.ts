import {Component, OnInit} from '@angular/core';
import {AccountsService, BankAccount} from 'src/app/api';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {filter, map, startWith} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-accounts-page',
    templateUrl: './accounts-page.component.html',
    styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent implements OnInit {
    accounts: Observable<BankAccount[]>;
    isAccountSelected: Observable<boolean>;

    constructor(
        private router: Router,
        private accountService: AccountsService,
        private snackBar: MatSnackBar
    ) {
        this.isAccountSelected = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd),
            startWith({url: this.router.url}),
            map(event => event.url != '/banks')
        );
    }

    ngOnInit() {
        this.accounts = this.accountService.getList();
    }
}
