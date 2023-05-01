import React from "react"
import store from '../../store'
import { selectCompany } from 'src/lib/generalMethods'
import { setCompanies, setCompanyLoading, setIdToCompany } from 'src/features/general'
import ICompanyEthData from 'src/types/ICompanyEthData'

const PageWrapper = ({companies, children}: {
    companies: ICompanyEthData[]
    children: React.ReactNode
}) => {
    React.useEffect(() => {
        const callback = async () => {
            store.dispatch(setCompanyLoading(true))

            const searchParams = new URLSearchParams(window.location.search)
            const companyId = searchParams.get('id')
            const isNewCompany = searchParams.get('isNewCompany')

            if (!isNewCompany) {
                if (!companyId && !store.getState().newCompanyData.id) {
                    selectCompany(companies[0], store.dispatch)
                }
                else {
                    selectCompany(companies[Number(companyId)], store.dispatch)
                }
            }
            else {
                store.dispatch(setCompanyLoading(false))
            }
            
            store.dispatch(setCompanies(companies))

            const idToCompany: { [key: number]: ICompanyEthData } = {}

            for (const company of companies) {
                idToCompany[company.id] = company
            }

            store.dispatch(setIdToCompany(idToCompany))
        }

        callback()
    }, [])

    return <>{children}</>
}

export default PageWrapper