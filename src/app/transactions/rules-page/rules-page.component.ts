import { Component, OnInit } from '@angular/core';
import { GeneratedRule, RulesService, Rule } from 'src/app/api';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import {AddDialogComponent} from '../dialogs/add-rule/add-rule-dialog.component';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss']
})
export class RulesPageComponent implements OnInit {
  generatedRules: Observable<GeneratedRule[]>;
  rules: Observable<Rule[]>;

  constructor(
    private rulesService: RulesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.generatedRules = this.rulesService.getGeneratedRules();
    this.rules = this.rulesService.getRule();
  }

  addGeneratedRule_Click(e: {rule: GeneratedRule, categoryId: string}) {
    this.addNew({
      categoryId: e.categoryId,
      accountId: e.rule.accountId,
      bankCategory: e.rule.bankCategory,
      description: e.rule.description,
      mcc: e.rule.mcc
    });
  }

  addNew(rule: Rule) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: rule
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        //this.rulesService.postRule
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        //this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
      }
    });
  }
}
