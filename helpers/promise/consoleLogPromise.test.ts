import { expect, spyOn, test } from "bun:test";
import { consoleLogPromise } from "./consoleLogPromise";

// -- consoleLogPromise --------------------------------------------------------

const prefix = "My custom error message";

[
    { value: undefined, label: "undefined" },
    { value: null, label: "null" },
    { value: "string", label: "string" },
    { value: 42, label: "number" },
].forEach(({ value, label }) => {
    test("consoleLogPromise logs " + label, async () => {
        const spy = spyOn(console, "log");
        await Promise.resolve(value).then(consoleLogPromise(prefix));
        expect(spy).toHaveBeenCalledWith(prefix, value);
    });
});
