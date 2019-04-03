
# Haventec Common-Web-SDK

A common collection of javascript functions to facilitate client-side interaction.

## Installation

`npm install @haventec/common-web-sdk`

## General Usage

import haventecClient from '@haventec/common-web-sdk';

This imports all the exposed methods in your file. 

## Methods 

|Function name| Parameters  | Returns   | Description  |
|--|--|--|--|
| hashPin | pin, salt  | string | returns the hashed pin.
| getDeviceInfo |   | Object | returns information about device including the fingerprint.
| generateSalt |   | number | returns salt to be used while hashing



## Contributors

 - Haventec Development Team

## License

This code is available under the MIT license. A copy of the license can be found in the LICENSE file included with the distribution.