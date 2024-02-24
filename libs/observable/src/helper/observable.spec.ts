/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import test from 'ava';
import { firstValueFrom, map, of } from 'rxjs';

import { combine } from './observable';

test('combine', async (t) => {
  const result = await firstValueFrom(
    combine(of(1), of(2), (c) => c[0] + c[1])
  );
  return t.is(result, 3);
});

test('combine with pretreatment', async (t) => {
  const result = await firstValueFrom(
    combine(of(1), of(2), (c) => c[0] + c[1], {
      preTreatment: map((c) => [c[0], c[1] + 1]),
    })
  );
  return t.is(result, 4);
});
