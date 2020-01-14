import {Injectable} from '@angular/core';
import {ApiContextService} from '../api-context.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MccManagerService {

  constructor(
    private apiContext: ApiContextService
  ) {
  }

  getList() {
    return this.apiContext.mccDict.pipe(
      map(mcc => Object.keys(mcc).map(key => mcc[key]))
    );
  }

  getById(id: number) {
    return this.apiContext.mccDict.pipe(
      map(mcc => mcc && mcc[id])
    );
  }
}
