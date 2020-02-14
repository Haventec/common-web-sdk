import * as Fingerprint2 from 'fingerprintjs2';
import { ErrorCode, ErrorMessage, HT_Error } from '../model/errors';
import {DeviceInfo, DeviceInfoParam} from "../model/deviceInfo";


class DeviceInfoService {
    private fingerprintComponents = [];

    private fingerprint = null;

    private fingerprintDetails: Array<any>;

    private fonts: string;

    private browserData: any;
    private navigatorBrowserData: any;

    constructor() {

        // as-per ClientJS
        if ( window['UAParser'] ) {
            const parser = new(window['UAParser']);
            if ( parser ) {
                this.browserData = parser.getResult();
            };
        }


        try {
            this.getFingerprintComponents();

            Fingerprint2.get((components: Fingerprint2.Component[]) => {

                this.fingerprintComponents = components;

                components.filter(component => this.isRequired(component.key)).forEach((value) => {
                    this.pushFPC(this.fingerprintDetails, value.key, value.value)
                });

                const values = components.map(function (component) { return component.value });
                this.fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
                this.pushFPC(this.fingerprintDetails, 'fingerprint', this.fingerprint);
            });
        } catch (error) {
            throw new HT_Error(ErrorCode.HT_CM_EXTERNAL, ErrorMessage.FINGERPRINT_CREATION_ERROR);
        }

    }

    public getDeviceInfoParams(detailedFingerprint?: boolean): Array<DeviceInfoParam> {
        this.getFingerprintComponents();

        if (!detailedFingerprint) return this.fingerprintDetails;

        return this.fingerprintDetails;
    }

    private isRequired(key: string): boolean {
        if (key === 'js_fonts' || key === 'canvas' || key === 'webgl') return false;
        return true;
    }


    getDeviceName() {
        if ( this.browserData && this.browserData.device) {
            return this.browserData.device.model;
        } else {
            return this.getOsType() + ' ' + this.getBrowser() + ' ' + this.getBrowserVersion();
        }

        return null;
    }

    getOsType() {
        if ( this.browserData && this.browserData.os) {
            return this.browserData.os.name;
        } else {
            return this.getUAFromNavigator().os;
        }

        return null;
    }

    getBrowser() {
        if ( this.browserData && this.browserData.browser) {
            return this.browserData.browser.name;
        } else {
            return this.getUAFromNavigator().browserName;
        }

        return null;
    }

    getBrowserVersion() {
        if ( this.browserData && this.browserData.browser) {
            return this.browserData.browser.version;
        } else {
            return this.getUAFromNavigator().fullVersion;
        }

        return null;
    }

    getBrowserMajorVersion() {
        if ( this.browserData && this.browserData.browser) {
            return this.browserData.browser.version;
        } else {
            return this.getUAFromNavigator().majorVersion;
        }

        return null;
    }

    getFonts() {
        return this.fonts;
    }

    getFingerprint() {
        if ( !this.fingerprint ) {
            if ( this.fingerprintComponents ) {
                const values = this.fingerprintComponents.map(function (component) { return component.value });
                this.fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
            } else {
                return null;
            }
        }
        return this.fingerprint;
    }

