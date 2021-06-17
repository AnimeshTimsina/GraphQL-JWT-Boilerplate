import { getRefreshToken } from "apollo-config/tokenModifier"
import { useLoginFromRefreshToken } from "graphql/hooks/useLoginFromRefreshToken"
import React, { useEffect, useState } from "react"

export const AutomaticLoginProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [done,setDone] = useState(false)
    const redirectToLogin = () => setDone(true)
    const {doLogin,loading} = useLoginFromRefreshToken({
        ifError: redirectToLogin,
        ifSuccess: () => setDone(true)
    })
    useEffect(() => {
        const timer = setTimeout(() => {
            const savedToken = getRefreshToken()
        if (!savedToken) {
            redirectToLogin()
        }
        else {
            doLogin({
                variables:{
                    refreshToken: savedToken
                }
            })
        }
          }, 2000);
          return () => clearTimeout(timer);
    }, [doLogin])

    if (loading || !done) {
        return(
            <div>
                Looking for automatic login....
            </div>
        )
    }
    return <span>{children}</span>
}