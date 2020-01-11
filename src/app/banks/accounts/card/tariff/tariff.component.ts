import {Component, Input, OnInit} from '@angular/core';
import {AddAccountDialogComponent} from "../../dialogs/add-account-dialog.component";
import {filter, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddProductDialogComponent} from "./dialogs/add-product-dialog.component";

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {
  @Input() product: Product;

  constructor(private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  addTariff() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(
      filter(x => x),
      //switchMap(item => this.accountsService.add(item))
    ).subscribe(result => {
        this.snackBar.open('Продукт добавлен', undefined, {duration: 5000, panelClass: ['background-green']});
      },
      error => {
        console.error(error);
        this.snackBar.open('Не удалось добавить продукт', undefined, {duration: 5000, panelClass: ['background-red']});
      });
  }
}
