import { ICompanyData } from "./types/CompanyDataTypes"

const getCompanyData = async(dataHash: string): Promise<ICompanyData> => {
    return (await (await fetch(`https://nftstorage.link/ipfs/${dataHash}`)).json()) as ICompanyData
}

const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;


export {
    getCompanyData,
    isObjectEmpty
}