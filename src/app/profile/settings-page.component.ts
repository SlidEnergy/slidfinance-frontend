import {AfterViewInit, Component, ElementRef, Inject, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, AfterViewInit {

  telegramUrl = 'https://telegram.me/SlidFinanceBot?start=' + AuthService.getRefreshToken();

  constructor(@Inject(DOCUMENT) private document, private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const s = this.document.createElement('script');
    s.async = 'true';
    //s.src = 'https://telegram.org/js/telegram-widget.js?7';
    s.src = 'https://oauth.watg.ru/js/telegram-widget.js?5';
    s.setAttribute('data-telegram-login', 'SlidFinanceBot');
    s.setAttribute('data-size', 'large');
    //s.setAttribute('data-auth-url', 'https://slidfinance-frontend.herokuapp.com/telegram');
    s.setAttribute('data-onauth', 'onTelegramAuth(user)');
    s.setAttribute('data-request-access', 'write');

    this.elementRef.nativeElement.appendChild(s);
  }

  onTelegramAuth(user: {first_name: string, last_name: string, id: number, username: string}) {

  }
}
