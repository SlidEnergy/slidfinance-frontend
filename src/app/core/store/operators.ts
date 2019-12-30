import {distinctUntilChanged, filter, map} from "rxjs/operators";
import {combineLatest, Observable, OperatorFunction} from "rxjs";

export function filterNull<T>(): OperatorFunction<T | null | undefined, T> {
  return filter<T>(value => value !== undefined && value !== null);
}

export const muteFirst = <T, R>(first: Observable<T>, second: Observable<R>): Observable<R> => {
  return combineLatest([first, second]).pipe(
    map(([a, b]: [T, R]): R => b),
    distinctUntilChanged()
  );
};
