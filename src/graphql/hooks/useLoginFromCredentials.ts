import { useMutation } from "@apollo/client"
import { accessTokenVar } from "apollo-config/cache"
import { deleteRefreshToken, setRefreshToken } from "apollo-config/tokenModifier"
import { loginFromCredentials, loginFromCredentialsVariables } from "graphql/generated/loginFromCredentials"
import { LOGIN_FROM_CREDENTIALS } from "graphql/mutations"
import { alertErrorHandler } from "utils/errorHandler"

export const useLoginFromCredentials = ({remember,ifSuccess,ifError}:{
    remember:boolean,
    ifSuccess?:()=>void,
    ifError?:()=>void
}) => {
    const [doLogin, { loading, error }] = useMutation<
    loginFromCredentials,
    loginFromCredentialsVariables
  >(LOGIN_FROM_CREDENTIALS, {
    onCompleted({ tokenAuth }) {
      if (!tokenAuth) {
        ifError && ifError()
      } else {
        remember === true
          ? setRefreshToken(tokenAuth.refreshToken)
          : deleteRefreshToken()
        accessTokenVar({
          token: tokenAuth.token,
        })
        if (tokenAuth.user) {
            //save user to cache
            //change language based on current user's default language
        //   userInfoVar(tokenAuth.user)
        //   tokenAuth.user.group?.language &&
        //     i18n.changeLanguage(
        //       tokenAuth.user.group.language === GroupsLanguage.DUTCH
        //         ? "nl"
        //         : "en"
        //     )
        }
        ifSuccess && ifSuccess()
        // history.push(ROUTES.DASHBOARD)
      }
    },
    onError(err) {
      alertErrorHandler(err)
      // console.log(message);
    }
  })
  return({
    doLogin,
    loading,
    error
  })
}


