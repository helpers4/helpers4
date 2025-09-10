/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Observable,
  ObservableInput,
  ObservableInputTuple,
  ObservedValueOf,
  combineLatest as combineLatestOperator,
  of,
} from "rxjs";

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
