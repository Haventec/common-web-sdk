declare const ClientJS: any;
declare const Fingerprint2: any;

export class DeviceInfoService {

    private clientjs = new ClientJS();
    private fingerprint = null;
    private fingerprintComponents = null;

    constructor() {
        const self: DeviceInfoService = this;

        new Fingerprint2().get(function (result, components) {
            self.fingerprint = result;
            self.fingerprintComponents = components;
        });
    }

    getDeviceName() {
        let deviceName = this.clientjs.getDevice();
        if (!deviceName) {
            deviceName = this.getOsType() + '-' + this.getBrowser() + '-' + this.getBrowserVersion() + '-' + this.getFingerprint();
        }
        return deviceName;
    }

    getOsType() {
        return this.clientjs.getOS();
    }

    getBrowser() {
        return this.clientjs.getBrowser();
    }

    getBrowserVersion() {
        return this.clientjs.getBrowserVersion();
    }

    getFonts() {
        return this.clientjs.getFonts();
    }

    getFingerprint() {
        return this.clientjs.getFingerprint();
    }

    getFingerprintComponents() {

        const fc = new Array();

        if (this.fingerprintComponents) {
            for (let i = 0; i < this.fingerprintComponents.length; i++) {
                if (this.fingerprintComponents[i] &&
                    this.fingerprintComponents[i].key !== 'js_fonts' &&
                    this.fingerprintComponents[i].key !== 'canvas' &&
                    this.fingerprintComponents[i].key !== 'webgl') {
                    fc.push({ key: this.fingerprintComponents[i].key, value: this.joinValues(this.fingerprintComponents[i].value) });
                }
            }
        }

        this.pushFPC(fc, 'fingerprint', this.clientjs.getFingerprint());
        this.pushFPC(fc, 'user_agent', this.clientjs.getUserAgent());
        this.pushFPC(fc, 'browserType', this.clientjs.getBrowser());
        this.pushFPC(fc, 'browserVersion', this.clientjs.getBrowserVersion());
        this.pushFPC(fc, 'browser_major_version', this.clientjs.getBrowserMajorVersion());
        this.pushFPC(fc, 'engine', this.clientjs.getEngine());
        this.pushFPC(fc, 'engine_version', this.clientjs.getEngineVersion());
        this.pushFPC(fc, 'osType', this.clientjs.getOS());
        this.pushFPC(fc, 'os_version', this.clientjs.getOSVersion());
        this.pushFPC(fc, 'device', this.clientjs.getDevice());
        this.pushFPC(fc, 'device_type', this.clientjs.getDeviceType());
        this.pushFPC(fc, 'device_vendor', this.clientjs.getDeviceVendor());
        this.pushFPC(fc, 'cpu', this.clientjs.getCPU());
        this.pushFPC(fc, 'is_mobile', this.clientjs.isMobile());
        this.pushFPC(fc, 'is_mobile_major', this.clientjs.isMobileMajor());
        this.pushFPC(fc, 'is_mobile_android', this.clientjs.isMobileAndroid());
        this.pushFPC(fc, 'is_mobile_opera', this.clientjs.isMobileOpera());
        this.pushFPC(fc, 'is_mobile_windows', this.clientjs.isMobileWindows());
        this.pushFPC(fc, 'is_mobile_blackberry', this.clientjs.isMobileBlackBerry());
        this.pushFPC(fc, 'is_mobile_ios', this.clientjs.isMobileIOS());
        this.pushFPC(fc, 'is_iphone', this.clientjs.isIphone());
        this.pushFPC(fc, 'is_ipad', this.clientjs.isIpad());
        this.pushFPC(fc, 'is_ipod', this.clientjs.isIpod());
        this.pushFPC(fc, 'screen_print', this.clientjs.getScreenPrint());
        this.pushFPC(fc, 'resolution', this.clientjs.getCurrentResolution());
        this.pushFPC(fc, 'available_resolution', this.clientjs.getAvailableResolution());

        this.pushFPC(fc, 'device_xdpi', this.clientjs.getDeviceXDPI());
        this.pushFPC(fc, 'device_ydpi', this.clientjs.getDeviceYDPI());
        this.pushFPC(fc, 'plugins', this.clientjs.getPlugins());
        this.pushFPC(fc, 'is_java', this.clientjs.isJava());
        this.pushFPC(fc, 'java_version', this.clientjs.getJavaVersion());
        this.pushFPC(fc, 'is_flash', this.clientjs.isFlash());
        this.pushFPC(fc, 'flash_version', this.clientjs.getFlashVersion());
        this.pushFPC(fc, 'is_silverlight', this.clientjs.isSilverlight());
        this.pushFPC(fc, 'silverlight_version', this.clientjs.getSilverlightVersion());
        this.pushFPC(fc, 'is_mime_types', this.clientjs.isMimeTypes());
        this.pushFPC(fc, 'mime_types', this.clientjs.getMimeTypes());
        this.pushFPC(fc, 'is_local_storage', this.clientjs.isLocalStorage());
        this.pushFPC(fc, 'timezone', this.clientjs.getTimeZone());
        this.pushFPC(fc, 'language', this.clientjs.getLanguage());
        this.pushFPC(fc, 'system_language', this.clientjs.getSystemLanguage());
        this.pushFPC(fc, 'is_canvas', this.clientjs.isCanvas());
        this.pushFPC(fc, 'csFonts', this.clientjs.getFonts());

        return fc;
    }

    joinValues(valArray) {
        if (valArray && Object.prototype.toString.call(valArray) === '[object Array]') {
            return valArray.join();
        } else {
            return valArray;
        }
    }

    pushFPC(fpc, key, val) {
        if (fpc && key && val) {
            for (let i = 0; i < fpc.length; i++) {
                if (fpc[i] && fpc[i].key === key) {
                    return;
                }
            }
            fpc.push( { key: key, value: val } );
        }
    }

    getDeviceInfo() {
        return { params: this.getFingerprintComponents() }
    }
}
