import {HttpErrorResponse} from '@angular/common/http';
import {ResponseError} from 'src/app/core/errors/response-error';

export function isErrorResponse(response: HttpErrorResponse) {
    return response.status != undefined && !(response.status >= 200 && response.status < 300);
}

export function toError(response: HttpErrorResponse) {
    if (!response) {
        return;
    }

    if (!isErrorResponse(response)) {
        return;
    }

    let message = response.error ? response.error.message : response.message;

    return new ResponseError(response.status, message);
}
