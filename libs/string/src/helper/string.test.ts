/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, test } from "bun:test";
import { errorToString, labelize } from "./string";

// -- labelize -----------------------------------------------------------------

[
  "oh_hi_mark!",
  "LiB-hElPeRs_DaTa/CaFé",
  "oh-hi-mark!",
  "oh hi mark!",
  "18-12-2022",
].forEach((testString) => {
  test("labelize should work with " + testString, () => {
    const result = labelize(testString);

    expect(typeof result).toBe("string");
    expect(result.split(" ").length >= 2).toBeTruthy();
    expect(result.includes("-")).toBeFalsy();
    expect(result.includes("_")).toBeFalsy();
    expect(result.includes(" ")).toBeTruthy();

    result
      .split(" ")
      .forEach((word) => expect(word[0]).toBe(word[0].toUpperCase()));
  });
});

// -- errorToString ------------------------------------------------------------

test("errorToString should return error when type of string", async () =>
  expect(errorToString("unexpected error")).toBe("unexpected error"));

test("errorToString should return errorMessage when present in error", async () =>
  expect(errorToString({ error: { errorMessage: "unexpected error" } })).toBe(
    "unexpected error"
  ));

test("errorToString should return error when present in error", async () =>
  expect(errorToString({ error: "unexpected error" })).toBe(
    "unexpected error"
  ));

test("errorToString should return message when present in error", async () =>
  expect(errorToString({ message: "unexpected error" })).toBe(
    "unexpected error"
  ));

test("errorToString should return stringified error in all other cases", async () =>
  expect(errorToString({ customError: "unexpected error" })).toBe(
    '{"customError":"unexpected error"}'
  ));
