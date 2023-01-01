import { Domain, ClipboardTextOutline, ArchiveEditOutline } from 'mdi-material-ui'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAppSelector } from 'src/hooks'
import { ICompanyData } from 'src/types/CompanyDataTypes'

const navigation = (): VerticalNavItemsType => {
    const companyTicker = useAppSelector((state: { companyData: ICompanyData }) => state.companyData.ticker)

    return [
        {
            title: 'List of companies',
            icon: ClipboardTextOutline,
            path: '/list-companies'
        },
        {
            sectionTitle: companyTicker ? `${companyTicker} Fundamentals` : 'Fundamentals'
        },
        {
            title: 'Company overview',
            icon: Domain,
            path: '/company-overview'
        },
        {
            title: 'Edit records',
            icon: ArchiveEditOutline,
            path: '/edit-records'
        }
    ]
}

export default navigation
