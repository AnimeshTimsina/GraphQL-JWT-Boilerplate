import { useLogout } from 'graphql/hooks/useLogout'
import React from 'react'
import { useHistory } from 'react-router-dom'

const TestPage = () => {
    const {replace} = useHistory()
    const {doLogout,loading} = useLogout({
        ifSuccess: () => replace('/login')
    })
    if (loading) 
        return(
            <div>
                Logging out.....
            </div>
        )
    
    return (
        <div>
            <header>
                <button onClick={doLogout}>Log out</button>
            </header>
            Secret Content
        </div>
    )
}

export default TestPage
