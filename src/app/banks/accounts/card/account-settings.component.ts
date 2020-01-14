import {Component, Input, OnInit} from '@angular/core';
import {AccountsService, BankAccount} from '../../../api';
import {MessageDialogComponent} from "../../../shared/message-dialog/message-dialog.component";
import {filter, switchMapTo} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AccountsManagerService} from "../../../core/accounts/accounts-manager.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  @Input() account: BankAccount;

  constructor(private dialog: MatDialog,
              private accountsService: AccountsService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
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
}
