import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  telegramUrl = "https://telegram.me/SlidFinanceBot?start=" + AuthService.getAccessToken()

  constructor() { }

  ngOnInit() {
  }

}
