/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, test } from "bun:test";
import { errorToReadableMessage } from "./errorToReadableMessage";


test("errorToReadableMessage should return error when type of string", async () =>
    expect(errorToReadableMessage("unexpected error")).toBe("unexpected error"));

test("errorToReadableMessage should return errorMessage when present in error", async () =>
    expect(errorToReadableMessage({ error: { errorMessage: "unexpected error" } })).toBe(
        "unexpected error"
    ));

test("errorToReadableMessage should return error when present in error", async () =>
    expect(errorToReadableMessage({ error: "unexpected error" })).toBe(
        "unexpected error"
    ));

test("errorToReadableMessage should return message when present in error", async () =>
    expect(errorToReadableMessage({ message: "unexpected error" })).toBe(
        "unexpected error"
    ));

test("errorToReadableMessage should return stringified error in all other cases", async () =>
    expect(errorToReadableMessage({ customError: "unexpected error" })).toBe(
        '{"customError":"unexpected error"}'
    ));


/*
old code

export function errorToString(error: any): string {
  if (!error) {
    return "Un unexpected error occurred";
  } else if (typeof error === "string") {
    return error;
  } else if (error?.error?.errorMessage) {
    // Keycloak specific error
    return error.error.errorMessage;
  } else if ("error" in error) {
    return errorToString(error.error);
  } else if (error instanceof Error || "message" in error) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
}
  
*/