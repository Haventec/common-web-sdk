import * as sjcl from "@haventec/sjcl512";
import ht_cryptoService from "../helpers/ht_crypto.service";
import { ErrorMessage } from "../model/errors";

describe("HT_CryptoService", function () {

    it("calls the sjcl library to generate salt", function () {
        let spy = spyOn(sjcl.random, 'randomWords');
        ht_cryptoService.generateSalt();
        expect(spy).toHaveBeenCalled();
    });

    it("throws excepted error if sjcl fails", function () {
        spyOn(sjcl.random, 'randomWords').and.throwError("");
        try{
            ht_cryptoService.generateSalt();
            fail();
        } catch (error){
            expect(error.message).toBe(ErrorMessage.SJCL_ERROR);
        }
    });

    it("calls the sjcl library to generate salted value", function () {
        spyOn(sjcl.codec.base64, 'fromBits').and.returnValue("SALTED");
        expect(ht_cryptoService.getSaltedPin("", 1111)).toBe("SALTED");
    });

    it("throws excepted error if sjcl fails", function () {
        spyOn(sjcl.codec.base64, 'fromBits').and.throwError("");
        try{
            ht_cryptoService.getSaltedPin("", 1111);
            fail();
        } catch (error){
            expect(error.message).toBe(ErrorMessage.SJCL_ERROR);
        }
    });
});