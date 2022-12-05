import { gql, useLazyQuery } from '@apollo/client'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { setCompanyData } from 'src/features/companyDataSlice'
import { setIsNewCompany } from 'src/features/general'
import { setCompanyData as setNewCompanyData } from 'src/features/newCompanyDataSlice'
import { getCompanyData } from 'src/generalMethods'
import { useAppDispatch } from 'src/hooks'
import { ICompanyEthData } from 'src/types/CompanyDataTypes'

const COMPANIES_QUERY = gql`
    query Companies($text: String!) {
        companies(where: {name_contains: $text}) {
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

    const dispatch = useAppDispatch()

    const handleOnSearch = (string: string) => {
        getCompanies({ variables: { text: string } })
    }

    const handleOnSelect = async (item: ICompanyEthData) => {
        let companyData = await getCompanyData(item.dataHash)

        dispatch(setIsNewCompany(false))
        dispatch(setCompanyData(companyData))
        dispatch(setNewCompanyData(companyData))
    }

    return (
        <ReactSearchAutocomplete
            items={data?.companies ?? []}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            maxResults={10}
        />
    )
}

export default SearchBar