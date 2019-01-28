import { Component, OnInit } from '@angular/core';
import { GeneratedRule, RulesService } from 'src/app/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss']
})
export class RulesPageComponent implements OnInit {
  generatedRules: Observable<GeneratedRule[]>;

  constructor(private rulesService: RulesService) { }

  ngOnInit() {
    this.generatedRules = this.rulesService.getGeneratedRules();
  }

}
