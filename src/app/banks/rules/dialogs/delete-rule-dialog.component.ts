import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RulesService, CategoriesService, AccountsService, Category, BankAccount} from 'src/app/api';
import {map} from 'rxjs/operators';
import {MccService} from '../../../core/mcc/mcc.service';
import {Mcc} from '../../../core/mcc/mcc';

@Component({
  selector: 'app-delete-rule-dialog',
  templateUrl: './delete-rule-dialog.component.html',
  styleUrls: ['./delete-rule-dialog.component.scss']
})
export class DeleteRuleDialogComponent implements OnInit {
  categories: Map<number, Category>;
  accounts: Map<number, BankAccount>;
  mcc: Mcc[];

  constructor(public dialogRef: MatDialogRef<DeleteRuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public rulesService: RulesService,
              private categoriesService: CategoriesService,
              private accountsService: AccountsService,
              private mccService: MccService) {
  }

  ngOnInit() {
    this.categoriesService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, Category])))).subscribe(data => this.categories = data);
    this.accountsService.getList().pipe(map(x => new Map(x.map(i => [i.id, i] as [number, BankAccount])))).subscribe(data => this.accounts = data);

    this.mccService.getList().subscribe(x => this.mcc = x);
  }

  getAccountTitle(accountId: number) {
    if (!this.accounts) {
      return '';
    }

    let account = this.accounts.get(accountId);
    return account ? account.title : '';
  }

  getCategoryTitle(categoryId: number) {
    if (!this.categories) {
      return '';
    }

    let category = this.categories.get(categoryId);
    return category ? category.title : '';
  }

  getMccCodeById(id: number) {
    if (!this.mcc) {
      return;
    }

    let mcc = this.mcc.find(x => x.id == id);
    if (!mcc) {
      return;
    }

    return mcc.code;
  }
}
