/*
 * This program is under the terms of the GNU Affero General Public License version 3
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { expect, test } from "bun:test";
import {
  addLeadingSlash,
  cleanURI,
  extractPureURI,
  relativeURLToAbsolute,
  removeEndingSlash,
} from "./url";

// -- removeEndingSlash --------------------------------------------------------

test("removeEndingSlash should remove ending slash", () =>
  expect(removeEndingSlash("foo/")).toBe("foo"));
test("removeEndingSlash should do nothing for empty string", () =>
  expect(removeEndingSlash("")).toBe(""));
test("removeEndingSlash should return empty string from alone slash", () =>
  expect(removeEndingSlash("/")).toBe(""));
test("removeEndingSlash should do nothing for string without slash", () =>
  expect(removeEndingSlash("text-without-slash")).toBe("text-without-slash"));
test("removeEndingSlash should remove last slash of slashes", () =>
  expect(removeEndingSlash("/////////")).toBe("////////"));
test("removeEndingSlash should handle undefined", () =>
  expect(removeEndingSlash(undefined)).toBe(undefined));
test("removeEndingSlash should handle null", () =>
  expect(removeEndingSlash(null)).toBe(null));

// -- addLeadingSlash ----------------------------------------------------------

test("addLeadingSlash should do nothing is leading slash is already present", () =>
  expect(addLeadingSlash("foo")).toBe("/foo"));
test("addLeadingSlash should add leading slash from empty string", () =>
  expect(addLeadingSlash("")).toBe("/"));
test("addLeadingSlash should add leading slash", () =>
  expect(addLeadingSlash("text-without-slash")).toBe("/text-without-slash"));
test("addLeadingSlash should add leading slash of slashes", () =>
  expect(addLeadingSlash("/////////")).toBe("/////////"));
test("addLeadingSlash should do nothing from alone slash", () =>
  expect(addLeadingSlash("/")).toBe("/"));
test("addLeadingSlash should handle undefined", () =>
  expect(addLeadingSlash(undefined)).toBe(undefined));
test("addLeadingSlash should handle null", () =>
  expect(addLeadingSlash(null)).toBe(null));

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

// -- cleanURI -----------------------------------------------------------------

test("cleanURL should remove double slashes from given url", () =>
  expect(cleanURI("/home/path///something")).toBe("/home/path/something"));

test("cleanURL should ignore good url", () =>
  expect(cleanURI("/home/path/something")).toBe("/home/path/something"));

test("cleanURL should ignore empty string", () =>
  expect(cleanURI("")).toBe(""));

// -- relativeURLToAbsolute ----------------------------------------------------

test("relativeURLToAbsolute should use document.baseURI first", () => {
  global.document = {
    ...document,
    baseURI: "https://www.document.baseURI.com",
  };
  global.window = {
    ...window,
    location: {
      ...window.location,
      origin: "https://www.window.location.origin.com",
    },
  };

  expect(relativeURLToAbsolute("/test-url")).toBe(
    `${document.baseURI}/test-url`
  );
});

test("relativeURLToAbsolute should use window.location.origin secondly", () => {
  global.document = {
    ...document,
    baseURI: undefined,
  };
  global.window = {
    ...window,
    location: {
      ...window.location,
      origin: "https://www.window.location.origin.com",
    },
  };

  expect(relativeURLToAbsolute("/test-url")).toBe(
    `${window.location.origin}/test-url`
  );
});

test("relativeURLToAbsolute should clean URL", () => {
  global.document = {
    ...document,
    baseURI: "https://www.document.baseURI.com",
  };

  expect(relativeURLToAbsolute("test-url/////test")).toBe(
    `${document.baseURI}/test-url/test`
  );
});
