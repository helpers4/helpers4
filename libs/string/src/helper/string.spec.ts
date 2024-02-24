/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import test from 'ava';

import { labelize } from './string';

[
  'oh_hi_mark!',
  'LiB-hElPeRs_DaTa/CaFé',
  'oh-hi-mark!',
  'oh hi mark!',
  '18-12-2022',
].forEach((testString) => {
  test('labelize should work with ' + testString, (t) => {
    const result = labelize(testString);

    t.is(typeof result, 'string');
    t.truthy(result.split(' ').length >= 2);
    t.falsy(result.includes('-'));
    t.falsy(result.includes('_'));
    t.truthy(result.includes(' '));

    result.split(' ').forEach((word) => {
      t.is(word[0], word[0].toUpperCase());
    });
  });
});
