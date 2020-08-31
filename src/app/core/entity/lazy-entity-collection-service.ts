import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, QueryParams} from '@ngrx/data';
import {muteFirst} from "../store/operators";
import {filter, map, startWith, switchMapTo} from "rxjs/operators";
import {LazyLoaderFactoryService} from "./lazy-loader-factory.service";

export class LazyEntityCollectionService<Entity> extends EntityCollectionServiceBase<Entity> {
    loadEntitiesIfRequired = this.lazyLoaderFactory.createLoader(
        this.loaded$,
        () => this.load(),
    ).pipe(startWith(undefined));

    constructor(entityName: string,
                elementsFactory: EntityCollectionServiceElementsFactory,
                private lazyLoaderFactory: LazyLoaderFactoryService) {
        super(entityName, elementsFactory);
    }

    getListLazy() {
        return muteFirst(
            // Запрашиваем список сущностей с сервера если это необходимо
            this.loadEntitiesIfRequired,
            // Возвращаем список из хранилища, если он уже загружен
            this.loaded$.pipe(
                filter(loaded => loaded),
                switchMapTo(this.entities$)
            )
        );
    }

    getMapLazy() {
        return muteFirst(
            // Запрашиваем список сущностей с сервера если это необходимо
            this.loadEntitiesIfRequired,
            // Возвращаем список из хранилища, если он уже загружен
            this.loaded$.pipe(
                filter(loaded => loaded),
                switchMapTo(this.entityMap$)
            )
        );
    }

    getByIdLazy(id: number) {
        return muteFirst(
            // Запрашиваем список сущностей с сервера если это необходимо
            this.loadEntitiesIfRequired,
            // Возвращаем список из хранилища, если он уже загружен
            this.loaded$.pipe(
                filter(loaded => loaded),
                switchMapTo(this.entityMap$.pipe(map(map => map[id])))
            )
        );
    }
}
