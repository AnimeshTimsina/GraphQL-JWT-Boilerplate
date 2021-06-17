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
