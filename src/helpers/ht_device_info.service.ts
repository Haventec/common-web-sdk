import 'clientjs';
import * as Fingerprint2 from 'fingerprintjs2';
import { ErrorCode, ErrorMessage, HT_Error } from '../model/errors';


class DeviceInfoService {
    private clientjs;
    private fingerprintComponents: any = new Object();

    constructor() {
        // @ts-ignore: Refering to a UMD global error, type error
        this.clientjs = new ClientJS();
        try {
            Fingerprint2.get((components: Fingerprint2.Component[]) => {
                components.filter(component => this.isRequired(component.key)).forEach((value) => this.fingerprintComponents[value.key] = this.join(value.value));
                this.addClientJSAttributes();
            });
        } catch (error) {
            throw new HT_Error(ErrorCode.HT_CM_EXTERNAL, ErrorMessage.FINGERPRINT_CREATION_ERROR);
        }

    }

    public getDeviceInfo(detailedFingerprint: boolean): Object {
        if (!detailedFingerprint) return this.fingerprintComponents;
        this.addClientJSAttribute('user_agent', this.clientjs.getUserAgent());
        this.addClientJSAttribute('browser_major_version', this.clientjs.getBrowserMajorVersion());
        this.addClientJSAttribute('engine', this.clientjs.getEngine());
        this.addClientJSAttribute('engine_version', this.clientjs.getEngineVersion());
        this.addClientJSAttribute('device', this.clientjs.getDevice());
        this.addClientJSAttribute('device_type', this.clientjs.getDeviceType());
        this.addClientJSAttribute('device_vendor', this.clientjs.getDeviceVendor());
        this.addClientJSAttribute('cpu', this.clientjs.getCPU());
        this.addClientJSAttribute('is_mobile', this.clientjs.isMobile());
        this.addClientJSAttribute('is_mobile_major', this.clientjs.isMobileMajor());
        this.addClientJSAttribute('is_mobile_android', this.clientjs.isMobileAndroid());
        this.addClientJSAttribute('is_mobile_opera', this.clientjs.isMobileOpera());
        this.addClientJSAttribute('is_mobile_windows', this.clientjs.isMobileWindows());
        this.addClientJSAttribute('is_mobile_blackberry', this.clientjs.isMobileBlackBerry());
        this.addClientJSAttribute('is_mobile_ios', this.clientjs.isMobileIOS());
        this.addClientJSAttribute('is_iphone', this.clientjs.isIphone());
        this.addClientJSAttribute('is_ipad', this.clientjs.isIpad());
        this.addClientJSAttribute('is_ipod', this.clientjs.isIpod());
        this.addClientJSAttribute('screen_print', this.clientjs.getScreenPrint());
        this.addClientJSAttribute('resolution', this.clientjs.getCurrentResolution());
        this.addClientJSAttribute('available_resolution', this.clientjs.getAvailableResolution());
        this.addClientJSAttribute('device_xdpi', this.clientjs.getDeviceXDPI());
        this.addClientJSAttribute('device_ydpi', this.clientjs.getDeviceYDPI());
        this.addClientJSAttribute('plugins', this.clientjs.getPlugins());
        this.addClientJSAttribute('is_java', this.clientjs.isJava());
        this.addClientJSAttribute('java_version', this.clientjs.getJavaVersion());
        this.addClientJSAttribute('is_flash', this.clientjs.isFlash());
        this.addClientJSAttribute('flash_version', this.clientjs.getFlashVersion());
        this.addClientJSAttribute('is_silverlight', this.clientjs.isSilverlight());
        this.addClientJSAttribute('silverlight_version', this.clientjs.getSilverlightVersion());
        this.addClientJSAttribute('is_mime_types', this.clientjs.isMimeTypes());
        this.addClientJSAttribute('mime_types', this.clientjs.getMimeTypes());
        this.addClientJSAttribute('is_local_storage', this.clientjs.isLocalStorage());
        this.addClientJSAttribute('timezone', this.clientjs.getTimeZone());
        this.addClientJSAttribute('language', this.clientjs.getLanguage());
        this.addClientJSAttribute('system_language', this.clientjs.getSystemLanguage());
        this.addClientJSAttribute('is_canvas', this.clientjs.isCanvas());
        return this.fingerprintComponents;

    }

    private isRequired(key: string): boolean {
        if (key === 'js_fonts' || key === 'canvas' || key === 'webgl') return false;
        return true;
    }


    private addClientJSAttribute(key: string, value: string | boolean): void {
        if (!this.fingerprintComponents[key]) {
            this.fingerprintComponents[key] = value;
        }
    }

    private addClientJSAttributes(): void {
        this.addClientJSAttribute('fingerprint', this.clientjs.getFingerprint().toString());
        this.addClientJSAttribute('browserType', this.clientjs.getBrowser());
        this.addClientJSAttribute('browserVersion', this.clientjs.getBrowserVersion());
        this.addClientJSAttribute('osType', this.clientjs.getOS());
        this.addClientJSAttribute('csFonts', this.clientjs.getFonts());
    }

    private join(value: any): string {
        if (value && Object.prototype.toString.call(value) === '[object Array]') {
            return value.join();
        }
        return value;
    }
}

export default new DeviceInfoService();
