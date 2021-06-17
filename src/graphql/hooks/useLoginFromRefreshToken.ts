import { useMutation } from "@apollo/client"
import { deleteRefreshToken, setAccessToken, setRefreshToken } from "apollo-config/tokenModifier"
import { loginFromRefreshToken, loginFromRefreshTokenVariables } from "graphql/generated/loginFromRefreshToken"
import { LOGIN_FROM_REFRESH_TOKEN } from "graphql/mutations"
import { alertErrorHandler } from "utils/errorHandler"

export const useLoginFromRefreshToken = ({ifSuccess,ifError}:{
    ifSuccess?:()=>void,
    ifError?:()=>void
}) => {
    const [doLogin, { loading, error }] = useMutation<
    loginFromRefreshToken,
    loginFromRefreshTokenVariables
  >(LOGIN_FROM_REFRESH_TOKEN, {
    onCompleted({ refreshToken }) {
      if (!refreshToken) {
        deleteRefreshToken()
        ifError && ifError()
      } else {
        setAccessToken(refreshToken?.token)
        setRefreshToken(refreshToken.refreshToken)
        if (refreshToken.user) {
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
      ifError && ifError()
      deleteRefreshToken()
      alertErrorHandler(err)
    }
  })
  return({
    doLogin,
    loading,
    error
  })
}


