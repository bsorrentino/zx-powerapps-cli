# Changelog



## [Unreleased](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/Unreleased) ()


### Bug Fixes

 -  **zx-import-solution.mjs**  bad import settings param ([e285feab66fb573](https://github.com/bsorrentino/zx-powerapps-cli/commit/e285feab66fb57391f1fc80aead6928cfaa81acb))


### Documentation

 -  **CHANGELOG.md**  update ([db73bee04657ed3](https://github.com/bsorrentino/zx-powerapps-cli/commit/db73bee04657ed3ddedcc7495ae1929666ee746a))



### ALM 

 -  move to next release ([999a295958411e9](https://github.com/bsorrentino/zx-powerapps-cli/commit/999a295958411e93ebcac2e715dca9f144ec9786))



"name: v2.2.0" is a release tag

## [v2.2.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.2.0) (2023-07-17)


### Bug Fixes

 -  **zx-export-solution.mjs**  always return solution_to_export ([e96aa449b3e2b91](https://github.com/bsorrentino/zx-powerapps-cli/commit/e96aa449b3e2b91c7970597bd231d8a42f3872f6))


### Documentation

 -  **CHANGELOG.md**  update ([9bdfb6a37bd7d93](https://github.com/bsorrentino/zx-powerapps-cli/commit/9bdfb6a37bd7d93fab0dce42092e34071347d679))

 -  **CHANGELOG.md**  update ([a7a960faf485068](https://github.com/bsorrentino/zx-powerapps-cli/commit/a7a960faf485068aa2bc313d0580e3498f0fff27))



### ALM 

 -  move to next version ([db35a460a247c59](https://github.com/bsorrentino/zx-powerapps-cli/commit/db35a460a247c594cc896e3c60c20cc27dd224b9))



"name: v2.1.0" is a release tag

## [v2.1.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.1.0) (2023-07-11)

### Features

 *  **zx-import-solution.mjs**  remove publish changes by default ([05c7118a3dc2052](https://github.com/bsorrentino/zx-powerapps-cli/commit/05c7118a3dc2052bb623817bced17112b3aedd92))
     > add argument --publish-changes
     > issue #7
   
 *  **zx-solution-utils.mjs**  improve askForAuthProfile method ([04e04b67ac1559f](https://github.com/bsorrentino/zx-powerapps-cli/commit/04e04b67ac1559fd3b3ac063ffb29a39299557af))
   
 *  **zx-export-solution.mjs**  skip 'pac solution list' error ([3bc1532ba83bd89](https://github.com/bsorrentino/zx-powerapps-cli/commit/3bc1532ba83bd8916b61974bbbd893378c045f50))
   


### Documentation

 -  **README.md**  update ([af44336a804be80](https://github.com/bsorrentino/zx-powerapps-cli/commit/af44336a804be80656f01bad9b3ba975a6c13648))

 -  **CHANGELOG.md**  update ([edff3f9c5b56375](https://github.com/bsorrentino/zx-powerapps-cli/commit/edff3f9c5b5637547b4a5f9f29c71b77887963b0))



### ALM 

 -  move to next release ([f2f7385016f4f21](https://github.com/bsorrentino/zx-powerapps-cli/commit/f2f7385016f4f21a55ecf3bd5ae45114fd68c54c))



"name: v2.0.9" is a release tag

## [v2.0.9](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.9) (2023-05-26)

### Features

 *  **zx-import-solution.mjs**  add parameter --noversion ([3a2f1fb6c0519eb](https://github.com/bsorrentino/zx-powerapps-cli/commit/3a2f1fb6c0519ebd0bcaba21b1f561e908daec95))
     > if --noversion is specified the solution version is not included in generated zip&#x27;s name
   


### Documentation

 -  **CHANGELOG.md**  update ([690218fbeddf27f](https://github.com/bsorrentino/zx-powerapps-cli/commit/690218fbeddf27f9ad530e1eb72e985656abfbda))

 -  **README.md**  add --noversion parameter ([e027e3e2536674a](https://github.com/bsorrentino/zx-powerapps-cli/commit/e027e3e2536674a38ee523b964ce871e2e9e538a))

 -  **CHANGELOG.md**  update ([a37fc4643c4c0bb](https://github.com/bsorrentino/zx-powerapps-cli/commit/a37fc4643c4c0bb53eb616846cd6e9e0e5f5e8c6))



### ALM 

 -  **package.json**  move to next release 2.0.9 ([8c3c39e0242b790](https://github.com/bsorrentino/zx-powerapps-cli/commit/8c3c39e0242b79013c1ad2975935cb59a2333883))



"name: v2.0.8" is a release tag

## [v2.0.8](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.8) (2023-05-24)

### Features

 *  **import**  add version to  zip ([fd07a803b972b96](https://github.com/bsorrentino/zx-powerapps-cli/commit/fd07a803b972b96d46bba7fab43c11cf293d4ec9))
   


### Documentation

 -  **changelog.md**  update ([5afdb1375e5d567](https://github.com/bsorrentino/zx-powerapps-cli/commit/5afdb1375e5d567b36b8679477ade0d8f96827d5))



### ALM 

 -  update version and upgrade xmljs ([3d71d31b2180d67](https://github.com/bsorrentino/zx-powerapps-cli/commit/3d71d31b2180d6745c3fb739e5082222e2b56928))



"name: v2.0.7" is a release tag

## [v2.0.7](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.7) (2023-03-28)


### Bug Fixes

 -  **zx-export-solution.mjs**  update regexp version ([21fd45d3ee0393d](https://github.com/bsorrentino/zx-powerapps-cli/commit/21fd45d3ee0393d2a3eae6fd9dde0a2d8c0b3836))
     > accept solution version with only 2 digits


### Documentation

 -  **changelog.mustache**  add all commit optional body ([ea7508ea284fc0b](https://github.com/bsorrentino/zx-powerapps-cli/commit/ea7508ea284fc0bf7b45913916d3c6fb7443ccef))



### ALM 

 -  update version ([362675bd050a1f8](https://github.com/bsorrentino/zx-powerapps-cli/commit/362675bd050a1f8a23ca62291f87e82521a684ff))



"name: v2.0.6" is a release tag

## [v2.0.6](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.6) (2023-01-25)


### Bug Fixes

 -  **zx-export-solution.mjs**  update regexp to remove version from destination solution folder ([398e23495a120bc](https://github.com/bsorrentino/zx-powerapps-cli/commit/398e23495a120bc4244a0f293442a84ccb01d4ac))

 -  **changelog.mustache**  updage repo link ([280149bb8f9327d](https://github.com/bsorrentino/zx-powerapps-cli/commit/280149bb8f9327de8a3b32a263d6a1a7b7fda080))


### Documentation

 -  **CHANGELOG.md**  update changelog ([b2c191c2ca253b2](https://github.com/bsorrentino/zx-powerapps-cli/commit/b2c191c2ca253b2a48a56aedb691c9795d8df1d1))
     > generate ghangelog with fixed repo links

 -  **changelog**  update changelog ([72a8eac832ed4b7](https://github.com/bsorrentino/zx-powerapps-cli/commit/72a8eac832ed4b7e7dfdba4e71e14ba4439d0f4e))



### ALM 

 -  **package.json**  update version ([d0bfd4ca1e4aaa2](https://github.com/bsorrentino/zx-powerapps-cli/commit/d0bfd4ca1e4aaa2667b38df6bc1f10c353e7a9d7))



"name: v2.0.5" is a release tag

## [v2.0.5](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.5) (2022-12-04)

### Features

 *  **zx-export-solution**  add support of --unpackonly argument ([f76fcdbd1972a0c](https://github.com/bsorrentino/zx-powerapps-cli/commit/f76fcdbd1972a0c65a172a22b62953c95d6adb53))
   


### Documentation

 -  **changelog**  update changelog ([a585dd1a64a2fbc](https://github.com/bsorrentino/zx-powerapps-cli/commit/a585dd1a64a2fbc02667c4e7f71d50739bb4126c))



### ALM 

 -  update release ([633e8a391df43f3](https://github.com/bsorrentino/zx-powerapps-cli/commit/633e8a391df43f387fe047947d5be2b345368d31))



"name: v2.0.4" is a release tag

## [v2.0.4](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.4) (2022-11-28)

### Features

 *  finalize packonly management ([7b908ad681c11c5](https://github.com/bsorrentino/zx-powerapps-cli/commit/7b908ad681c11c51b223f2ae60c00ac39be2d9fc))
   
 *  add --packonly arg on import ([1425e7eeb5aab37](https://github.com/bsorrentino/zx-powerapps-cli/commit/1425e7eeb5aab37f36be746433725e91adda5bc4))
   


### Documentation

 -  update changelog ([fa016a38b001d79](https://github.com/bsorrentino/zx-powerapps-cli/commit/fa016a38b001d79637d58b49800372b1cca49ff4))



### ALM 

 -  set new release ([3272f74927942f8](https://github.com/bsorrentino/zx-powerapps-cli/commit/3272f74927942f87cc38a9f03aaa66a773378510))



"name: v2.0.3" is a release tag

## [v2.0.3](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.3) (2022-09-20)


### Bug Fixes

 -  **zx-export-solution**  fix parse 'pac solution list' output ([62f7b7fbaa622f2](https://github.com/bsorrentino/zx-powerapps-cli/commit/62f7b7fbaa622f20edb72027b7f7d32c9c4261cb))


### Documentation

 -  update changelog ([4194dee1ded7127](https://github.com/bsorrentino/zx-powerapps-cli/commit/4194dee1ded7127465bc3277d7e3885a8507db55))



### ALM 

 -  update release version ([c95fb20307dd78b](https://github.com/bsorrentino/zx-powerapps-cli/commit/c95fb20307dd78bfc104e86db46d84811cf48e01))



"name: v2.0.2" is a release tag

## [v2.0.2](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.2) (2022-09-19)


### Bug Fixes

 -  **zx-clone-flow**  avoid infinite loop on error ([3f7854de65443d7](https://github.com/bsorrentino/zx-powerapps-cli/commit/3f7854de65443d78f890cb7542310e8a535838db))
     > #4

 -  **zx-clone-flow**  update shebang line ([8e3c3aa95a010e0](https://github.com/bsorrentino/zx-powerapps-cli/commit/8e3c3aa95a010e02393054e617d44a987353df8f))
     > #4


### Documentation

 -  update changelog ([e5aa10a7e03ba03](https://github.com/bsorrentino/zx-powerapps-cli/commit/e5aa10a7e03ba03a6c353b607eb7088154d242df))

 -  update readme ([62f26af60b443ea](https://github.com/bsorrentino/zx-powerapps-cli/commit/62f26af60b443eadea8538baedcc4d10cd9adca6))



### ALM 

 -  move to next release version ([e4a6bf3223fe9de](https://github.com/bsorrentino/zx-powerapps-cli/commit/e4a6bf3223fe9de221155397afd2dea898437c20))

 -  move to next release version ([118054e5fef25cf](https://github.com/bsorrentino/zx-powerapps-cli/commit/118054e5fef25cf17003ddba10aaa0f48477c483))



"name: v2.0.0" is a release tag

## [v2.0.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v2.0.0) (2022-09-19)

### Features

 *  **zx-clone-flow.mjs**  cloud flow clone script ([f0ab329cd1f0abe](https://github.com/bsorrentino/zx-powerapps-cli/commit/f0ab329cd1f0abeb6c2296218794566e7b9fe092))
     > #4
   
 *  **zx-clone-flow**  initial draft implementation ([288632d517723b9](https://github.com/bsorrentino/zx-powerapps-cli/commit/288632d517723b9e4f191843a8a172626c83bcbe))
     > #1
   

### Bug Fixes

 -  parsing result of 'solution list' ([89a559375f92505](https://github.com/bsorrentino/zx-powerapps-cli/commit/89a559375f9250531bcd6066cd561c122117f44f))


### Documentation

 -  update readme ([abafe8b0d5c4e4d](https://github.com/bsorrentino/zx-powerapps-cli/commit/abafe8b0d5c4e4dd8ae1674dd76fae76cdaacb4c))
     > #4

 -  update changelog ([1fc2db2403e1dd9](https://github.com/bsorrentino/zx-powerapps-cli/commit/1fc2db2403e1dd9f3e734a4f90c1f0fe55839cd8))


### Refactor

 -  remove deprecated 'startSpinner' function ([8d173563d522471](https://github.com/bsorrentino/zx-powerapps-cli/commit/8d173563d5224717edad818d994f48ed473e2485))


### ALM 

 -  add script ([69489f021352c37](https://github.com/bsorrentino/zx-powerapps-cli/commit/69489f021352c373d4786b862443fecd2412381f))

 -  upgrade zx version and node compatibility ([ce0eb6272320392](https://github.com/bsorrentino/zx-powerapps-cli/commit/ce0eb6272320392cf83002b732ea3c471caa1034))



"name: v1.5.3" is a release tag

## [v1.5.3](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.5.3) (2022-07-08)

### Features

 *  **export-solution**  support of 'keep_zip' argument ([d5caa51118ee818](https://github.com/bsorrentino/zx-powerapps-cli/commit/d5caa51118ee8184856d0467c31bccb65416021a))
     > #3
   

### Bug Fixes

 -  remove package vulnerabilities ([52c2f11d7e0c7ae](https://github.com/bsorrentino/zx-powerapps-cli/commit/52c2f11d7e0c7aeadf82d7f5d63fb84cadbb816c))
     > remove devdep &#x27;cz-conventional-changelog@3.3.0&#x27; , &#x27;standard-version@9.3.2&#x27;


### Documentation

 -  update changelog ([893e23fead1a6f4](https://github.com/bsorrentino/zx-powerapps-cli/commit/893e23fead1a6f4f710dfc51ce98d1984de384fe))

 -  update readme ([3c3f4a49a74b2ec](https://github.com/bsorrentino/zx-powerapps-cli/commit/3c3f4a49a74b2ec1e2d94c3d9c3d14b5def7128c))


### Refactor

 -  update comments ([8847f0f9a8e3887](https://github.com/bsorrentino/zx-powerapps-cli/commit/8847f0f9a8e3887f016ad1ca20fde395f29578e7))


### ALM 

 -  move to next release version ([1cac184d498d531](https://github.com/bsorrentino/zx-powerapps-cli/commit/1cac184d498d531b509effb08be76ab097c8f347))



"name: v1.5.2" is a release tag

## [v1.5.2](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.5.2) (2022-06-17)


### Bug Fixes

 -  **settings**  set right auth profile as settings file name ([e7c092883bfb130](https://github.com/bsorrentino/zx-powerapps-cli/commit/e7c092883bfb130355206d9558517231f716d5f1))




### ALM 

 -  add 'release' script ([72761f7381ff183](https://github.com/bsorrentino/zx-powerapps-cli/commit/72761f7381ff18313b55e840e86657830d59a0de))



"name: v1.5.1" is a release tag

## [v1.5.1](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.5.1) (2022-06-15)




### Refactor

 -  **zx-version-bump**  add trailing space to question ([3a23ba255512f95](https://github.com/bsorrentino/zx-powerapps-cli/commit/3a23ba255512f95982b19ac6f5a4d5d021e5aee1))




"name: v1.5.0" is a release tag

## [v1.5.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.5.0) (2022-05-01)

### Features

 *  **export-solution**  refine create settings implementation ([81c56152df08217](https://github.com/bsorrentino/zx-powerapps-cli/commit/81c56152df08217853f0b7d3d0f1f5247ae4a997))
     > #2
   
 *  **utils**  add 'getSettingsFile' function ([30f70c34ff42944](https://github.com/bsorrentino/zx-powerapps-cli/commit/30f70c34ff4294471f779e485fa97f156fd2546b))
     > #2
   
 *  **import-solution**  add support for importing settings file if exist ([7e9969ee0903958](https://github.com/bsorrentino/zx-powerapps-cli/commit/7e9969ee0903958b85ccbf8717412099a144ac5d))
     > #2
   
 *  **create-settings**  add createsettings on solution export ([67d8a9b11e53542](https://github.com/bsorrentino/zx-powerapps-cli/commit/67d8a9b11e53542ba1c9bc9def80324e06aec86a))
     > #2
   
 *  add utility functions 'askYesOrNo' and 'askNoOrYes' and fix 'askForAuthProfile' ([dfe30c6121ae57f](https://github.com/bsorrentino/zx-powerapps-cli/commit/dfe30c6121ae57f721a93eadb4e0bc4a2ea81420))
   
 *  **auth-profile**  obtain the auth profile name during authentication phase ([ca3d09ae3adc299](https://github.com/bsorrentino/zx-powerapps-cli/commit/ca3d09ae3adc299d0f78c0f7dd2c6d03ebbbce89))
   


### Documentation

 -  **readme**  update readme ([1b9b9b579cfbcde](https://github.com/bsorrentino/zx-powerapps-cli/commit/1b9b9b579cfbcde90e75e745200cbfefa978f04c))
     > #2



### ALM 

 -  **zx**  update zx dep to 6.1.0 ([b012b5ba93f5fcd](https://github.com/bsorrentino/zx-powerapps-cli/commit/b012b5ba93f5fcd36e8cbf6edfa697ef9c929c5a))



"name: v1.4.0" is a release tag

## [v1.4.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.4.0) (2022-03-29)


### Bug Fixes

 -  **zx-version-bump**  set the right script for zx-version-bump ([f5e530ca82d5726](https://github.com/bsorrentino/zx-powerapps-cli/commit/f5e530ca82d57264b3b7a92150f09557868cdbf6))






"name: v1.3.1" is a release tag

## [v1.3.1](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.3.1) (2022-03-26)



### Documentation

 -  update readme ([f25accc456d80f3](https://github.com/bsorrentino/zx-powerapps-cli/commit/f25accc456d80f3247ada940d9c91ae7409b809f))





"name: v1.3.0" is a release tag

## [v1.3.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.3.0) (2022-03-26)

### Features

 *  **version-bump**  complete implementation for version bump ([27ac5e8304d1135](https://github.com/bsorrentino/zx-powerapps-cli/commit/27ac5e8304d1135a8f7e0095b7f72d1ef2167a44))
   
 *  **askforsolutionfolder**  check solution folder existence #1 ([f15b77337301122](https://github.com/bsorrentino/zx-powerapps-cli/commit/f15b773373011222c468a858ad7939b43c5eecb5))
   




### ALM 

 -  add new script as binary ([e506e98863fbd33](https://github.com/bsorrentino/zx-powerapps-cli/commit/e506e98863fbd33c21c6d161054ecce7ea417c35))

 -  upgrade zx dep ([8a27a5362f52d30](https://github.com/bsorrentino/zx-powerapps-cli/commit/8a27a5362f52d3090a6251fa038c6b00b0dd664d))



"name: v1.2.0" is a release tag

## [v1.2.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.2.0) (2022-03-25)







"name: v1.1.0" is a release tag

## [v1.1.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.1.0) (2022-03-25)

### Features

 *  remove update version both from import/export solution ([5b48d807085a562](https://github.com/bsorrentino/zx-powerapps-cli/commit/5b48d807085a56207629e212347f49bacaf5fc20))
     > the version update strategy could be complex and context dependent, so we prefer to remove from cli
     > automation
   




### ALM 

 -  add and configure standard-version ([e9dc3e1faae32ba](https://github.com/bsorrentino/zx-powerapps-cli/commit/e9dc3e1faae32ba75664c22afb6d54b08c523a84))



"name: v1.0.5" is a release tag

## [v1.0.5](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.0.5) (2022-03-11)

### Features

 *  **export-solution**  add support for cli argument 'solution name' ([2a75b3fc8b668c8](https://github.com/bsorrentino/zx-powerapps-cli/commit/2a75b3fc8b668c8c160e95b393cd9589998860f3))
   


### Documentation

 -  **readme**  update readme ([1095f02b5451226](https://github.com/bsorrentino/zx-powerapps-cli/commit/1095f02b545122607283d5e3757f8977ab7e2584))

 -  updae readme ([04d8af508318aa3](https://github.com/bsorrentino/zx-powerapps-cli/commit/04d8af508318aa32cd1cdd5c1f0383277525f72a))


### Refactor

 -  **export-solution**  rename main function ([e91db373cdeec1f](https://github.com/bsorrentino/zx-powerapps-cli/commit/e91db373cdeec1fbcab7253d9a6f47c4af3e640f))


### ALM 

 -  update version ([777256a159a0e26](https://github.com/bsorrentino/zx-powerapps-cli/commit/777256a159a0e262302b9c25a11d666c3f006528))



"name: v1.0.4" is a release tag

## [v1.0.4](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.0.4) (2022-03-03)



### Documentation

 -  update readme ([2f9faa73aa3708d](https://github.com/bsorrentino/zx-powerapps-cli/commit/2f9faa73aa3708de43715d9ed02ea0a6d0470d66))


### Refactor

 -  update shebang ([d0ec7f0307955e5](https://github.com/bsorrentino/zx-powerapps-cli/commit/d0ec7f0307955e5d60f6ce69e3136dbc3a77e2df))


### ALM 

 -  update bin assets ([227f4530c53307c](https://github.com/bsorrentino/zx-powerapps-cli/commit/227f4530c53307cfdca2114b9f9a0e1fb1e23aa7))

 -  add engine info ([8f99da12d8648cd](https://github.com/bsorrentino/zx-powerapps-cli/commit/8f99da12d8648cda46e7cef7d9d7b32969667f0f))



"name: v1.0.2" is a release tag

## [v1.0.2](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.0.2) (2022-03-02)

### Features

 *  **export-solution**  add request for update solution's version ([f2c95a5bd65d8ff](https://github.com/bsorrentino/zx-powerapps-cli/commit/f2c95a5bd65d8ffa972891f8c91fb5c1784e1a1a))
   


### Documentation

 -  **readme**  update ([ca0a902b89b975b](https://github.com/bsorrentino/zx-powerapps-cli/commit/ca0a902b89b975bb95e408f4eeba654a44ac3595))



### ALM 

 -  new release & update doc ([67871183a73535f](https://github.com/bsorrentino/zx-powerapps-cli/commit/67871183a73535fe7fc769557bcf724175488ce3))



"name: v1.0.1" is a release tag

## [v1.0.1](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.0.1) (2022-02-28)


### Bug Fixes

 -  **zx-export-solution**  fix regexp to detect remote solution ([16c9198ddb7ec8b](https://github.com/bsorrentino/zx-powerapps-cli/commit/16c9198ddb7ec8bbc78830bb57e4a16a8354cf20))


### Documentation

 -  **readme**  update readme ([0117c3b1a1b6dfc](https://github.com/bsorrentino/zx-powerapps-cli/commit/0117c3b1a1b6dfc5138088033e70b128967ca40a))

 -  **readme**  update readme ([325bebddbf013e7](https://github.com/bsorrentino/zx-powerapps-cli/commit/325bebddbf013e70d62af231370a3218893547d7))



### ALM 

 -  update version ([c6a67f60b8be7a3](https://github.com/bsorrentino/zx-powerapps-cli/commit/c6a67f60b8be7a38ed2eedea29e9063ffe6712f7))



"name: v1.0.0" is a release tag

## [v1.0.0](https://github.com/bsorrentino/zx-powerapps-cli/releases/tag/v1.0.0) (2022-02-25)

### Features

 *  first candidate release ([ebf9432273cd5ee](https://github.com/bsorrentino/zx-powerapps-cli/commit/ebf9432273cd5ee838bfeaadacd13e90d4692b0c))
   
 *  add zx scripts ([a204b9aa06d3e83](https://github.com/bsorrentino/zx-powerapps-cli/commit/a204b9aa06d3e83ff1ec720b0d69c1983da03a5a))
   





