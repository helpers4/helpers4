/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

// -- labelize -----------------------------------------------------------------

/**
 * Transform string to lowercase with capitalized first letters and with spaces between words
 *
 * @param str the string to convert
 */
export function labelize(str: string): string {
  return str
    .split(/[-_ ]+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// -- errorToString ------------------------------------------------------------

/**
 * Stringify an error.
 *
 * Will try to extract:
 *  - .error.errorMessage
 *  - .error
 *  - .message
 *  - <stringify>
 *
 * @param error any error
 * @returns The stringified error
 */
export function errorToString(error: any): string {
  if (typeof error === "string") {
    return error;
  } else if (error?.error?.errorMessage) {
    return error.error.errorMessage;
  } else if ("error" in error) {
    return errorToString(error.error);
  } else if (error instanceof Error || "message" in error) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
}
