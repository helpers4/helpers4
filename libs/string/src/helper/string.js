"use strict";
/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelize = void 0;
/**
 * Transform string to lowercase with capitalized first letters and with spaces between words
 *
 * @param str the string to convert
 */
function labelize(str) {
    return str
        .split(/[-_ ]+/)
        .map(function (word) { return word[0].toUpperCase() + word.slice(1).toLowerCase(); })
        .join(' ');
}
exports.labelize = labelize;
