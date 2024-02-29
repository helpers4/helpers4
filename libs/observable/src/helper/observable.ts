/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Observable,
  ObservableInput,
  ObservableInputTuple,
  ObservedValueOf,
  OperatorFunction,
  combineLatest as combineLatestOperator,
  map as mapOperator,
  of,
} from "rxjs";

// -- combine ------------------------------------------------------------------

type combineOptions<T, U> = {
  readonly preTreatment?: OperatorFunction<readonly [T, U], readonly [T, U]>;
};

/**
 * Combine two observables with a map function and an optional pre-treatment.
 *
 * Note: you can use the pre-treatment to add a filter, a distinctUntilChanged,
 * any other operator that can be used in a pipe, or even an `UntilDestroy`
 * operator.
 *
 * @param source1 first source of data
 * @param source2 second source of data
 * @param map way to combine data
 * @param options options for the combineLatest operator
 * @returns an observable that emits the result of the map function
 * @see combineLatestOperator
 * @see mapOperator
 */
export function combine<T, U, R>(
  source1: Observable<T>,
  source2: Observable<U>,
  map: (c: readonly [T, U]) => R,
  options?: combineOptions<T, U>
): Observable<R> {
  if (options?.preTreatment) {
    return combineLatestOperator([source1, source2]).pipe(
      options.preTreatment,
      mapOperator(map)
    );
  } else {
    return combineLatestOperator([source1, source2]).pipe(mapOperator(map));
  }
}

// -- combineLatest ------------------------------------------------------------

// combineLatest([a, b, c])
export function combineLatest<A extends readonly unknown[]>(
  sources: readonly [...ObservableInputTuple<A>]
): Observable<A>;

// combineLatest({a, b, c})
export function combineLatest<T extends Record<string, ObservableInput<any>>>(
  sourcesObject: T
): Observable<{ [K in keyof T]: ObservedValueOf<T[K]> }>;

/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * This method relies on {@link combineLatestOperator} of rxjs.
 *
 * The main difference with {@link combineLatestOperator} is in case of empty parameters.
 * If the parameter is empty (empty array or empty object), the result will be
 * also empty.
 *
 * ATTENTION: this version doesn't support `scheduler` nor `mapper` as last
 * argument like in {@link combineLatestOperator}.
 *
 * @see {@link combineLatestOperator}
 * @see {@link combineLatestAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {ObservableInput} [observables] An array of input Observables to combine with each other.
 * An array of Observables must be given as the first argument.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 */
export function combineLatest(input: any): any {
  if (Array.isArray(input)) {
    input = input.filter((a) => !!a);
    return input.length ? combineLatestOperator(...input) : of([]);
  } else {
    return Object.entries(input).filter(([_, v]) => !!v).length
      ? combineLatestOperator(input)
      : of({});
  }
}

type ObservableInput<T> = Observable<T> | undefined | null;
