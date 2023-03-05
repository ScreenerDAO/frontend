import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import ICompanyEthData from 'src/types/ICompanyEthData'
import type IEvent from 'src/types/IEvent'

const query = gql`
    query Data {
        companies(orderBy: iId) {
            id
            name
            ticker
            dataHash
        },
        events(orderBy: blockTimestamp, orderDirection: desc, first: 10) {
            id
            companyId
            blockTimestamp
            eventType
        }
    }
`

const client = new ApolloClient({
    uri: process.env.THEGRAPH_API_URL,
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
    const companies: IGetStaticPropsResult = (await client.query({ query: query })).data

    return {
        props: companies,
        revalidate: 30
    }
}

export type {
    IGetStaticPropsResult
}