/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, spyOn, test } from "bun:test";
import {
  consoleLogPromise,
  falsyPromiseOrThrow,
  meaningPromiseOrThrow,
  truthyPromiseOrThrow,
} from "./promise";

// -- meaningPromiseOrThrow ----------------------------------------------------

[
  { value: undefined, label: "undefined" },
  { value: null, label: "null" },
  { value: "", label: "empty string" },
  { value: [], label: "empty array" },
  { value: {}, label: "empty object" },
].forEach(({ value, label }) => {
  test("meaningPromiseOrThrow intercepts " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(message);
  });
});

[
  { value: "some string", label: "string" },
  { value: true, label: "true" },
  { value: false, label: "false" },
  { value: 0, label: "zero" },
  { value: 42, label: "number" },
  { value: [42], label: "array" },
  { value: { prop: 42 }, label: "object" },
].forEach(({ value, label }) => {
  test("meaningPromiseOrThrow ignores " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(meaningPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(value);
  });
});

// -- truthyPromiseOrThrow ----------------------------------------------------

[
  { value: undefined, label: "undefined" },
  { value: null, label: "null" },
  { value: "", label: "empty string" },
  { value: false, label: "false" },
  { value: 0, label: "zero" },
].forEach(({ value, label }) => {
  test("truthyPromiseOrThrow intercepts " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(truthyPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(message);
  });
});

[
  { value: "some string", label: "string" },
  { value: true, label: "true" },
  { value: 42, label: "number" },
  { value: [], label: "empty array" },
  { value: [42], label: "array" },
  { value: {}, label: "empty object" },
  { value: { prop: 42 }, label: "object" },
].forEach(({ value, label }) => {
  test("truthyPromiseOrThrow ignores " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(truthyPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(value);
  });
});

// -- falsyPromiseOrThrow ----------------------------------------------------

[
  { value: "some string", label: "string" },
  { value: true, label: "true" },
  { value: 42, label: "number" },
  { value: [], label: "empty array" },
  { value: [42], label: "array" },
  { value: {}, label: "empty object" },
  { value: { prop: 42 }, label: "object" },
].forEach(({ value, label }) => {
  test("falsyPromiseOrThrow intercepts " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(falsyPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(message);
  });
});

[
  { value: undefined, label: "undefined" },
  { value: null, label: "null" },
  { value: "", label: "empty string" },
  { value: false, label: "false" },
  { value: 0, label: "zero" },
].forEach(({ value, label }) => {
  test("falsyPromiseOrThrow ignores " + label, async () => {
    const message = "My custom error message";
    const result = await Promise.resolve(value)
      .then(falsyPromiseOrThrow(message))
      .catch((e) => e.message);
    return expect(result).toBe(value);
  });
});

// -- consoleLogPromise --------------------------------------------------------

const prefix = "My custom error message";

[
  { value: undefined, label: "undefined" },
  { value: null, label: "null" },
  { value: "string", label: "string" },
  { value: 42, label: "number" },
].forEach(({ value, label }) => {
  test("consoleLogPromise logs " + label, async () => {
    const spy = spyOn(console, "log");
    await Promise.resolve(value).then(consoleLogPromise(prefix));
    expect(spy).toHaveBeenCalledWith(prefix, value);
  });
});
