/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import test from 'ava';

import {
  falsyPromiseOrThrow,
  meaningPromiseOrThrow,
  truthyPromiseOrThrow,
} from './promise';

// meaningPromiseOrThrow -------------------------------------------------------

[
  { value: undefined, label: 'undefined' },
  { value: null, label: 'null' },
  { value: '', label: 'empty string' },
  { value: [], label: 'empty array' },
  { value: {}, label: 'empty object' },
].forEach(({ value, label }) => {
  test('meaningPromiseOrThrow intercepts ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, message);
  });
});

[
  { value: 'some string', label: 'string' },
  { value: true, label: 'true' },
  { value: false, label: 'false' },
  { value: 0, label: 'zero' },
  { value: 42, label: 'number' },
  { value: [42], label: 'array' },
  { value: { prop: 42 }, label: 'object' },
].forEach(({ value, label }) => {
  test('meaningPromiseOrThrow ignores ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, value);
  });
});

// truthyPromiseOrThrow -------------------------------------------------------

[
  { value: undefined, label: 'undefined' },
  { value: null, label: 'null' },
  { value: '', label: 'empty string' },
  { value: false, label: 'false' },
  { value: 0, label: 'zero' },
].forEach(({ value, label }) => {
  test('truthyPromiseOrThrow intercepts ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(truthyPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, message);
  });
});

[
  { value: 'some string', label: 'string' },
  { value: true, label: 'true' },
  { value: 42, label: 'number' },
  { value: [], label: 'empty array' },
  { value: [42], label: 'array' },
  { value: {}, label: 'empty object' },
  { value: { prop: 42 }, label: 'object' },
].forEach(({ value, label }) => {
  test('truthyPromiseOrThrow ignores ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(truthyPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, value);
  });
});
// falsyPromiseOrThrow -------------------------------------------------------

[
  { value: 'some string', label: 'string' },
  { value: true, label: 'true' },
  { value: 42, label: 'number' },
  { value: [], label: 'empty array' },
  { value: [42], label: 'array' },
  { value: {}, label: 'empty object' },
  { value: { prop: 42 }, label: 'object' },
].forEach(({ value, label }) => {
  test('falsyPromiseOrThrow intercepts ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(falsyPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, message);
  });
});

[
  { value: undefined, label: 'undefined' },
  { value: null, label: 'null' },
  { value: '', label: 'empty string' },
  { value: false, label: 'false' },
  { value: 0, label: 'zero' },
].forEach(({ value, label }) => {
  test('falsyPromiseOrThrow ignores ' + label, async (t) => {
    const message = 'My custom error message';
    const result = await Promise.resolve(value)
      .then(falsyPromiseOrThrow(message))
      .catch((e) => e.message);
    return t.is(result, value);
  });
});

// consoleLogPromise -----------------------------------------------------------

// Not possible yet to mock or spy console.log

/*
[
  { value: undefined, label: 'undefined' },
  { value: null, label: 'null' },
  { value: 'string', label: 'string' },
  { value: 42, label: 'number' },
].forEach(({ value, label }) => {
  test('consoleLogPromise logs ' + label, async (t) => {
    const prefix = 'My custom error message';
    let consoleArgs = [];
    const consoleLog = console.log;

    console.log = function() {
      consoleArgs = arguments;
    }

    await Promise.resolve(value).then(consoleLogPromise(prefix));
     t.is(consoleArgs[0] , prefix);
     t.is(consoleArgs[1], value);

    const console.log = consoleLog;
    return;
  });
});
*/
