# Deprecated packages in use by this project

These are the warnings about deprecated packages that are displayed upon running the `npm ci` command.

Most of these are nested dependencies, not direct dependencies listed in the `package.json` file. You can use the `npm explain` command to see the dependency chain for any of the packages listed. Once you've determined which package is depending on of these packages, upgrading that parent package to the latest version may in turn resolve the issue.

| Package       | Version | Introduced by                      | Deprecation Message                                                                                                                                                                         |
| ------------- | ------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| har-validator | 5.1.5   | @analytics/google-analytics google | this library is no longer supported                                                                                                                                                         |
| uuid          | 3.4.0   | universal-analytics                | Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details. |
| request       | 2.88.2  | @analytics/google-analytics        | request has been deprecated, see https://github.com/request/request/issues/3142                                                                                                             |

    har-validator@5.1.5 dev
    node_modules/har-validator
    har-validator@"~5.1.3" from request@2.88.2
    node_modules/request
        request@"^2.88.2" from universal-analytics@0.4.23
        node_modules/universal-analytics
        universal-analytics@"^0.4.20" from @analytics/google-analytics@0.5.3
        node_modules/@analytics/google-analytics
            dev @analytics/google-analytics@"^0.5.3" from the root project

    uuid@8.3.2 dev
    node_modules/sockjs/node_modules/uuid
    uuid@"^8.3.2" from sockjs@0.3.24
    node_modules/sockjs
        sockjs@"^0.3.21" from webpack-dev-server@4.8.1
        node_modules/webpack-dev-server
        webpack-dev-server@"^4.7.3" from @vue/cli-service@5.0.4
        node_modules/@vue/cli-service
            dev @vue/cli-service@"^5.0.4" from the root project

    uuid@3.4.0 dev
    node_modules/uuid
    uuid@"^3.3.2" from request@2.88.2
    node_modules/request
        request@"^2.88.2" from universal-analytics@0.4.23
        node_modules/universal-analytics
        universal-analytics@"^0.4.20" from @analytics/google-analytics@0.5.3
        node_modules/@analytics/google-analytics
            dev @analytics/google-analytics@"^0.5.3" from the root project
    uuid@"^3.0.0" from universal-analytics@0.4.23
    node_modules/universal-analytics
        universal-analytics@"^0.4.20" from @analytics/google-analytics@0.5.3
        node_modules/@analytics/google-analytics
        dev @analytics/google-analytics@"^0.5.3" from the root project

    request@2.88.2 dev
    node_modules/request
    request@"^2.88.2" from universal-analytics@0.4.23
    node_modules/universal-analytics
        universal-analytics@"^0.4.20" from @analytics/google-analytics@0.5.3
        node_modules/@analytics/google-analytics
        dev @analytics/google-analytics@"^0.5.3" from the root project