[![npm](https://img.shields.io/npm/v/@bsorrentino/zx-powerapps-cli.svg)](https://www.npmjs.com/package/@bsorrentino/zx-powerapps-cli)&nbsp;
<img src="https://img.shields.io/github/forks/bsorrentino/zx-powerapps-cli.svg">&nbsp;
<img src="https://img.shields.io/github/stars/bsorrentino/zx-powerapps-cli.svg">&nbsp;
<a href="https://github.com/bsorrentino/zx-powerapps-cli/issues">
<img src="https://img.shields.io/github/issues/bsorrentino/zx-powerapps-cli.svg"></a>&nbsp;
![npm publishing](https://github.com/bsorrentino/zx-powerapps-cli/actions/workflows/npm-publish.yml/badge.svg)

# zx-powerapps-cli

[ZX] scripts to simplify interactive [Powerapps CLI] (`PAC`) usage

## Getting started 

```
npm install @bsorrentino/zx-powerapps-cli --save-dev
```

## Scripts

### zx-export-solution
Export solution from powerapps a environment unpacking and saving it on local file system.
> Solution is exported in both **Managed** and **Unmanged** package type

#### Usage 
```
npx zx-export-solution [--authindex <n>] [--solution <solution name>]
```
Such command interactively ask for :
1. Authentication profile's index (if not provided on command line).
1. Solution's name that you've to export (if not provided on command line). 
   > Take note that available solutions will be displayed before
1. Publish customization
1. Create settings
   > the file generated will be `<solution>_settings/<auth profile>_settings.json`

### zx-import-solution
Pack solution from local file system and import it in a powerapps environment 

#### Usage 
```
npx zx-import-solution [--authindex <n>] [--solution <solution folder>] [--package Managed|Unmanaged|Both]
```
Such command interactively ask for :
1. Authentication profile's index (if not provided on command line).
1. Local solution's folder (if not provided on command line) 
1. Use settings file
   > This will be asked only if the settings file `<solution>_settings/<auth profile>_settings.json` exists 

### zx-version-bump
Update local and remote solution's version

#### Usage 
```
npx zx-version-bump [--authindex <n>] [--solution <solution folder>]
```
Such command interactively ask for :
1. Local solution's folder (if not provided on command line) 
1. Version bump strategy **increment build version** / **increment revision version**
1. Authentication profile's index (if not provided on command line).
1. Update online version with the same version of the local one

### zx-unpack-msapps
Unpack canvas app bundles (.msapp) contained in an exported solution

#### Usage 
```
npx zx-unpack-msapps [--solution <solution folder>]
```
Such command interactively ask for :
1. Solution's folder (if not provided on command line) 

## Reference 

* [Powerapps CLI](https://docs.microsoft.com/en-us/power-apps/developer/data-platform/powerapps-cli#common-commands)
* [Generating Solution Settings File via the Microsoft Power Platform CLI](https://crmchap.co.uk/generating-solution-settings-file-via-the-microsoft-power-platform-cli/)

[Powerapps CLI]: https://docs.microsoft.com/en-us/power-apps/developer/data-platform/powerapps-cli#common-commands
[ZX]: https://www.npmjs.com/package/zx
[Powerapps CLI (pac)]: https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli