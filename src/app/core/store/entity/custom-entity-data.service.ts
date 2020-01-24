import {Observable} from "rxjs";
import {Update} from "@ngrx/entity";
import {EntityCollectionDataService, QueryParams} from "@ngrx/data";

export class CustomEntityDataService<T> implements EntityCollectionDataService<T>{
    name: string;

    // TestBed bug requires `@Optional` even though http is always provided.
    constructor(
        private options: {
            getAll?: () => Observable<T[]>,
        }) {
    }

    add(entity: T): Observable<T> {
        throw new Error('not implemented');
    }

    delete(id: any): Observable<number | string> {
        throw new Error('not implemented');
    }

    getAll(): Observable<T[]> {
        if(this.options.getAll)
            return this.options.getAll();
        else
            throw new Error('not implemented');
    }

    getById(id: any): Observable<T> {
        throw new Error('not implemented');
    }

    getWithQuery(params: string | QueryParams): Observable<T[]> {
        throw new Error('not implemented');
    }

    update(update: Update<T>): Observable<T> {
        throw new Error('not implemented');
    }

    upsert(entity: T): Observable<T> {
        throw new Error('not implemented');
    }
}
