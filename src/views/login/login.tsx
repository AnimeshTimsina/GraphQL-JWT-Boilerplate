import { useLoginFromCredentials } from 'graphql/hooks/useLoginFromCredentials'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthUtils } from 'utils'

const LoginPage = () => {
    const {isLoggedIn} = useAuthUtils()
    const {replace} = useHistory()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const {doLogin,loading} = useLoginFromCredentials({
        remember: rememberMe,
        ifSuccess: () => replace('/')
    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        doLogin({
            variables:{
                password:password,
                username:username
            }
        })
    }

    useEffect(() => {
        let isActive = true
        if (isLoggedIn && isActive) replace('/')  
        return () => { isActive = false };
    }, [isLoggedIn,replace])

    if (loading) {
        return <div>Loading...</div>
    }


    return (
       <form onSubmit={handleSubmit}>
           <input type='text' placeholder='Username' name='username' value={username} onChange={({target:{value}})=>setUsername(value)} />
           <br />
           <input type='password' placeholder='Password' name='password' value={password} onChange={({target:{value}})=>setPassword(value)} />
           <br />
           <input type="checkbox"  name="rememberMe" id="rememberMe" checked={rememberMe} onChange={({target:{checked}}) =>setRememberMe(checked) }/>
           <label id="rememberMe" >Remember me</label>
           <br />
            <button type='submit'>Login</button>
       </form>
    )
}

export default LoginPage