    getFingerprintComponents() {

        if ( !this.fingerprintDetails ) {

            this.fingerprintDetails = new Array();

            if ( this.fingerprintComponents ) {
                for ( let i = 0; i < this.fingerprintComponents.length; i++ ) {
                    if ( this.fingerprintComponents[i] &&
                        this.fingerprintComponents[i].key !== 'canvas' &&
                        this.fingerprintComponents[i].key !== 'webgl' ) {

                        if ( this.fingerprintComponents[i].key === 'js_fonts' ) {
                            this.fonts = this.fingerprintComponents[i].key;
                        }
                        this.fingerprintDetails.push({
                            key: this.fingerprintComponents[i].key,
                            value: this.joinValues(this.fingerprintComponents[i].value)
                        });
                    }
                }
            }

            this.pushFPC(this.fingerprintDetails, 'osType', this.getOsType());
            this.pushFPC(this.fingerprintDetails, 'browserType', this.getBrowser());
            this.pushFPC(this.fingerprintDetails, 'browserVersion', this.getBrowserVersion());
            this.pushFPC(this.fingerprintDetails, 'deviceName', this.getDeviceName());
            this.pushFPC(this.fingerprintDetails, 'user_agent', navigator.userAgent);

            if ( this.getBrowserVersion() ) {
                this.pushFPC(this.fingerprintDetails, 'browser_major_version', this.getBrowserMajorVersion());
            }

            if ( this.browserData ) {
                if ( this.browserData.engine ) {
                    this.pushFPC(this.fingerprintDetails, 'engine', this.browserData.engine.name);
                    this.pushFPC(this.fingerprintDetails, 'engine_version', this.browserData.engine.version);
                }
                if ( this.browserData.os ) {
                    this.pushFPC(this.fingerprintDetails, 'engine_version', this.browserData.os.version);
                }
                if ( this.browserData.device ) {
                    this.pushFPC(this.fingerprintDetails, 'device_type', this.browserData.device.type);
                    this.pushFPC(this.fingerprintDetails, 'device_vendor', this.browserData.device.vendor);
                }
                if ( this.browserData.cpu ) {
                    this.pushFPC(this.fingerprintDetails, 'cpu', this.browserData.architecture);
                }
            }

            if ( screen ) {
                this.pushFPC(this.fingerprintDetails, 'device_xdpi', screen['deviceXDPI']);
                this.pushFPC(this.fingerprintDetails, 'device_ydpi', screen['deviceYDPI']);
            }

            this.pushFPC(this.fingerprintDetails, 'timezone', this.getTimeZone());

            this.pushFPC(this.fingerprintDetails, 'is_mime_types', this.isMimeTypes());
            this.pushFPC(this.fingerprintDetails, 'mime_types', this.getMimeTypes());
            this.pushFPC(this.fingerprintDetails, 'system_language', this.getSystemLanguage());

            /**
             * This is the list of items from ClientJS that we cover
             */
            // this.pushFPC(fc, 'fingerprint', this.clientjs.getFingerprint());
            // this.pushFPC(fc, 'user_agent', this.clientjs.getUserAgent());
            // this.pushFPC(fc, 'browserType', this.clientjs.getBrowser());
            // this.pushFPC(fc, 'browserVersion', this.clientjs.getBrowserVersion());
            // this.pushFPC(fc, 'browser_major_version', this.clientjs.getBrowserMajorVersion());
            // this.pushFPC(fc, 'engine', this.clientjs.getEngine());
            // this.pushFPC(fc, 'engine_version', this.clientjs.getEngineVersion());
            // this.pushFPC(fc, 'osType', this.clientjs.getOS());
            // this.pushFPC(fc, 'os_version', this.clientjs.getOSVersion());
            // this.pushFPC(fc, 'device', this.clientjs.getDevice());
            // this.pushFPC(fc, 'device_type', this.clientjs.getDeviceType());
            // this.pushFPC(fc, 'device_vendor', this.clientjs.getDeviceVendor());
            // this.pushFPC(fc, 'cpu', this.clientjs.getCPU());
            // this.pushFPC(fc, 'is_mobile', this.clientjs.isMobile());
            // this.pushFPC(fc, 'is_mobile_major', this.clientjs.isMobileMajor());
            // this.pushFPC(fc, 'is_mobile_android', this.clientjs.isMobileAndroid());
            // this.pushFPC(fc, 'is_mobile_opera', this.clientjs.isMobileOpera());
            // this.pushFPC(fc, 'is_mobile_windows', this.clientjs.isMobileWindows());
            // this.pushFPC(fc, 'is_mobile_blackberry', this.clientjs.isMobileBlackBerry());
            // this.pushFPC(fc, 'is_mobile_ios', this.clientjs.isMobileIOS());
            // this.pushFPC(fc, 'is_iphone', this.clientjs.isIphone());
            // this.pushFPC(fc, 'is_ipad', this.clientjs.isIpad());
            // this.pushFPC(fc, 'is_ipod', this.clientjs.isIpod());
            // this.pushFPC(fc, 'screen_print', this.clientjs.getScreenPrint());
            // this.pushFPC(fc, 'resolution', this.clientjs.getCurrentResolution());
            // this.pushFPC(fc, 'available_resolution', this.clientjs.getAvailableResolution());
            //
            // this.pushFPC(fc, 'device_xdpi', this.clientjs.getDeviceXDPI());
            // this.pushFPC(fc, 'device_ydpi', this.clientjs.getDeviceYDPI());
            // this.pushFPC(fc, 'plugins', this.clientjs.getPlugins());
            // this.pushFPC(fc, 'timezone', this.clientjs.getTimeZone());
            // this.pushFPC(fc, 'is_mime_types', this.clientjs.isMimeTypes());
            // this.pushFPC(fc, 'mime_types', this.clientjs.getMimeTypes());
            // this.pushFPC(fc, 'is_local_storage', this.clientjs.isLocalStorage());
            // this.pushFPC(fc, 'language', this.clientjs.getLanguage());
            // this.pushFPC(fc, 'system_language', this.clientjs.getSystemLanguage());

            /**
             * This is the list of items from ClientJS that we DO NOT cover
             */
            // this.pushFPC(fc, 'is_java', this.clientjs.isJava());
            // this.pushFPC(fc, 'java_version', this.clientjs.getJavaVersion());
            // this.pushFPC(fc, 'is_flash', this.clientjs.isFlash());
            // this.pushFPC(fc, 'flash_version', this.clientjs.getFlashVersion());
            // this.pushFPC(fc, 'is_silverlight', this.clientjs.isSilverlight());
            // this.pushFPC(fc, 'silverlight_version', this.clientjs.getSilverlightVersion());
            // this.pushFPC(fc, 'is_canvas', this.clientjs.isCanvas());
            // this.pushFPC(fc, 'csFonts', this.clientjs.getFonts());
        }

        return this.fingerprintDetails;
    }

