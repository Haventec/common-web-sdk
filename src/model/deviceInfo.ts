export interface DeviceInfoParam {
    key: string;
    value: string;
}

export class DeviceInfo {
    params: Array<DeviceInfoParam>;

    public getParam(key: string) {
        if ( key && this.params && this.params.length > 0 ) {
            const deviceInfoParams: Array<DeviceInfoParam> = this.params.filter(row => row.key === key);
            if ( deviceInfoParams && deviceInfoParams.length > 0 ) {
                return deviceInfoParams[0].value;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
