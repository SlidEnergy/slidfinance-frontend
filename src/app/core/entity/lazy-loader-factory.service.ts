import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {catchError, filter, finalize, mapTo, share, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ErrorHandlerService} from '../errors/error-handler.service.';
import {AppState} from '../store/app-state';

@Injectable({
    providedIn: 'root'
})
export class LazyLoaderFactoryService {

    constructor(
        private store: Store<AppState>,
        private errorHandlerService: ErrorHandlerService
    ) {
    }

    createLoader<T>(
        loaded: Observable<boolean>,
        load: () => Observable<T[]>,
    ): Observable<undefined> {
        return loaded.pipe(
            filter(loaded => !loaded),
            switchMap(() => load()),
            catchError(error => {
                this.errorHandlerService.handle(error);
                return throwError(error);
            }),
            // Отмену или завершении операции можно обработать в finalize
            //finalize(() => console.log("finalize")),
            mapTo(undefined),
            share()
        );
    }
}
