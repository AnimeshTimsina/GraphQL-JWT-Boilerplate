import { useQuery } from '@apollo/client'
import { myRiskAssessments } from 'graphql/generated/myRiskAssessments'
import { useLogout } from 'graphql/hooks/useLogout'
import { GET_RISKS } from 'graphql/queries/sampleQuery'
import React from 'react'
import { useHistory } from 'react-router-dom'

const TestPage = () => {
    const {replace} = useHistory()
    const {doLogout,loading: loggingOut} = useLogout({
        ifSuccess: () => replace('/login')
    })
    const {data,loading,refetch} = useQuery<myRiskAssessments>(GET_RISKS,{
        fetchPolicy:'network-only',
        notifyOnNetworkStatusChange:true
    })
    if (loggingOut) 
        return(
            <div>
                Logging out.....
            </div>
        )
    if (loading) {
        return(
            <div>
                Fetching data.....
            </div>
        )
    }
    
    return (
        <div>
            <header>
                <button onClick={doLogout}>Log out</button>
                <button onClick={() => refetch()}>Refetch</button>
            </header>
            Secret Content {data?.allRiskassessments?.edges[0]?.node?.title}
        </div>
    )
}

export default TestPage
