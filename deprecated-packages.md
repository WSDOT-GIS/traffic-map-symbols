# Deprecated packages in use by this project

These are the warnings about deprecated packages that are displayed upon running the `npm ci` command.

Most of these are nested dependencies, not direct dependencies listed in the `package.json` file. You can use the `npm explain` command to see the dependency chain for any of the packages listed. Once you've determined which package is depending on of these packages, upgrading that parent package to the latest version may in turn resolve the issue.

| Package             | Version | Deprecation Message                                                                                                                                                                           |
|---------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| source-map-url      | 0.4.1   | See <https://github.com/lydell/source-map-url#deprecated>                                                                                                                                     |
| eslint-loader       | 2.2.1   | This loader has been deprecated. Please use eslint-webpack-plugin                                                                                                                             |
| @hapi/topo          | 3.1.6   | This version has been deprecated and is no longer supported or maintained                                                                                                                     |
| @hapi/bourne        | 1.3.2   | This version has been deprecated and is no longer supported or maintained                                                                                                                     |
| urix                | 0.1.0   | Please see <https://github.com/lydell/urix#deprecated>                                                                                                                                        |
| har-validator       | 5.1.5   | this library is no longer supported                                                                                                                                                           |
| source-map-resolve  | 0.5.3   | See <https://github.com/lydell/source-map-resolve#deprecated>                                                                                                                                 |
| chokidar            | 2.1.8   | Chokidar 2 does not receive security updates since 2019. Upgrade to chokidar 3 with 15x fewer dependencies                                                                                    |
| chokidar            | 2.1.8   | Chokidar 2 does not receive security updates since 2019. Upgrade to chokidar 3 with 15x fewer dependencies                                                                                    |
| resolve-url         | 0.2.1   | <https://github.com/lydell/resolve-url#deprecated>                                                                                                                                            |
| html-webpack-plugin | 3.2.0   | 3.x is no longer supported                                                                                                                                                                    |
| @hapi/address       | 2.1.4   | Moved to 'npm install @sideway/address'                                                                                                                                                       |
| querystring         | 0.2.0   | The querystring API is considered Legacy. new code should use the URLSearchParams API instead.                                                                                                |
| uuid                | 3.4.0   | Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See <https://v8.dev/blog/math-random> for details. |
| request             | 2.88.2  | request has been deprecated, see <https://github.com/request/request/issues/3142>                                                                                                             |
| @hapi/hoek          | 8.5.1   | This version has been deprecated and is no longer supported or maintained                                                                                                                     |
| @hapi/joi           | 15.1.1  | Switch to 'npm install joi'                                                                                                                                                                   |
| svgo                | 1.3.2   | This SVGO version is no longer supported. Upgrade to v2.x.x.                                                                                                                                  |
