import {AfterViewInit, Component, ElementRef, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ImportService, TelegramService} from '../api';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, AfterViewInit {
  result = '';

  constructor(@Inject(DOCUMENT) private document,
              private elementRef: ElementRef,
              private telegramService: TelegramService,
              private snackBar: MatSnackBar) {
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

    window['onTelegramAuth'] = (user) => this.onTelegramAuth(user);
  }

  onTelegramAuth(user: { first_name: string, last_name: string, id: number, username: string, auth_date: number, hash: string | null }) {
    this.telegramService.connect(user).subscribe(
      value => this.snackBar.open('Ваш аккант Телеграмма успешно привязан', undefined, { duration: 5000, panelClass: ['background-green'] }),
      error => this.snackBar.open('Не удалось привязать ваш аккаунт Телеграма', undefined, { duration: 5000, panelClass: ['background-red'] })
    );
  }
}
