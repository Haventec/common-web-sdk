
import {HT_DataService} from "../ht_data.service";
import {HT_CryptoService} from "../ht_crypto.service";
import {HT_IStorageService} from "../storage/ht_storage.service.interface";
import {HT_DeviceService} from "../ht_device.service";

export class HaventecCommon {

    private dataService: HT_DataService;
    private deviceService: HT_DeviceService;
    
    constructor(
        public test?: boolean
    ) {
        this.dataService = new HT_DataService(test);
        this.deviceService = new HT_DeviceService();

        this.dataService.normaliseStorageService();
    }

    public init(username: string) {
        this.dataService.init(username);
    }

    public getHashPin(pin: string): string {
        return HT_CryptoService.getSaltedPin(pin, this.dataService.getSaltBits());
    }

    public setStorageService(storageService: HT_IStorageService) {
        this.dataService.setStorageService(storageService);
        this.dataService.normaliseStorageService();
    }

    public getUsername() {
        return this.dataService.getUsername();
    }

    public getAccessToken(): string {
        return this.dataService.getAccessToken();
    }

    public getDeviceUuid(): string {
        return this.dataService.getDeviceUuid();
    }

    public getUserUuid(): string {
        return this.dataService.getUserUuid();
    }

    public getApplicationUuid(): string {
        return this.dataService.getApplicationUuid();
    }

    public getAuthKey(): string {
        return this.dataService.getAuthKey();
    }

    public updateDataFromResponse(response: any): void {
        this.dataService.updateDataFromResponse(response);
    }

    public invalidateToken(): void {
        this.dataService.invalidateToken();
    }

    public isAdmin(): boolean {
        return this.dataService.isAdmin();
    }

    public isANAdmin(): boolean {
        return this.dataService.isANAdmin();
    }

    public isANSupport(): boolean {
        return this.dataService.isANSupport();
    }

    public isRole(role: string): boolean {
        return this.dataService.isRole(role);
    }

    public purge(): void {
        this.dataService.purge();
    }

    public getDeviceName(): string {
        return this.deviceService.getDeviceName();
    }

}
