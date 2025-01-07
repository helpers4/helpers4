/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export function consoleLogPromise<T>(prefix?: string): (data: T) => T {
    return (data: T) => {
        console.log(prefix, data);
        return data;
    };
}