    joinValues(valArray) {
        if ( valArray && Object.prototype.toString.call( valArray ) === '[object Array]' ) {
            return valArray.join();
        } else {
            return valArray;
        }
    }

    pushFPC(fpc, key, val) {
        if ( fpc && key && val ) {
            for ( let i = 0; i < fpc.length; i++ ) {
                if ( fpc[i] && fpc[i].key === key ) {
                    return;
                }
            }
            fpc.push({key: key, value: val});
        }
    }

    /**
     * Add in some functions from ClientJS
     */
    getTimeZone() {
        let rightNow, myNumber, formattedNumber, result;
        rightNow = new Date();
        myNumber = String(-(rightNow.getTimezoneOffset() / 60));
        if (myNumber < 0) {
            myNumber = myNumber * -1;
            formattedNumber = ('0' + myNumber).slice(-2);
            result = '-' + formattedNumber;
        } else {
            formattedNumber = ('0' + myNumber).slice(-2);
            result = '+' + formattedNumber;
        }
        return result;
    }

    isMimeTypes() {
        if (navigator.mimeTypes && navigator.mimeTypes.length) {
            return true;
        }
        return false;
    }

    getMimeTypes() {
        let mimeTypeList = '';

        if (navigator.mimeTypes) {
            for (let i = 0; i < navigator.mimeTypes.length; i++) {
                if (i === navigator.mimeTypes.length - 1) {
                    mimeTypeList += navigator.mimeTypes[i].description;
                } else {
                    mimeTypeList += navigator.mimeTypes[i].description + ', ';
                }
            }
        }
        return mimeTypeList;
    }

    getSystemLanguage() {
        return navigator['systemLanguage'] || window.navigator.language;
    }

    getUAFromNavigator() {

        if (!this.navigatorBrowserData) {

            const nVer = navigator.appVersion;
            const nAgt = navigator.userAgent;
            let browserName = navigator.appName;
            let fullVersion = '' + parseFloat(navigator.appVersion);
            let majorVersion = parseInt(navigator.appVersion, 10);
            let nameOffset, verOffset, ix;

            // In Opera, the true version is after 'Opera' or after "Version"
            if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
                browserName = 'Opera';
                fullVersion = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            }
            // In MSIE, the true version is after 'MSIE' in userAgent
            else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
                browserName = 'Microsoft Internet Explorer';
                fullVersion = nAgt.substring(verOffset + 5);
            }
            // In Edge, the true version is after 'Edge' in userAgent
            else if ((verOffset = nAgt.indexOf('Edge')) !== -1) {
                browserName = 'Microsoft Edge';
                fullVersion = nAgt.substring(verOffset + 5);
            }
            // In Chrome, the true version is after 'Chrome'
            else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
                browserName = 'Chrome';
                fullVersion = nAgt.substring(verOffset + 7);
            }
            // In Safari, the true version is after 'Safari' or after 'Version'
            else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
                browserName = 'Safari';
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            }
            // In Firefox, the true version is after 'Firefox'
            else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
                browserName = 'Firefox';
                fullVersion = nAgt.substring(verOffset + 8);
            }
            // In most other browsers, 'name/version' is at the end of userAgent
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() === browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            // trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(';')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            if ((ix = fullVersion.indexOf(' ')) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }

            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            let OSName = 'Unknown OS';
            if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
            if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
            if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
            if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';
            if (navigator.appVersion.indexOf('Android') !== -1) OSName = 'Android';
            if (navigator.appVersion.indexOf('iOS') !== -1) OSName = 'iOS';
            if (navigator.appVersion.indexOf('iPhone') !== -1) OSName = 'iOS';
            if (navigator.appVersion.indexOf('iPad') !== -1) OSName = 'iPadOS';

            this.navigatorBrowserData = {
                'os': OSName,
                'browserName': browserName,
                'browserVersion': majorVersion,
                'fullVersion': fullVersion
            }
        }

        return this.navigatorBrowserData;
    }

    private join(value: any): string {
        if (value && Object.prototype.toString.call(value) === '[object Array]') {
            return value.join();
        }
        return value;
    }

}

export default new DeviceInfoService();
