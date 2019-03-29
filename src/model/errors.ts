export enum ErrorMessage {
    FINGERPRINT_CREATION_ERROR = "Error while generating the fingerprint",
    SJCL_ERROR = "Error while generating the hash",
    INVALID_OBJECT = "Invalid/undefined object passed",
}

export enum ErrorCode {
    HT_CM_EXTERNAL,
    HT_CM_PARAM_ERROR
}

export class HT_Error {
    constructor(
        public errorCode: ErrorCode,
        public message: ErrorMessage){
    }
}
