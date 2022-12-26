import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { ICompanyData, ICompanyEthData } from "../types/CompanyDataTypes"
import { IGeneral, setCompanyLoading } from "src/features/general"
import { setCompanyData } from "src/features/companyDataSlice"
import { setCompanyData as setNewCompanyData } from 'src/features/newCompanyDataSlice'
import { nftStorageApiKey } from "src/metadata"
import { NFTStorage } from "nft.storage"
import { WebBundlr} from '@bundlr-network/client';

const saveCompanyData = async (data: ICompanyData) => {
    try {
        return saveCompanyDataNftStorage(data)
    }
    catch (error) {
        return null
    }
}

const saveCompanyDataNftStorage = async (data: ICompanyData): Promise<string> => {
    try {
        let client = new NFTStorage({ token: nftStorageApiKey })

        return await client.storeBlob(new Blob([JSON.stringify(data)]))
    }
    catch (error) {
        throw error
    }
}

const saveCompanyDataBundlr = async (data: ICompanyData): Promise<void> => {
    try {
        //the following private key was optained from the internet, it is not a real private key
        const bundlr = new WebBundlr("http://node1.bundlr.network", "matic", "f21dd900f4eb983b60c1709f361fe53d9872c4e54690e97d8369a22b3187de47")

        let response = await bundlr.upload(JSON.stringify(data))

        console.log(response)
    }
    catch (error) {
        throw error
    }
}

const getCompanyData = async(dataHash: string): Promise<ICompanyData> => {
    try {
        let response = await fetch(`https://nftstorage.link/ipfs/${dataHash}`)
        
        if (response.ok) {
            return await response.json() as ICompanyData
        }
        else {
            throw new Error('Error fetching company data')
        }
    }
    catch (error) {
        throw error
    }
}

const selectCompany = async (
    item: ICompanyEthData,
    dispatch: ThunkDispatch<{
        companyData: ICompanyData;
        newCompanyData: ICompanyData;
        general: IGeneral;
    }, undefined, AnyAction>
) => {
    let companyData = {} as ICompanyData
    companyData.id = item.id

    try {
        dispatch(setCompanyLoading(true))

        companyData = await getCompanyData(item.dataHash)
        /*TODO remove this line after testing*/
        companyData.id = item.id
    }
    catch (error) {
        companyData.companyName = item.name
        companyData.ticker = item.ticker
        companyData.country = ""
        companyData.financialStatements = {}
    }
    finally {
        dispatch(setCompanyData(companyData as ICompanyData))
        dispatch(setNewCompanyData(companyData as ICompanyData))
        dispatch(setCompanyLoading(false))
    }
}

const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;


export {
    saveCompanyData,
    getCompanyData,
    isObjectEmpty,
    selectCompany
}