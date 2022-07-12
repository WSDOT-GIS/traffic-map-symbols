# WSDOT Travel Center Map

This repository contains the source code for the [WSDOT Travel Center Map]

## Build Status

| branch           | status                                          |
| ---------------- | ----------------------------------------------- |
| *default branch* | [![Build Status][badge]][build]                 |
| main             | [![Build Status][badge:main]][build:main]       |
| Develop          | [![Build Status][badge:develop]][build:develop] |

[badge]:https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap
[badge:main]:https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=main
[badge:develop]:https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=Develop
[build]:https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804
[build:main]:https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=main
[build:develop]:https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=Develop

## This project is utilizing

* [Vue] 3.x
* [TypeScript]
* [ArcGIS API for JavaScript] 4.X

## Developers

### Prerequisites

* Install [Node]. You can use [nvm-windows](#nvm-windows) to switch between different versions of Node.
* Recommended development environment is [Visual Studio Code].
  * See [Using Vue with Typescript] for details on how to set up Visual Studio Code for Vue projects.
  * The `.vscode/extensions.json` file is configured to recommend Visual Studio Code extensions for this project. You can view the recommended extensions in the *Extensions* panel (Ctrl + Shift + X).

### nvm-windows

[nvm-windows] is a Node version manager for Windows. Allows switching between different versions of node. [Recommended by Microsoft's documentation][Install NodeJS on Windows]. Once installed, it can be accessed via the `nvm` command.

:warning: Note that you must be running as an administrator for the `nvm` commands to work correctly.

### Setup

1. Clone this repository locally to your computer using `git clone` command.
2. Change to the directory created by `git clone` and run `npm install`.

### Updating ArcGIS API for JavaScript

When you update the version of [ArcGIS API for JavaScript] used by the project, do so in these areas.

* Update CSS reference in `src\components\EsriMapView.vue`. The version number and URL of this CSS will be different when upgrading.

  ```css
  @import "https://js.arcgis.com/4.22/@arcgis/core/assets/esri/themes/light/main.css";
  ```

* Update the versions in the NPM package configuration file, `package.json`.
  * `@arcgis/core`
  * `@types/arcgis-js-api`

### Configuration

#### Browser Compatibility

See [Vue CLI: Browser Compatibility](https://cli.vuejs.org/guide/browser-compatibility.html#browserslist) for details.

The file `.browserslistrc` is a [browserslist] configuration file that tells the build process which browsers to support.

## Serve production build locally using `dotnet serve`

You can use the [dotnet-serve] tool to test the production build on your local machine.

### Install

You can install [dotnet-serve] using the following command, which uses the `.config/dotnet-tools.json` file.

```pwsh
dotnet tools restore
```

### Run

The following command will run [dotnet-serve] with the settings defined in `.netconfig`.

```pwsh
dotnet serve
```

## Additional documentation

* [Packages](packages.md)

<!-- 
## YAML schema file

The file `wsdot-devops-pipeline-yaml-schema.json` was copied from <https://dev.azure.com/wsdot/_apis/distributedtask/yamlschema>. It is used by the ["Azure Pipelines" Visual Studio Code extension] to aid in editing the `azure-pipelines.yml` file. -->

["Active LTS" version]:https://nodejs.org/en/about/releases/
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/latest/
[browserslist]:https://github.com/browserslist/browserslist
[dotnet-serve]:https://github.com/natemcmaster/dotnet-serve
[Node]:https://nodejs.org/en/
[TypeScript]:https://www.typescriptlang.org/
[Visual Studio Code]:https://code.visualstudio.com/
[Using Vue with Typescript]:https://vuejs.org/guide/typescript/overview.html
[Vue]:https://vuejs.org/
[WSDOT Travel Center Map]:https://wsdot.com/travel/real-time/map/
["Azure Pipelines" Visual Studio Code extension]:https://marketplace.visualstudio.com/items?itemName=ms-azure-devops.azure-pipelines
[nvm-windows]:https://github.com/coreybutler/nvm-windows
[Install NodeJS on Windows]:https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
