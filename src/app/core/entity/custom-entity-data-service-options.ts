import {Observable} from "rxjs";

export type CustomEntityDataServiceOptions<T> = {
    getAll?: () => Observable<T[]>;
    getById?: (id: any) => Observable<T>;
};
