import haventecCommon from '../api/haventec.common';
import ht_ctrpto from '../helpers/ht_crypto.service';
import ht_deviceInfo from '../helpers/ht_device_info.service';

describe("HT_Common", function() {
    it("calls the crpto service to generate the salt", function() {
      let spy = spyOn(ht_ctrpto,'generateSalt');
      haventecCommon.generateSalt();
      expect(spy).toHaveBeenCalled();
      expect(true).toBe(true);
    });

    it("calls the crypto service to generate the salted pin", function() {
      let spy = spyOn(ht_ctrpto,'getSaltedPin');
      haventecCommon.hashPin("",111);
      expect(spy).toHaveBeenCalled();
      expect(true).toBe(true);
    });

    it("calls deviceInfoService to retrieve the deviceInfo", function() {
      let spy = spyOn(ht_deviceInfo,'getDeviceInfo');
      haventecCommon.getDeviceInfo();
      expect(spy).toHaveBeenCalled();
    }); 
  });