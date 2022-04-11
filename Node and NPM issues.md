# Node and NPM issues

- [Node and NPM issues](#node-and-npm-issues)
  - [Node 17 incompatibility with `vue-cli-service`](#node-17-incompatibility-with-vue-cli-service)
  - [NPM Peer Dependency issue](#npm-peer-dependency-issue)
  - [References](#references)

## Node 17 incompatibility with `vue-cli-service`

Attempting to run `vue-cli-service` will fail under Node 17 unless the `--openssl-legacy-provider` flag is used with Node. This is a known [issue with Vue CLI].

:warning: Azure DevOps will not allow you to specify `--openssl-legacy-provider` in the `NODE_OPTIONS` environment variable.

    --openssl-legacy-provider is not allowed in NODE_OPTIONS

See [Node v17.0.0 release notes, "OpenSSL 3.0"](https://nodejs.org/en/blog/release/v17.0.0/#openssl-3-0)

[issue with Vue CLI]:https://github.com/vuejs/vue-cli/issues?q=is:issue+0308010C

## NPM Peer Dependency issue

A change to npm introduced at 8.6.0 caused `npm install` / `npm ci` to fail where it didn't before. This version of NPM changed the default behavior so that peer dependencies are now automatically installed by default.

An `.npmrc` file has been added with the following setting, which is equivalent to adding the `--legacy-peer-deps` flag to `npm install`

```ini
legacy-peer-deps=true
```

The `.npmrc` file was generated with the following command

```bash
npm config set legacy-peer-deps=true --location=project
```

This change has been tested with npm version 8.6.0, the latest version at the time this document was written.

## References

* [GitHub [BUG] non-previosly [sic] seen peer-dependency errors popping up in 8.6.0 #4664](https://github.com/npm/cli/issues/4664)
* [StackOverflow: "What does npm install --legacy-peer-deps do exactly? When is it recommended / What's a potential use case?"](https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh)

Below is the console output you will see when the error is encountered.

```cmd
C:\Users\your_user_name_would_be_here\source\repos\Traveler Information\TravelerInformationCoreMap [Develop ≡]> 
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR! 
npm ERR! While resolving: @vue/cli-plugin-eslint@4.5.15
npm ERR! Found: eslint@7.32.0
npm ERR! node_modules/eslint
npm ERR!   dev eslint@"^7.0.0" from the root project
npm ERR!   peer eslint@"^6.0.0 || ^7.0.0 || ^8.0.0" from @typescript-eslint/eslint-plugin@5
npm ERR!   node_modules/@typescript-eslint/eslint-plugin
npm ERR!     dev @typescript-eslint/eslint-plugin@"^5.11.0" from the root project
npm ERR!   11 more (@typescript-eslint/parser, ...)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer eslint@">= 1.6.0 < 7.0.0" from @vue/cli-plugin-eslint@4.5.15
npm ERR! node_modules/@vue/cli-plugin-eslint
npm ERR!   dev @vue/cli-plugin-eslint@"^4.5.15" from the root project
npm ERR! 
npm ERR! Conflicting peer dependency: eslint@6.8.0
npm ERR! node_modules/eslint
npm ERR!   peer eslint@">= 1.6.0 < 7.0.0" from @vue/cli-plugin-eslint@4.5.15
npm ERR!   node_modules/@vue/cli-plugin-eslint
npm ERR!     dev @vue/cli-plugin-eslint@"^4.5.15" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\your_user_name_would_be_here\AppData\Local\npm-cache\eresolve-report.txt for a full report

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\your_user_name_would_be_here\AppData\Local\npm-cache\_logs\2022-04-07T16_34_58_110Z-debug-
C:\Users\your_user_name_would_be_here\source\repos\Traveler Information\TravelerInformationCoreMap [Develop ≡]>
C:\Users\your_user_name_would_be_here\source\repos\Traveler Information\TravelerInformationCoreMap [Develop ≡ +0
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: wsdot-travel-center-map@1.0.5
npm ERR! Found: vue@3.2.31
npm ERR! node_modules/vue
npm ERR!   vue@"^3.2.30" from the root project
npm ERR!
npm ERR!   vue-fragment@"^1.5.2" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\your_user_name_would_be_here\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\your_user_name_would_be_here\AppData\Local\npm-cache\_logs\2022-04-07T16_36_13_522Z-debug-0.log
```
