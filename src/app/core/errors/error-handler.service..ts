import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    constructor() { }

    public handle(error) {
        if (error instanceof HttpErrorResponse) {
            console.error("Ошибка http запроса. ");
            console.error(error);
        } else {
            const unhandledErrorMessage = "Необработанная ошибка";
            console.error(unhandledErrorMessage + ":");
            console.error(error);
        }

        // TODO: Добавить обработку ошибки. Например, отправку багрепорта
    }
}
