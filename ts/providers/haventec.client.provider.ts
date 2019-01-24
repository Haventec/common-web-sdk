import {HaventecClient} from "../api/haventec.client";

export function HaventecClientFactory() {
  return new HaventecClient();
};

export let HaventecClientProvider = { provide: HaventecClient,
  useFactory: HaventecClientFactory,
  deps: []
};
