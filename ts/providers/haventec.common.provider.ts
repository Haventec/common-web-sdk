import {HaventecCommon} from "../api/haventec.common";

export let HaventecCommonProvider = { provide: HaventecCommon,
  useClass: new HaventecCommon(),
  deps: []
};

export function HaventecCommonFactory() {
  return new HaventecCommon();
};