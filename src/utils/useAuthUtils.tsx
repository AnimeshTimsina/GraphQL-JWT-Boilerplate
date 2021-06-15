import { useQuery } from "@apollo/client"
import { accessTokenQuery } from "apollo-config/interface"
import { GET_ACCESS_TOKEN_LOCALLY } from "apollo-config/localQueries"

export const useAuthUtils = () => {
    const { data } = useQuery<accessTokenQuery>(GET_ACCESS_TOKEN_LOCALLY)
    const isLoggedIn = data?.accessToken?.token ? true : false
    return({
        isLoggedIn
    })
}