import { useQuery } from "@apollo/client"
import { accessTokenQuery } from "apollo-config/interface"
import { GET_ACCESS_TOKEN_LOCALLY } from "apollo-config/localQueries"
import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { useAuthUtils } from "./useAuthUtils"

interface props extends RouteProps {
  child: React.ReactNode
}

const ProtectedRoute: React.FC<props> = ({ child, ...rest }) => {
  const {isLoggedIn} = useAuthUtils()
  return (
      <Route
        {...rest}
        render={(props) => {
          if (!isLoggedIn) {
            return (
              <Redirect
                to = "/login"
              />
            )
          } else 
            return child
        }}
      />
  )
}

export default ProtectedRoute
