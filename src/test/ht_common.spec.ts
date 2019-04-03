import haventecCommon from '../api/haventec.common';
import ht_crypto from '../helpers/ht_crypto.service';
import ht_deviceInfo from '../helpers/ht_device_info.service';
import { ErrorMessage } from '../model/errors';
import * as sjcl from "@haventec/sjcl512";

describe("HT_Common", function() {
    it("calls the ht_crypto service and gets the required error message", function() {
      spyOn(sjcl.codec.base64, 'fromBits').and.throwError("");
      try{
        haventecCommon.generateSalt();
        fail();
      } catch (e) {
        expect(e.message).toBe(ErrorMessage.SJCL_ERROR);
      } 
    });

    it("calls the crypto service to generate the salt", function() {
      let spy = spyOn(ht_crypto,'generateSalt');
      haventecCommon.generateSalt();
      expect(spy).toHaveBeenCalled();
    });

    it("calls the crypto service to generate the hash pin", function() {
      let spy = spyOn(ht_crypto,'getSaltedPin');
      haventecCommon.hashPin("",111);
      expect(spy).toHaveBeenCalled();
    });

    it("throws the expected error if you pass invalid value to hash pin", function() {
      try {
        haventecCommon.hashPin("",undefined);
        fail();
      } catch (e) {
        expect(e.message).toBe(ErrorMessage.INVALID_OBJECT);
      }
    });

    it("calls deviceInfoService to retrieve the deviceInfo", function() {
      let spy = spyOn(ht_deviceInfo,'getDeviceInfo');
      haventecCommon.getDeviceInfo();
      expect(spy).toHaveBeenCalled();
    }); 
  });