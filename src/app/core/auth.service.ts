
import { throwError as observableThrowError, Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { TokensService } from '../api/api/tokens.service';
import { UsersService } from '../api/api/users.service';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

	// Текущи пользователь, вошедший в систему
	private _currentUser: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

	constructor(
		private tokensService: TokensService,
		private usersService: UsersService,
		private snackBar: MatSnackBar
	) {
		// Проверяем наличие токена
		let token = AuthService.getAccessToken();

		// Если токена нет, значит пользователь не авторизован
		if (!token) {
			this._currentUser.next(null);
			return;
		}

		// Обновляем информацию по текущему пользователю
		this.get().subscribe(
			(user) => {
				this._currentUser.next(user);
			},
			(err) => {
				// Если произошла ошибка, то отправляем пользователя на страницу входа
				this._currentUser.next(null);

				if (err.status) {
					// Ошибки связанная с сетью
					if (err.status === 0) {
						this.snackBar.open('Сервис недоступен, проверьте интернет соединение и повторите попытку.',
							undefined, { duration: 5000, panelClass: ['background-red'] });
					} else
						// Необработанная ошибка
						if (err.status === 500) {
							this.snackBar.open('Необработанная ошибка',
								undefined, { duration: 5000, panelClass: ['background-red'] });
						} else {
							this.snackBar.open(err.error.message,
								undefined, { duration: 5000, panelClass: ['background-red'] });
						}
				}
			});
	}

	public refreshUserInfo() {
		this.get().subscribe(user => this._currentUser.next(user));
	}

	// Текущий пользователь
	public get currentUser(): Observable<User | null> {
		return this._currentUser;
	}

	// Флаг, что пользователь авторизован
	public get isLoggedIn(): Observable<boolean> {
		return this._currentUser.pipe(map((user) => {
			return (user !== null);
		}));
	}

	// email пользователя, если он авторизован
	public get email(): Observable<string> {
		return this._currentUser.pipe(map((user) => {
			if (user !== null) {
				return user.email;
			}

			return '';
		}));
	}

	// Получает информацию по пользователю, авторизованному в данным момент
	public get() {
		return this.usersService.getCurrentUser().pipe(
			map((data: any) => new User(data.id, data.email, data.bankIds, data.categoryIds)),
			catchError(error => {
				console.error(`Произошла ошибка. errorCode: ${error.code}, errorMessage: ${error.message}`);
				return observableThrowError(error);
			}));
	}

	// Вход/получение токена
	public login(email: string, password: string): Observable<User> {
		return this.tokensService.createToken({ email, password }).pipe(
			map((data: any) => {
				const user = new User(data.id, data.email, data.bankIds, data.categoryIds);

				localStorage.setItem('auth', JSON.stringify(data));

				this._currentUser.next(user);

				return user;
			}),
			catchError(error => {
				console.error(`Произошла ошибка. errorCode: ${error.code}, errorMessage: ${error.message}`);
				return observableThrowError(error);
			}));
	}

	// Регистрация/Создание нового пользователя
	public register(email: string, password: string, confirmPassword: string): Observable<User> {
		return this.usersService.register({ email, password, confirmPassword }).pipe(
		map((data: any) => new User(data.id, data.email, data.bankIds, data.categoryIds)),
		catchError(error => {
		console.error(`Произошла ошибка. errorCode: ${error.code}, errorMessage: ${error.message}`);
		return observableThrowError(error);
		}));
	}

	// Выход/очистка токена
	public logout() {
		this._currentUser.next(null);
		localStorage.removeItem('auth');
	}

	// Получает токен из локального хранилища браузера
	public static getAccessToken() {
		let auth = localStorage.getItem('auth');

		try {
			auth = auth && JSON.parse(auth);
		} catch {
			auth = null;
		}

		if (auth && auth['token'] && AuthService.validateAccessToken(auth['token']))
			return auth['token'];
		else
			null;
	}

	// Проверяет токен
	private static validateAccessToken(token: string) {
		if (!token || token.length < 10)
			return false;

		// TODO: Добавить больше проверок

		return true;
	}
}



export class User {
	public id: string;
	public email: string;
	public bankIds: Array<number>;
	public categoryIds: Array<number>;


	constructor(id: string, email: string, bankIds: Array<number>, categoryIds: Array<number>) {
		this.id = id;
		this.email = email;
		this.bankIds = bankIds;
		this.categoryIds = categoryIds;
	}
}
