/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, test } from "bun:test";
import { firstValueFrom, map, of } from "rxjs";
import { combine, combineLatest } from "./observable";

// -- combine ------------------------------------------------------------------

test("combine", async () => {
  const result = await firstValueFrom(
    combine(of(1), of(2), (c) => c[0] + c[1])
  );
  return expect(result).toBe(3);
});

test("combine with pretreatment", async () => {
  const result = await firstValueFrom(
    combine(of(1), of(2), (c) => c[0] + c[1], {
      preTreatment: map((c) => [c[0], c[1] + 1]),
    })
  );
  return expect(result).toBe(4);
});

// -- combineLatest ------------------------------------------------------------

test("combineLatest with array", async () => {
  const result = await firstValueFrom(combineLatest([of(1), of(2)]));
  return expect(result).toEqual([1, 2]);
});

test("combineLatest with object", async () => {
  const result = await firstValueFrom(combineLatest({ a: of(1), b: of(2) }));
  return expect(result).toEqual({ a: 1, b: 2 });
});

test("combineLatest with empty array", async () => {
  const result = await firstValueFrom(combineLatest([]));
  return expect(result).toEqual([]);
});

test("combineLatest with empty object", async () => {
  const result = await firstValueFrom(combineLatest({}));
  return expect(result).toEqual({});
});
