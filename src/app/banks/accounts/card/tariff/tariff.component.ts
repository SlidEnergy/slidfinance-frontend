import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  AccountsService,
  BankAccount,
  CashbackCategoriesService,
  CashbackCategory, CashbackCategoryType,
  Product,
  ProductTariff,
  TariffsService
} from '../../../../api';
import {ProductsManagerService} from '../../../../core/accounts/products-manager.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit, OnChanges {
  @Input() account: BankAccount;
  products: Observable<Product[]>;
  tariffs: Observable<ProductTariff[] | undefined>;
  categories: Observable<CashbackCategory[] | undefined>;

  constructor(private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar,
              private productsService: ProductsManagerService,
              private accountsService: AccountsService,
              private tariffsService: TariffsService,
              private categoriesService: CashbackCategoriesService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.account && changes.account.currentValue) {
      if(this.account.productId)
        this.tariffs = this.getTariffs(this.account.productId);

      if(this.account.selectedTariffId)
        this.categories = this.getCategories(this.account.productId, this.account.selectedTariffId);
    }
  }

  ngOnInit() {
    this.products = this.productsService.getList();
  }

  getTariffs(productId: number) {
    return this.productsService.getList().pipe(
      map(products => products.find(product => product.id == productId)),
      switchMap(product => this.tariffsService.getList(product.id)),
    );
  }

  getCategories(productId: number, tariffId: number) {
    return this.productsService.getList().pipe(
      map(products => products.find(product => product.id == productId)),
      switchMap(product => this.tariffsService.getList(product.id)),
      map(tariffs => tariffs.find(tariff => tariff.id == tariffId)),
      switchMap(tariff => this.categoriesService.getList(tariff.id)),
      map(categories => categories.filter(x => x.type != CashbackCategoryType.BaseCashback))
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
      this.categories = this.getCategories(this.account.productId, this.account.selectedTariffId);
    }
  }

  saveChanges() {
    this.accountsService.update(this.account.id, this.account).subscribe(
      value => this.snackBar.open('Изменения сохранены', undefined, {duration: 5000, panelClass: ['background-green']}),
      error => this.snackBar.open('Не удалось сохранить изменения', undefined, {duration: 5000, panelClass: ['background-red']})
    );
  }
}
