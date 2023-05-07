import { Domain, ClipboardTextOutline, ArchiveEditOutline } from 'mdi-material-ui'
import { VerticalNavItemsType } from '@/@core/layouts/types'
import { useAppSelector } from '@/hooks'
import ICompanyData from '@/lib/types/ICompanyData'

const Navigation = (): VerticalNavItemsType => {
    const companyTicker = useAppSelector((state: { companyData: ICompanyData }) => state.companyData.ticker)
    const companyId = useAppSelector((state: { companyData: ICompanyData }) => state.companyData.id)

    return [
        {
            title: 'List of companies',
            icon: ClipboardTextOutline as any,
            path: '/list-companies'
        },
        {
            sectionTitle: companyTicker ? `${companyTicker} Fundamentals` : 'Fundamentals'
        },
        {
            title: 'Company overview',
            icon: Domain,
            path: `/company-overview?id=${companyId ?? 0}`
        },
        {
            title: 'Edit records',
            icon: ArchiveEditOutline,
            path: `/edit-records?id=${companyId ?? 0}`
        }
    ]
}

export default Navigation
