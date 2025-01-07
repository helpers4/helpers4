import { returnOrThrowError } from "./returnOrThrowError";

describe("returnOrThrowError", () => {
    [
        { label: "string", value: "a string" },
        { label: "empty string", value: "" },
        { label: "number", value: 42 },
        { label: "zero", value: 0 },
        { label: "true", value: true },
        { label: "false", value: false },
    ].forEach(({ label, value }) => {
        it(`should return ${label}`, () => {
            expect(returnOrThrowError(value, "an non-expected value")).toEqual(value);
        });
    });

    [
        { label: "undefined", value: undefined },
        { label: "null", value: null },
    ].forEach(({ label, value }) => {
        it(`should return error when ${label}`, () => {
            const error = `an ${label} value`;
            expect(() => returnOrThrowError(value, error)).toThrow(new Error(error));
        });
    });
});
