/**
 * Ошибка загрузки контента.
 */
export class ResponseError{
    constructor(public code, public message) { }

    /**
    * Выдает true если ответ содержит обработанную ошибку с сообщением для пользователя
    * @param response
    */
    get isErrorWithMessageForUser() {
        // TODO: Добавить обработку NotFound для объектов, которые не существуют.
        // NotFound выдается также если маршрут неправильный, это уже необработанная ошибка.

        return this.code == 400 || // BadRequest
            this.code == 502 || // BadGateway
            this.code == 504 || // GatewayTimeout
            this.code == 422; // Unprocessable Entity
    }

    get isUnauthorizedError() {
        return this.code == 401;
    }

    /**
    * Выдает true если ответ содержит ошибку связанную с сетью
    * @param response
    */
    get isNetworkError() {
        return this.code == 0;
    }
}
