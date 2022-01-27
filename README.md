# WSDOT Travel Center Map

This repository contains the source code for the [WSDOT Travel Center Map]

This project is utilizing

* [Vue] 3.x
* [TypeScript]
* [ArcGIS API for JavaScript] 4.X

## Developer Setup

* Install [Node] 16, which is the ["Active LTS" version] as of this writing.
  * Build tools currently not compatible with Node 17 due to an [issue with Vue CLI].
* Recommended development environment is [Visual Studio Code]

## Serve production build locally using `dotnet serve`

You can use the [dotnet-serve] tool to test the production build on your local machine.

```console
dotnet serve --path-base /Travel/Real-time/Map/ --directory dist --open-browser --gzip --brotli --cors --tls
```

The command below is a shorter version of the above command.

```console
dotnet serve --path-base /Travel/Real-time/Map/ -d=dist -ozbcS
```

## Build Status

| branch           | status                                                                                                                                                                                                                                                 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *default branch* | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804)                                       |
| main             | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=main)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=main)       |
| Develop          | [![Build Status](https://dev.azure.com/WSDOT/TravelerInformation/_apis/build/status/Travel%20Center/TravelerInformationCoreMap?branchName=Develop)](https://dev.azure.com/WSDOT/TravelerInformation/_build/latest?definitionId=804&branchName=Develop) |

["Active LTS" version]:https://nodejs.org/en/about/releases/
[ArcGIS API for JavaScript]:https://developers.arcgis.com/javascript/latest/
[issue with Vue CLI]:https://github.com/vuejs/vue-cli/issues?q=is:issue+0308010C\
[dotnet-serve]:https://github.com/natemcmaster/dotnet-serve
[Node]:https://nodejs.org/en/
[TypeScript]:https://www.typescriptlang.org/
[Visual Studio Code]:https://code.visualstudio.com/
[Vue]:https://vuejs.org/
[WSDOT Travel Center Map]:https://wsdot.com/travel/real-time/map/
