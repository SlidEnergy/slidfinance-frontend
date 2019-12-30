import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Mcc} from './mcc';
import {ApiContextService} from '../api-context.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MccService {

  constructor(
    private apiContext: ApiContextService
  ) {
    console.log("SINGLETON MCC SERVICE");
  }

  getList(): Observable<Mcc[]> {
    return this.apiContext.mccDict.pipe(
      map(mcc => Object.keys(mcc).map(key => mcc[key] && new Mcc(mcc[key])))
    );
  }

  getById(id: number): Observable<Mcc> {
    return this.apiContext.mccDict.pipe(
      map(mcc => mcc && mcc[id] && new Mcc(mcc[id]))
    );
  }
}
