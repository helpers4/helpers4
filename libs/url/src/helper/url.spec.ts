/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import test from 'ava';

import { addLeadingSlash, extractPureURI, removeEndingSlash } from './url';

test('removeEndingSlash should remove ending slash', (t) => {
  t.is(removeEndingSlash('foo/'), 'foo');
});
test('removeEndingSlash should do nothing for empty string', (t) => {
  t.is(removeEndingSlash(''), '');
});
test('removeEndingSlash should return empty string from alone slash', (t) => {
  t.is(removeEndingSlash('/'), '');
});
test('removeEndingSlash should do nothing for string without slash', (t) => {
  t.is(removeEndingSlash('text-without-slash'), 'text-without-slash');
});
test('removeEndingSlash should remove last slash of slashes', (t) => {
  t.is(removeEndingSlash('/////////'), '////////');
});

/*
test('should throw error', (t) => {
  [null, undefined].forEach((value) => {
    t.throws(removeEndingSlash(value), '');
  });
});
*/

test('addLeadingSlash should do nothing is leading slash is already present', (t) => {
  t.is(addLeadingSlash('foo'), '/foo');
});
test('addLeadingSlash should add leading slash from empty string', (t) => {
  t.is(addLeadingSlash(''), '/');
});
test('addLeadingSlash should add leading slash', (t) => {
  t.is(addLeadingSlash('text-without-slash'), '/text-without-slash');
});
test('addLeadingSlash should add leading slash of slashes', (t) => {
  t.is(addLeadingSlash('/////////'), '/////////');
});
test('addLeadingSlash should do nothing from alone slash', (t) => {
  t.is(addLeadingSlash('/'), '/');
});

/*
test('should throw error', (t) => {
  [null, undefined].forEach((value) => {
    t.throws(addLeadingSlash(value), '');
  });
});
*/

test('extractPureURI should extract URI from URL with query', (t) => {
  t.is(extractPureURI('www.foo.com/api/?=bar'), 'www.foo.com/api/');
});
test('extractPureURI should extract URI from URL with fragment', (t) => {
  t.is(extractPureURI('www.foo.com/api/#userInfos'), 'www.foo.com/api/');
});
test('extractPureURI should do nothing from empty string', (t) => {
  t.is(extractPureURI(''), '');
});
test('extractPureURI should do nothing from standalone slash', (t) => {
  t.is(extractPureURI('/'), '/');
});
test('extractPureURI should do nothing from simple text', (t) => {
  t.is(extractPureURI('text-without-slash'), 'text-without-slash');
});
test('extractPureURI should do nothing from slashes', (t) => {
  t.is(extractPureURI('/////////'), '/////////');
});

/*
test('should throw error', (t) => {
  [null, undefined].forEach((value) => {
    t.throws(extractPureURI(value), '');
  });
});
*/
