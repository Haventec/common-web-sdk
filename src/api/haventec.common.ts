import ht_device_infoService from "../helpers/ht_device_info.service";
import ht_cryptoService from "../helpers/ht_crypto.service";
import { HT_Error, ErrorCode, ErrorMessage } from "../model/errors";
import {DeviceInfo} from "../model/deviceInfo";

class HaventecCommon {

    public hashPin(pin: string, salt: Array<number>[128]): string {
        if(!salt) throw new HT_Error(ErrorCode.HT_CM_PARAM_ERROR, ErrorMessage.INVALID_OBJECT)
        return ht_cryptoService.getSaltedPin(pin, salt);
    }

    public getDeviceInfo(detailedFingerprint = false): DeviceInfo {
        let deviceInfoParams = ht_device_infoService.getDeviceInfoParams(detailedFingerprint);

        const deviceInfo: DeviceInfo = new DeviceInfo();
        if (deviceInfoParams) {
            deviceInfo.params = deviceInfoParams;
        }

        return deviceInfo;
    }

    public generateSalt(): Array<number>[128] {
        return ht_cryptoService.generateSalt();
    }
}

export default new HaventecCommon();

