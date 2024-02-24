/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Simple helper method that remove an ending slash `/` if present.
 *
 * ### Example (es module)
 * ```js
 * import { removeEndingSlash } from '@helpers4/url'
 * console.log(removeEndingSlash('https://www.google.com/'))
 * // => 'https://www.google.com'
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var removeEndingSlash = require('@helpers4/url').removeEndingSlash;
 * console.log(removeEndingSlash('https://www.google.com/'))
 * // => 'https://www.google.com'
 * ```
 *
 * @param url a valid URL
 */
export function removeEndingSlash(url: string): string {
  return url[url.length - 1] === '/' ? url.slice(0, -1) : url;
}

/**
 * Simple helper method that add a leading slash `/` if not yet present.
 *
 * ### Example (es module)
 * ```js
 * import { addLeadingSlash } from '@helpers4/url'
 * console.log(addLeadingSlash('your/path/without/leading/slash'))
 * // => '/your/path/with/leading/slash'
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var addLeadingSlash = require('@helpers4/url').addLeadingSlash;
 * console.log(addLeadingSlash('your/path/without/leading/slash'))
 * // => '/your/path/with/leading/slash'
 * ```
 *
 * @param url a valid URL
 */
export function addLeadingSlash(url: string): string {
  return url[0] === '/' ? url : '/' + url;
}

/**
 * Extract only the URI from a path with optional query and fragments.
 *
 * For example, all these parameters will returns `/path`:
 *  - `/path`
 *  - `/path?query=thing`
 *  - `/path#fragment`
 *  - `/path?query=thing#fragment`
 *
 * ### Example (es module)
 * ```js
 * import { extractPureURI } from '@helpers4/url'
 * console.log(extractPureURI('https://www.google.com/?q=search'))
 * // => 'https://www.google.com/'
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var extractPureURI = require('@helpers4/url').extractPureURI;
 * console.log(extractPureURI('https://www.google.com/?q=search'))
 * // => 'https://www.google.com/'
 * ```
 *
 * @param path a complete path without server part.
 */
export function extractPureURI(path: string): string {
  return path.split(/[?#]/)[0];
}
