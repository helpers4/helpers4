import { expect, test } from "bun:test";
import { meaningPromiseOrThrow } from "./meaningPromiseOrThrow";

// -- meaningPromiseOrThrow ----------------------------------------------------

[
    { value: undefined, label: "undefined" },
    { value: null, label: "null" },
    { value: "", label: "empty string" },
    { value: [], label: "empty array" },
    { value: {}, label: "empty object" },
].forEach(({ value, label }) => {
    test("meaningPromiseOrThrow intercepts " + label, async () => {
        const message = "My custom error message";
        const result = await Promise.resolve(value)
            .then(meaningPromiseOrThrow(message))
            .catch((e) => e.message);
        return expect(result).toBe(message);
    });
});

[
    { value: "some string", label: "string" },
    { value: true, label: "true" },
    { value: false, label: "false" },
    { value: 0, label: "zero" },
    { value: 42, label: "number" },
    { value: [42], label: "array" },
    { value: { prop: 42 }, label: "object" },
].forEach(({ value, label }) => {
    test("meaningPromiseOrThrow ignores " + label, async () => {
        const message = "My custom error message";
        const result = await Promise.resolve(value)
            .then(meaningPromiseOrThrow(message))
            .catch((e) => e.message);
        return expect(result).toBe(value);
    });
});
