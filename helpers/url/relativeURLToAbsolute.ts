/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export function relativeURLToAbsolute(relativeUrl: string): string {
    return (
        withoutTrailingSlash(document.baseURI ?? window.location.origin) +
        cleanPath(withLeadingSlash(relativeUrl))
    );
}
