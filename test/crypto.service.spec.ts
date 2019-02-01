import {expect, tap} from "tapbundle";
import {HT_CryptoService} from "../ts/index";

// Test crypto.service.ts
tap.test("it should get random words", async () => {
    let myValue = await HT_CryptoService.generateSalt();
    let mySalt = myValue;
    expect(mySalt).to.be.instanceof(Array);
});

tap.test("it should get a base64 hash salted pin", async() => {
    let salt = "[-1127231680,2129286468,-1310665902,-1349218989,-1632275659,650970190,1833105904,2144033313," +
        "1687918511,-1402790306,703915701,-1905161476,1073292054,-1015651912,-2112258992,-1615282483,-1136766219," +
        "1645563478,-1046573229,316300652,690455618,260508247,600467152,1560397445,58789576,-1667183719,-2080862490," +
        "-536550506,611865623,878637548,-470776412,-156666392,-1436667288,-647926316,-1654138145,1878376232," +
        "-1772757388,-1837753908,-1126850031,1290090183,1171904338,717735165,-1068632324,908967172,-123247378," +
        "-703604152,-1651150201,-1098041905,1440583596,-433818992,-1949214535,-257549834,-71324372,631853289," +
        "-1768182397,-1299040578,5461003,-227193188,-2051453333,1637159561,1249480856,-1921356036,-1560897527," +
        "2096588261,-1089057647,1376927013,-1654074948,1853776474,-2130343897,1113457140,1187250638,1303885333," +
        "-1054019717,-942831627,-529091246,44799820,-1964738836,1965666141,158181914,-2137459796,1394888113," +
        "564412427,-1259315135,-1754541766,-1273803156,85018863,-450885356,-1667199793,-46793753,-2065574256," +
        "-1115680951,83663059,555142314,-1700558739,1041168550,1477647050,-1153987449,-1525585223,508518427," +
        "187976235,811963790,457476840,-1151147143,-1815811897,205187337,-1261987461,318909700,-895193317,-283985966," +
        "-1423928526,-1668646437,224426341,575228253,73807181,315604118,1525626916,-1269350532,-384020127,860055040," +
        "68420620,2052820611,1030235570,852446727,-735781246,1095225559,-169855548,-905697917,-1806551245]";

    let mySalt = HT_CryptoService.getSaltedPin("0000", salt);

    // expect(mySalt).to.be.a("string");
    expect(mySalt.length).to.be.equal(88);
});

tap.start()