import * as sjcl from "@haventec/sjcl512";
import { ErrorCode, ErrorMessage, HT_Error  } from "../model/errors";

class HT_CryptoService {

    public getSaltedPin(pin: string, salt: Array<number>[128]): string {
        try {
            let hash512 = new sjcl.hash.sha512();
            hash512.update(salt);
            hash512.update(pin);
            return sjcl.codec.base64.fromBits( hash512.finalize());
        } catch (error) {
            throw new HT_Error(ErrorCode.HT_CM_EXTERNAL, ErrorMessage.SJCL_ERROR);
        }
        
    }

    public generateSalt(): Array<number>[128] {
        try{
            return sjcl.random.randomWords(128);
        } catch (error) {
            throw new HT_Error(ErrorCode.HT_CM_EXTERNAL, ErrorMessage.SJCL_ERROR);
        }
        
    }
}

export default new HT_CryptoService();
