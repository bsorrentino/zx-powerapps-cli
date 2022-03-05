[![npm](https://img.shields.io/npm/v/@bsorrentino/zx-powerapps-cli.svg)](https://www.npmjs.com/package/@bsorrentino/zx-powerapps-cli)&nbsp;
<img src="https://img.shields.io/github/forks/bsorrentino/zx-powerapps-cli.svg">&nbsp;
<img src="https://img.shields.io/github/stars/bsorrentino/zx-powerapps-cli.svg">&nbsp;
<a href="https://github.com/bsorrentino/zx-powerapps-cli/issues">
<img src="https://img.shields.io/github/issues/bsorrentino/zx-powerapps-cli.svg"></a>&nbsp;
![npm publishing](https://github.com/bsorrentino/zx-powerapps-cli/actions/workflows/npm-publish.yml/badge.svg)

# zx-powerapps-cli

[ZX] scripts to simplify interactive [Powerapps CLI (pac)] usage

## Getting started 

```
npm install @bsorrentino/zx-powerapps-cli --save-dev
```

## Commands

### zx-export-solution
Export solution from powerapps a environment unpacking and saving it on local file system.
> Solution is exported in both **Managed** and **Unmanged** package type

#### Usage 
```
npx zx-export-solution [--authindex <n>]
```
Such command interactively ask for :
1. Authentication profile's index (if not provided on command line).
1. Solution's name that you've to export. Take note that available solutions will be displayed before 
1. Publish customization
1. Update version

### zx-import-solution
Pack solution from local file system and import it in a powerapps environment 

#### Usage 
```
npx zx-import-solution [--authindex <n>] [--solution <solution folder>] [--package Managed|Unmanaged|Both]
```
Such command interactively ask for :
1. Authentication profile's index (if not provided on command line).
1. Solution's folder (if not provided on command line) 
1. Update version

### zx-unpack-msapps
Unpack canvas app bundles (.msapp) contained in an exported solution

#### Usage 
```
npx zx-unpack-msapps [--solution <solution folder>]
```
Such command interactively ask for :
1. Solution's folder (if not provided on command line) 

[ZX]: https://www.npmjs.com/package/zx
[Powerapps CLI (pac)]: https://docs.microsoft.com/en-us/powerapps/developer/data-platform/powerapps-cli