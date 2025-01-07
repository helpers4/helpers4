/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export function falsyPromiseOrThrow<T>(error: string): (data: T) => T | never {
    return (data: unknown) => {
        if (data) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error(error);
        } else {
            return data as T;
        }
    };
}
