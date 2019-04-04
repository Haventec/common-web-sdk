# Haventec Common-Web-SDK

A common collection of javascript functions to facilitate client-side interaction.

## Installation

`npm install @haventec/common-web-sdk`

## General Usage

The common-web-sdk is exported as a default export and call be directly consumed by Javascript/Typescript file. 
```
import haventecCommon from '@haventec/common-web-sdk' 
let haventecCommon = require ('@haventec/common-web-sdk' ) 
```
However,  the implementation requires window object (browser) and wouldn't function in a node.js environment. 

## Methods 

|Function name| Parameters  | Returns   | Description  |
|--|--|--|--|
| hashPin | pin, salt  | string | returns the hashed pin.
| getDeviceInfo |   | Object | returns information about device including the fingerprint.
| generateSalt |   | number | returns salt to be used while hashing



## Development

 To build and publish locally, clone the project and run the following: 
 ```
 npm install
 npm pack / npm publish
  ```

## License

This code is available under the MIT license. A copy of the license can be found in the LICENSE file included with the distribution.