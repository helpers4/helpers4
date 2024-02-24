/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Transform string to lowercase with capitalized first letters and with spaces between words
 *
 * @param str the string to convert
 */
export function labelize(str: string): string {
  return str
    .split(/[-_ ]+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
