import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GeneratedRule, RulesService, Rule } from 'src/app/api';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss']
})
export class RulesPageComponent implements OnInit {
  generatedRules: GeneratedRule[];
  rules: Rule[];

  constructor(
    private rulesService: RulesService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.generatedRules = await this.rulesService.getGeneratedRules().toPromise();
    this.rules = await this.rulesService.getList().toPromise();
  }

  addItem = (item: Rule) => {
    return this.rulesService.add(item).pipe(
      map((result) => {
        let rules = this.rules;
        rules.push(result)
        this.rules = null;
        this.changeDetector.detectChanges();
        this.rules = rules;
        this.changeDetector.detectChanges();

        this.snackBar.open('Правило добавлено', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось добавить правило', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  deleteItem = (item: Rule) => {
    return this.rulesService._delete(item.id).pipe(
      map(() => {
        this.snackBar.open('Правило удалено', undefined, { duration: 5000, panelClass: ['background-green'] });
        return true;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось удалить правило', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }

  editItem = (item: Rule) => {
    return this.rulesService.update(item.id, item).pipe(
      map((result) => {
        this.snackBar.open('Правило изменено', undefined, { duration: 5000, panelClass: ['background-green'] });
        return result;
      }),
      catchError(() => {
        this.snackBar.open('Не удалось изменть правило', undefined, { duration: 5000, panelClass: ['background-red'] });
        return of(false);
      }));
  }
}
