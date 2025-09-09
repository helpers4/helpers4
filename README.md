# @helpers4

The `@helpers4` are a collection of helper functions for use in any project, whatever the framework.
Every helper is a standalone module and supports tree-shaking, so you can use only the helpers you need without embedding the whole library.

## Project Context

**Index and Naming**: All functions are automatically exported in their respective module's `index.ts` file during build. All comparison functions follow uniform naming conventions (e.g., `quickCompare`, `deepCompare`, `compare`) within their respective modules (object, array, date, etc.), ensuring consistency across the library.

**Modular Architecture**: Each helper category is organized in its own folder with specific functionality:

- **object/**: Object manipulation and comparison
- **array/**: Array operations and comparison  
- **date/**: Date utilities, comparison, and checks
- **string/**: String manipulation helpers
- **number/**: Numeric operations
- **promise/**: Promise utilities
- **observable/**: RxJS Observable helpers

## @helpers4/url

A set of helpers for working with URLs.

## Documentation

[https://helpers4.github.io/url](https://helpers4.github.io/url)

## See

- [@helpers4/observable](https://www.npmjs.com/package/@helpers4/observable)
- [@helpers4/promise](https://www.npmjs.com/package/@helpers4/promise)
- [@helpers4/string](https://www.npmjs.com/package/@helpers4/string)
- [@helpers4/url](https://www.npmjs.com/package/@helpers4/url)

## Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 150.0; height: 150.0">
        <a href=https://github.com/baxyz>
            <img src=https://avatars.githubusercontent.com/u/7852177?v=4 width="100;"  alt=Bérenger/>
            <br />
            <sub style="font-size:14px"><b>Bérenger</b></sub>
        </a>
    </td>
</tr>
</table>
