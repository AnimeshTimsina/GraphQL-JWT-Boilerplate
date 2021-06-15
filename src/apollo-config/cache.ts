import { InMemoryCache, makeVar } from "@apollo/client";
import { accessTokenProps } from "./interface";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return accessTokenVar();
          },
        },
        // userInfo: {
        //   read() {
        //     return userInfoVar();
        //   },
        // },
      },
    },
  },
});

export const accessTokenVar = makeVar<null | accessTokenProps>(null);
// export const userInfoVar = makeVar<myInfo_me | null>(null);
