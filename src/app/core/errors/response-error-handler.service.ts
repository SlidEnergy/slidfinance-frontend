import {Injectable} from '@angular/core';
import {isErrorResponse} from '../../shared/utils/response-utils';
import {showError} from '../../shared/utils/message-utils';
import {ResponseError} from './response-error';

@Injectable()
export class ResponseErrorHandlerService {
    constructor() {
    }

    public handle(response: any) {
        if (!response)
            return;

        if (isErrorResponse(response) && response.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = function () {
                if (this.result !== null) {
                    const message = JSON.parse(this.result.toString()).message;
                    showError(message);
                }
            };
            reader.readAsText(response.error);
            return;
        }

        let error: ResponseError;

        // Преобразовываем HttpResponseError и HttpResponse в наш класс ResponseError
        if (response instanceof ResponseError) {
            error = response;
        } else {
            if (isErrorResponse(response)) {
                const responseMessage = response.error !== undefined ? response.error.message : response.message;
                error = new ResponseError(response.status, responseMessage);
            } else
                return;
        }

        // Обработка ошибки
        if (error) {
            if (error.isUnauthorizedError) {
                // Ничего не делаем, пользователь будет перенаправлен на страницу входа, если передано сообщение при получении токена, показываем его.
                if(response.error.error_description)
                    showError(response.error.error_description);
            } else if (error.isErrorWithMessageForUser) {
                showError(error.message);
            } else if (error.isNetworkError) {
                const serviceUnavailableMessage = "Сервис недоступен, проверьте интернет соединение и повторите попытку.";
                showError(serviceUnavailableMessage);
            } else {
                const unhandledErrorMessage = "Необработанная ошибка";
                showError(unhandledErrorMessage);
            }
        }
    }
}
