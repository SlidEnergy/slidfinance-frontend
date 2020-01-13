import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {map, share, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BankAccount, ProductTariff} from '../../../../api';
import {ProductsService} from '../../../../core/accounts/products.service';
import {Observable, of} from 'rxjs';
import {AccountsService} from '../../../../core/accounts/accounts.service';
import {Product} from '../../../../core/accounts/Product';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit, OnChanges {
  @Input() account: BankAccount;
  products: Observable<Product[]>;
  tariffs: Observable<ProductTariff[] | undefined>;

  constructor(private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar,
              private productsService: ProductsService,
              private accountsService: AccountsService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account && changes.account.currentValue && changes.account.currentValue.productId) {
      this.tariffs = this.getTariffs(this.account.productId);
    }
  }

  ngOnInit() {
    this.products = this.productsService.getList();
  }

  getTariffs(productId: number): Observable<ProductTariff[] | undefined> {
    return this.productsService.getList().pipe(
      map(products => products.find(product => product.id == productId)),
      switchMap(product => product.getTariffs()),
    );
  }

  product_selectionChange() {
    if (this.account.productId) {
      this.saveChanges();
      this.tariffs = this.getTariffs(this.account.productId);
    }
  }

  tariff_selectionChange() {
    if (this.account.selectedTariffId) {
      this.saveChanges();
      this.tariffs = this.getTariffs(this.account.productId);
    }
  }

  saveChanges() {
    this.accountsService.update(this.account.id, this.account).subscribe(
      value => this.snackBar.open('Изменения сохранены', undefined, {duration: 5000, panelClass: ['background-green']}),
      error => this.snackBar.open('Не удалось сохранить изменения', undefined, {duration: 5000, panelClass: ['background-red']})
    );
  }
}
