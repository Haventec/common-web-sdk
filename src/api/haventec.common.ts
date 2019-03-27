import ht_device_infoService from "../helpers/ht_device_info.service";
import ht_cryptoService from "../helpers/ht_crypto.service";

class HaventecCommon {

    public hashPin(pin: string, salt: Array<number>[128]): string {
        return ht_cryptoService.getSaltedPin(pin, salt);
    }

    public getDeviceInfo(): Object {
        return ht_device_infoService.getDeviceInfo();
    }

    public generateSalt(): Array<number>[128] {
        return ht_cryptoService.generateSalt();
    }
}

export default new HaventecCommon();

