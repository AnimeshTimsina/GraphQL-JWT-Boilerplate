import { useApolloClient, useMutation } from "@apollo/client"
import { deleteRefreshToken, getRefreshToken, setAccessToken } from "apollo-config/tokenModifier"
import { deleteRefreshToken as deleteRefreshTokenQuery, deleteRefreshTokenVariables } from "graphql/generated/deleteRefreshToken"
import { LOG_OUT_AND_DELETE_REFRESH } from "graphql/mutations"
import { alertErrorHandler } from "utils"

export const useLogout = ({
    ifSuccess,
    ifError
}:{
    ifSuccess?:()=>void,
    ifError?:()=>void
}) => {
    const client = useApolloClient()
    const [logout, { loading,error }] = useMutation<
    deleteRefreshTokenQuery,
      deleteRefreshTokenVariables
    >(LOG_OUT_AND_DELETE_REFRESH, {
      onCompleted({ deleteRefreshtoken: deleteRefreshOutput }) {
        if (deleteRefreshOutput) {
            if(deleteRefreshOutput.output?.success) {
                deleteRefreshToken()
                client?.clearStore()
                setAccessToken(null)
                ifSuccess && ifSuccess()
            } 
        } 
        if (!deleteRefreshOutput || !deleteRefreshOutput.output?.success) {
            ifError  && ifError()
        }
      },
      onError(err) {
        ifError && ifError()
        alertErrorHandler(err)
      }
    })
    return {
      doLogout: ()=>{
       if (getRefreshToken())  {
           logout({
            variables:{
                refreshToken: getRefreshToken()!
            }
            
        }) }
        else {
            client?.clearStore()
            setAccessToken(null)
            ifSuccess && ifSuccess()
        }
      },
      loading,
      error
    }
  }