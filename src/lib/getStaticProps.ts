import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { THEGRAPH_API_URL } from 'src/metadata'
import ICompanyEthData from 'src/types/ICompanyEthData'
import type IEvent from 'src/types/IEvent'

const COMPANIES_QUERY = gql`
    query Companies {
        companies(orderBy: iId) {
            id
            name
            ticker
            dataHash
        }
    }
`

const EVENTS_QUERY = gql`
    query Events {
        events(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
            id
            companyId
            blockTimestamp
            eventType
        }
    }
`

const client = new ApolloClient({
    uri: THEGRAPH_API_URL,
    cache: new InMemoryCache()
})

interface IGetStaticPropsResult {
    companies: ICompanyEthData[]
    events: IEvent[]
}

export async function getStaticProps(): Promise<{
    props: IGetStaticPropsResult,
    revalidate: number
}> {
    const companies: ICompanyEthData[] = (await client.query({ query: COMPANIES_QUERY })).data.companies
    const events: IEvent[] = (await client.query({ query: EVENTS_QUERY })).data.events

    return {
        props: {
            companies,
            events
        },
        revalidate: 30
    }
}

export type {
    IGetStaticPropsResult
}