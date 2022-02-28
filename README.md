# WSDOT Travel Center Map

This repository contains the source code for the [WSDOT Travel Center Map]

## Python Scripts

Python scripts for updating JSON data used by the map application are in the `external_scripts` subfolder. This folder is ignored by Visual Studio Code when opening the root. To work on the Python scripts, you must open Visual Studio Code from the `external_scripts` subfolder.

## This project is utilizing

* [Vue] 3.x
* [TypeScript]
* [ArcGIS API for JavaScript] 4.X

## Developers

### Prerequisites

* Install [Node] 16, which is the ["Active LTS" version] as of this writing.
  * Build tools currently not compatible with Node 17 due to an [issue with Vue CLI].
* Recommended development environment is [Visual Studio Code].
  * The `.vscode/extensions.json` file is configured with recommended extensions (including Vetur, as recommended by the Vue [tutorial on the VS Code website][Using Vue in Visual Studio Code].) You can view the recommended extensions in the *Extensions* panel (Ctrl + Shift + X).

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

## Resources

* [Using Vue in Visual Studio Code]
* [Vue.js: TypeScript Support](https://v3.vuejs.org/guide/typescript-support.html)
  * [Vue CLI: TypeScript](https://cli.vuejs.org/config/#typescript)

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

* [Pacakges](packages.md)
* [List of deprecated NPM pacakges currently in use by this project](deprecated-packages.md)

## Build Status

| branch           | status                                                                                                                                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *default branch* | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804)                                       |
| main             | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=main)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=main)       |
| Develop          | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=Develop)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=Develop) |

["Active LTS" version]:https://nodejs.org/en/about/releases/
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/latest/
[browserslist]:https://github.com/browserslist/browserslist
[issue with Vue CLI]:https://github.com/vuejs/vue-cli/issues?q=is:issue+0308010C
[dotnet-serve]:https://github.com/natemcmaster/dotnet-serve
[Node]:https://nodejs.org/en/
[TypeScript]:https://www.typescriptlang.org/
[Visual Studio Code]:https://code.visualstudio.com/
[Using Vue in Visual Studio Code]:https://code.visualstudio.com/docs/nodejs/vuejs-tutorial
[Vue]:https://vuejs.org/
[WSDOT Travel Center Map]:https://wsdot.com/travel/real-time/map/
