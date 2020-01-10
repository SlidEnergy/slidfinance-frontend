import { Component, OnInit } from '@angular/core';
import {ImportService} from '../api';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-import-token',
  templateUrl: './import-token.component.html',
  styleUrls: ['./import-token.component.scss']
})
export class ImportTokenComponent implements OnInit {
  importToken: Observable<string>;

  constructor(private importService: ImportService) { }

  ngOnInit() {
  }

  getImportToken() {
    this.importToken = this.importService.getRefreshToken();
  }
}
