/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, test } from "bun:test";
import { extractPureURI } from "./extractPureURI";

// -- extractPureURI -----------------------------------------------------------

test("extractPureURI should extract URI from URL with query", () =>
    expect(extractPureURI("www.foo.com/api/?=bar")).toBe("www.foo.com/api/"));
test("extractPureURI should extract URI from URL with fragment", () =>
    expect(extractPureURI("www.foo.com/api/#userInfos")).toBe(
        "www.foo.com/api/"
    ));
test("extractPureURI should do nothing from empty string", () =>
    expect(extractPureURI("")).toBe(""));
test("extractPureURI should do nothing from standalone slash", () =>
    expect(extractPureURI("/")).toBe("/"));
test("extractPureURI should do nothing from simple text", () =>
    expect(extractPureURI("text-without-slash")).toBe("text-without-slash"));
test("extractPureURI should do nothing from slashes", () =>
    expect(extractPureURI("/////////")).toBe("/////////"));
test("extractPureURI should handle undefined", () =>
    expect(extractPureURI(undefined)).toBe(undefined));
test("extractPureURI should handle null", () =>
    expect(extractPureURI(null)).toBe(null));
