---
id: configuring-swc
title: Configuring swc
sidebar_label: Configuring swc
---

Swc can be configured with `.swcrc` file.

# jsc

## jsc.parser

`typescript`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": false,
      "decorators": false
    }
  }
}
```

`ecmascript`:
```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": false,
      "numericSeparator": false,
      "classPrivateProperty": false,
      "privateMethod": false,
      "classProperty": false,
      "functionBind": false,
      "decorators": false,
      "decoratorsBeforeExport": false
    }
  }
}
```

## jsc.target
Starting from `@swc/core` v1.0.27, you can specify target environment by using the field.
```json
{
  "jsc": {
    // Disable es3 / es5 / es2015 transforms
    "target": "es2016"
  }
}
```
Possible values are `es3`, `es5`, `es2015`, `es2016`, `es2017`, `es2018`.

## jsc.transform

Example

```json
{
  "jsc": {
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false
      },
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}

```

### jsc.transform.react

 - `pragma`
 Replace the function used when compiling JSX expressions.

Defaults to `React.createElement`.

 - `pragmaFrag`
Replace the component used when compiling JSX fragments.

Defaults to `React.Fragment`


 - `throwIfNamespace`
 Toggles whether or not to throw an error if a XML namespaced tag name is used. For example: `<f:image />`

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.

 - `development`
 Toggles plugins that aid in development, such as `jsx-self` and `jsx-source`.

 - `useBuiltins`
 Use `Object.assign()` instead of `_extends`. Defaults to false.


### jsc.transform.optimizer
 - Setting this to `undefined` skips optimizer pass

#### jsc.transform.optimizer.globals

 - `vars`
Variables to inline.

e.g.
`.swcrc`:
```json
{
  "jsc": {
    "transform": {
      "optimizer": {
        "globals": {
          "vars": {
            "__DEBUG__": "true"
          }
        }
      }
    }
  }
}
```

`npx swc '__DEBUG__' --filename input.js`:
```js
true
```

## module
swc can transpile es6 modules to common js module, umd module or amd module.

### shared options
These options are shared by common js / umd / amd.



`.swcrc`:
```json
{
  "module": {
    // You can specify "commonjs", "amd", "umd"
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

#### strict

By default, when using exports with swc a non-enumerable `__esModule` property is exported. In some cases this property is used to determine if the import is the default export or if it contains the default export.
          
In order to prevent the `__esModule` property from being exported, you can set the strict option to true.

Defaults to `false`.


#### strictMode

If true, swc emits 'use strict' directive.

Defaults to `true`.

#### lazy


Changes Babel's compiled import statements to be lazily evaluated when their imported bindings are used for the first time. This can improve initial load time of your module because evaluating dependencies up front is sometimes entirely un-necessary. This is especially the case when implementing a library module.


The value of `lazy` has a few possible effects:
- `false` - No lazy initialization of any imported module.
- `true` - Do not lazy-initialize local `./foo` imports, but lazy-init `foo` dependencies.
Local paths are much more likely to have circular dependencies, which may break if loaded lazily,
so they are not lazy by default, whereas dependencies between independent modules are rarely cyclical.
- `Array<string>` - Lazy-initialize all imports with source matching one of the given strings.

-----

The two cases where imports can never be lazy are:
- `import "foo";`
Side-effect imports are automatically non-lazy since their very existence means
that there is no binding to later kick off initialization.
- `export from "foo"`
Re-exporting all names requires up-front execution because otherwise there is no
way to know what names need to be exported.

Defaults to `false`.


#### noInterop
By default, when using exports with swc a non-enumerable __esModule property is exported.
This property is then used to determine if the import is the default export or if it contains the default export.
   
In cases where the auto-unwrapping of default is not needed, you can set the noInterop option to true to avoid the usage of the interopRequireDefault helper (shown in inline form above).
   
Defaults to `false`.

### common js
To emit common js module, you can do so by

`.swcrc`:
```json
{
  "module": {
    "type": "commonjs",

    // These are defaults.
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

### amd
To emit amd module, you can do so by

`.swcrc`:
```json
{
  "module": {
    "type": "amd",
    // Optional. If specified, swc emits named amd module.
    "moduleId": "foo",

    // These are defaults.
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

#### moduleId
Defaults to `undefined`. If specified, swc emits named amd module.


### umd
To emit umd module, you can do so by

`.swcrc`:
```json
{
  "module": {
    "type": "umd",
    "globals": {},

    // These are defaults.
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

#### globals

TODO

## minify
To get minified output, you can configure swc by

`.swcrc`:
```json
{
  "minify": true
}
```