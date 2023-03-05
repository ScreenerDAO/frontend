import { Domain, ClipboardTextOutline, ArchiveEditOutline } from 'mdi-material-ui'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAppSelector } from 'src/hooks'
import ICompanyData from 'src/types/ICompanyData'

// const navigation = (): VerticalNavItemsType => {
//     const companyTicker = useAppSelector((state: { companyData: ICompanyData }) => state.companyData.ticker)
//     const companyId = useAppSelector((state: { companyData: ICompanyData }) => state.companyData.id)

//     return [
//         {
//             title: 'List of companies',
//             icon: ClipboardTextOutline,
//             path: '/list-companies'
//         },
//         {
//             sectionTitle: companyTicker ? `${companyTicker} Fundamentals` : 'Fundamentals'
//         },
//         {
//             title: 'Company overview',
//             icon: Domain,
//             path: `/company-overview?id=${companyId}`
//         },
//         {
//             title: 'Edit records',
//             icon: ArchiveEditOutline,
//             path: `/edit-records?id=${companyId}`
//         }
//     ]
// }

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
            path: `/company-overview?id=${companyId}`
        },
        {
            title: 'Edit records',
            icon: ArchiveEditOutline,
            path: `/edit-records?id=${companyId}`
        }
    ]
}

export default Navigation
