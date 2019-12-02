import {AfterViewInit, Component, ElementRef, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {TelegramService} from '../api';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, AfterViewInit {

  result = '';

  constructor(@Inject(DOCUMENT) private document,
              private elementRef: ElementRef,
              private telegramService: TelegramService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const s = this.document.createElement('script');
    s.async = 'true';
    s.src = 'https://telegram.org/js/telegram-widget.js?7';
    // for Russia
    // s.src = 'https://oauth.watg.ru/js/telegram-widget.js?5';
    s.setAttribute('data-telegram-login', 'SlidFinanceBot');
    s.setAttribute('data-size', 'large');
    s.setAttribute('data-onauth', 'onTelegramAuth(user)');
    s.setAttribute('data-request-access', 'write');

    this.elementRef.nativeElement.appendChild(s);
  }

  onTelegramAuth(user: { first_name: string, last_name: string, id: number, username: string }) {
    this.telegramService.connect(user).subscribe(
      value => this.result = 'Успешно',
      error => this.result = 'Не удалось привязать ваш аккаунт Телеграма'
    );
  }
}
