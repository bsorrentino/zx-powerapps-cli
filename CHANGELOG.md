# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.3](https://github.com/mokkapps/changelog-generator-demo/compare/v1.5.1...v1.5.3) (2022-06-17)


### Bug Fixes

* **settings:** set right auth profile as settings file name ([e7c0928](https://github.com/mokkapps/changelog-generator-demo/commits/e7c092883bfb130355206d9558517231f716d5f1))


### Build

* add 'release' script ([72761f7](https://github.com/mokkapps/changelog-generator-demo/commits/72761f7381ff18313b55e840e86657830d59a0de))

### [1.5.1](https://github.com/mokkapps/changelog-generator-demo/compare/v1.5.0...v1.5.1) (2022-06-15)


### Refactoring

* **zx-version-bump:** add trailing space to question ([3a23ba2](https://github.com/mokkapps/changelog-generator-demo/commits/3a23ba255512f95982b19ac6f5a4d5d021e5aee1))

## [1.5.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.4.0...v1.5.0) (2022-05-01)


### Features

* add utility functions 'askYesOrNo' and 'askNoOrYes' and fix 'askForAuthProfile' ([dfe30c6](https://github.com/mokkapps/changelog-generator-demo/commits/dfe30c6121ae57f721a93eadb4e0bc4a2ea81420))
* **auth-profile:** obtain the auth profile name during authentication phase ([ca3d09a](https://github.com/mokkapps/changelog-generator-demo/commits/ca3d09ae3adc299d0f78c0f7dd2c6d03ebbbce89))
* **create-settings:** add createsettings on solution export ([67d8a9b](https://github.com/mokkapps/changelog-generator-demo/commits/67d8a9b11e53542ba1c9bc9def80324e06aec86a)), closes [#2](https://github.com/bsorrentino/zx-powerapps-cli/issues/2)
* **export-solution:** refine create settings implementation ([81c5615](https://github.com/mokkapps/changelog-generator-demo/commits/81c56152df08217853f0b7d3d0f1f5247ae4a997)), closes [#2](https://github.com/bsorrentino/zx-powerapps-cli/issues/2)
* **import-solution:** add support for importing settings file if exist ([7e9969e](https://github.com/mokkapps/changelog-generator-demo/commits/7e9969ee0903958b85ccbf8717412099a144ac5d)), closes [#2](https://github.com/bsorrentino/zx-powerapps-cli/issues/2)
* **utils:** add 'getSettingsFile' function ([30f70c3](https://github.com/mokkapps/changelog-generator-demo/commits/30f70c34ff4294471f779e485fa97f156fd2546b)), closes [#2](https://github.com/bsorrentino/zx-powerapps-cli/issues/2)


### Build

* **zx:** update zx dep to 6.1.0 ([b012b5b](https://github.com/mokkapps/changelog-generator-demo/commits/b012b5ba93f5fcd36e8cbf6edfa697ef9c929c5a))


### Documentation

* **readme:** update readme ([1b9b9b5](https://github.com/mokkapps/changelog-generator-demo/commits/1b9b9b579cfbcde90e75e745200cbfefa978f04c)), closes [#2](https://github.com/bsorrentino/zx-powerapps-cli/issues/2)

## [1.4.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.3.1...v1.4.0) (2022-03-29)


### Bug Fixes

* **zx-version-bump:** set the right script for zx-version-bump ([f5e530c](https://github.com/mokkapps/changelog-generator-demo/commits/f5e530ca82d57264b3b7a92150f09557868cdbf6))

### [1.3.1](https://github.com/mokkapps/changelog-generator-demo/compare/v1.3.0...v1.3.1) (2022-03-26)


### Documentation

* update readme ([f25accc](https://github.com/mokkapps/changelog-generator-demo/commits/f25accc456d80f3247ada940d9c91ae7409b809f))

## [1.3.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.2.0...v1.3.0) (2022-03-26)


### Features

* **askforsolutionfolder:** check solution folder existence [#1](https://github.com/bsorrentino/zx-powerapps-cli/issues/1) ([f15b773](https://github.com/mokkapps/changelog-generator-demo/commits/f15b773373011222c468a858ad7939b43c5eecb5))
* **version-bump:** complete implementation for version bump ([27ac5e8](https://github.com/mokkapps/changelog-generator-demo/commits/27ac5e8304d1135a8f7e0095b7f72d1ef2167a44))


### Build

* add new script as binary ([e506e98](https://github.com/mokkapps/changelog-generator-demo/commits/e506e98863fbd33c21c6d161054ecce7ea417c35))
* upgrade zx dep ([8a27a53](https://github.com/mokkapps/changelog-generator-demo/commits/8a27a5362f52d3090a6251fa038c6b00b0dd664d))

## [1.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.1.0...v1.2.0) (2022-03-25)

### [1.0.5](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.4...v1.0.5) (2022-03-11)


### Features

* **export-solution:** add support for cli argument 'solution name' ([2a75b3f](https://github.com/mokkapps/changelog-generator-demo/commits/2a75b3fc8b668c8c160e95b393cd9589998860f3))


### Documentation

* **readme:** update readme ([1095f02](https://github.com/mokkapps/changelog-generator-demo/commits/1095f02b545122607283d5e3757f8977ab7e2584))


### Build

* update version ([777256a](https://github.com/mokkapps/changelog-generator-demo/commits/777256a159a0e262302b9c25a11d666c3f006528))


### Refactoring

* **export-solution:** rename main function ([e91db37](https://github.com/mokkapps/changelog-generator-demo/commits/e91db373cdeec1fbcab7253d9a6f47c4af3e640f))

## [1.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.5...v1.1.0) (2022-03-25)


### Features

* remove update version both from import/export solution ([5b48d80](https://github.com/mokkapps/changelog-generator-demo/commits/5b48d807085a56207629e212347f49bacaf5fc20))


### Build

* add and configure standard-version ([e9dc3e1](https://github.com/mokkapps/changelog-generator-demo/commits/e9dc3e1faae32ba75664c22afb6d54b08c523a84))

### [1.0.5](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.4...v1.0.5) (2022-03-11)


### Features

* **export-solution:** add support for cli argument 'solution name' ([2a75b3f](https://github.com/mokkapps/changelog-generator-demo/commits/2a75b3fc8b668c8c160e95b393cd9589998860f3))


### Documentation

* **readme:** update readme ([1095f02](https://github.com/mokkapps/changelog-generator-demo/commits/1095f02b545122607283d5e3757f8977ab7e2584))
* updae readme ([04d8af5](https://github.com/mokkapps/changelog-generator-demo/commits/04d8af508318aa32cd1cdd5c1f0383277525f72a))


### Build

* update version ([777256a](https://github.com/mokkapps/changelog-generator-demo/commits/777256a159a0e262302b9c25a11d666c3f006528))


### Refactoring

* **export-solution:** rename main function ([e91db37](https://github.com/mokkapps/changelog-generator-demo/commits/e91db373cdeec1fbcab7253d9a6f47c4af3e640f))

### [1.0.4](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.2...v1.0.4) (2022-03-03)


### Refactoring

* update shebang ([d0ec7f0](https://github.com/mokkapps/changelog-generator-demo/commits/d0ec7f0307955e5d60f6ce69e3136dbc3a77e2df))


### Build

* add engine info ([8f99da1](https://github.com/mokkapps/changelog-generator-demo/commits/8f99da12d8648cda46e7cef7d9d7b32969667f0f))
* update bin assets ([227f453](https://github.com/mokkapps/changelog-generator-demo/commits/227f4530c53307cfdca2114b9f9a0e1fb1e23aa7))


### Documentation

* update readme ([2f9faa7](https://github.com/mokkapps/changelog-generator-demo/commits/2f9faa73aa3708de43715d9ed02ea0a6d0470d66))

### [1.0.2](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.1...v1.0.2) (2022-03-02)


### Features

* **export-solution:** add request for update solution's version ([f2c95a5](https://github.com/mokkapps/changelog-generator-demo/commits/f2c95a5bd65d8ffa972891f8c91fb5c1784e1a1a))


### Documentation

* **readme:** update ([ca0a902](https://github.com/mokkapps/changelog-generator-demo/commits/ca0a902b89b975bb95e408f4eeba654a44ac3595))


### Build

* new release & update doc ([6787118](https://github.com/mokkapps/changelog-generator-demo/commits/67871183a73535fe7fc769557bcf724175488ce3))

### [1.0.1](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.0...v1.0.1) (2022-02-28)


### Bug Fixes

* **zx-export-solution:** fix regexp to detect remote solution ([16c9198](https://github.com/mokkapps/changelog-generator-demo/commits/16c9198ddb7ec8bbc78830bb57e4a16a8354cf20))


### Documentation

* **readme:** update readme ([0117c3b](https://github.com/mokkapps/changelog-generator-demo/commits/0117c3b1a1b6dfc5138088033e70b128967ca40a))
* **readme:** update readme ([325bebd](https://github.com/mokkapps/changelog-generator-demo/commits/325bebddbf013e70d62af231370a3218893547d7))


### Build

* update version ([c6a67f6](https://github.com/mokkapps/changelog-generator-demo/commits/c6a67f60b8be7a38ed2eedea29e9063ffe6712f7))

## [1.4.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.3.1...v1.4.0) (2022-03-29)


### Bug Fixes

* **zx-version-bump:** set the right script for zx-version-bump ([f5e530c](https://github.com/mokkapps/changelog-generator-demo/commits/f5e530ca82d57264b3b7a92150f09557868cdbf6))

### [1.3.1](https://github.com/mokkapps/changelog-generator-demo/compare/v1.3.0...v1.3.1) (2022-03-26)


### Documentation

* update readme ([f25accc](https://github.com/mokkapps/changelog-generator-demo/commits/f25accc456d80f3247ada940d9c91ae7409b809f))

## [1.3.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.2.0...v1.3.0) (2022-03-26)


### Features

* **askforsolutionfolder:** check solution folder existence [#1](https://github.com/bsorrentino/zx-powerapps-cli/issues/1) ([f15b773](https://github.com/mokkapps/changelog-generator-demo/commits/f15b773373011222c468a858ad7939b43c5eecb5))
* **version-bump:** complete implementation for version bump ([27ac5e8](https://github.com/mokkapps/changelog-generator-demo/commits/27ac5e8304d1135a8f7e0095b7f72d1ef2167a44))


### Build

* add new script as binary ([e506e98](https://github.com/mokkapps/changelog-generator-demo/commits/e506e98863fbd33c21c6d161054ecce7ea417c35))
* upgrade zx dep ([8a27a53](https://github.com/mokkapps/changelog-generator-demo/commits/8a27a5362f52d3090a6251fa038c6b00b0dd664d))

## [1.2.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.1.0...v1.2.0) (2022-03-25)

### [1.0.5](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.4...v1.0.5) (2022-03-11)


### Features

* **export-solution:** add support for cli argument 'solution name' ([2a75b3f](https://github.com/mokkapps/changelog-generator-demo/commits/2a75b3fc8b668c8c160e95b393cd9589998860f3))


### Documentation

* **readme:** update readme ([1095f02](https://github.com/mokkapps/changelog-generator-demo/commits/1095f02b545122607283d5e3757f8977ab7e2584))


### Build

* update version ([777256a](https://github.com/mokkapps/changelog-generator-demo/commits/777256a159a0e262302b9c25a11d666c3f006528))


### Refactoring

* **export-solution:** rename main function ([e91db37](https://github.com/mokkapps/changelog-generator-demo/commits/e91db373cdeec1fbcab7253d9a6f47c4af3e640f))

## [1.1.0](https://github.com/mokkapps/changelog-generator-demo/compare/v1.0.4...v1.1.0) (2022-03-25)


### Features

* remove update version both from import/export solution ([5b48d80](https://github.com/mokkapps/changelog-generator-demo/commits/5b48d807085a56207629e212347f49bacaf5fc20))


### Documentation

* updae readme ([04d8af5](https://github.com/mokkapps/changelog-generator-demo/commits/04d8af508318aa32cd1cdd5c1f0383277525f72a))


### Build

* add and configure standard-version ([e9dc3e1](https://github.com/mokkapps/changelog-generator-demo/commits/e9dc3e1faae32ba75664c22afb6d54b08c523a84))
