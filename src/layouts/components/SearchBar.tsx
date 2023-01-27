import { gql, useLazyQuery } from '@apollo/client'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { selectCompany } from 'src/helpers/generalMethods'
import { useAppDispatch } from 'src/hooks'
import { ICompanyEthData } from 'src/types/CompanyDataTypes'
import React from 'react'
import { useRouter } from 'next/router'

const COMPANIES_QUERY = gql`
    query Companies($text: String!) {
        companies(where: {name_contains_nocase: $text}) {
            id
            name
            ticker
            dataHash
        }
    }
`

const formatResult = (item: ICompanyEthData) => {
    return (
        <div style={{ display: 'flex' }}>
            <input type='hidden' value={item.id} />
            <div style={{ marginRight: '10px' }}><b>{item.ticker}</b></div>
            <div>{item.name}</div>
        </div>
    )
}

const SearchBar = () => {
    const [getCompanies, { loading, error, data }] = useLazyQuery<{ companies: ICompanyEthData[] }>(COMPANIES_QUERY)

    React.useEffect(() => {
        getCompanies({ variables: { text: ''}})
    }, [])

    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleOnSearch = (string: string) => {
        getCompanies({ variables: { text: string } })
    }

    const handleOnSelect = async (item: ICompanyEthData) => {
        router.push('/company-overview')

        selectCompany(item, dispatch)
    }

    return (
        <ReactSearchAutocomplete
            items={data?.companies ?? []}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            maxResults={10}
            placeholder="Search company..."
        />
    )
}

export default SearchBar