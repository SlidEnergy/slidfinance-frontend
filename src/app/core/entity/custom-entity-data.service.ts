import {Observable} from "rxjs";
import {Update} from "@ngrx/entity";
import {EntityCollectionDataService, QueryParams} from "@ngrx/data";

export class CustomEntityDataService<T> implements EntityCollectionDataService<T>{
    constructor(
        public name: string,
        private options: {
            getAll?: () => Observable<T[]>,
            getById?: (id: any) => Observable<T>
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
        if(this.options.getById)
            return this.options.getById(id);
        else
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
