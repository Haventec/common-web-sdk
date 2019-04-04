import ht_device_info from "../helpers/ht_device_info.service";

describe("HT_DeviceInfoService", function () {
    it("retrieves the components if it is created", function () {
        (<any>ht_device_info).fingerprintComponents = {"Property1": "Value_1"}
        let result: Object = ht_device_info.getDeviceInfo();
        expect(Object.keys(result).length).toBeGreaterThan(0);
    });
});