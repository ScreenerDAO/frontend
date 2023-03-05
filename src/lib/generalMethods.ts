import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import ICompanyData from "src/types/ICompanyData"
import ICompanyEthData from "src/types/ICompanyEthData"
import IFinancialStatement from "src/types/IFinancialStatement"
import { IGeneral, setCompanyLoading } from "src/features/general"
import { setCompanyData } from "src/features/companyDataSlice"
import { setCompanyData as setNewCompanyData } from 'src/features/newCompanyDataSlice'
import { NFTStorage, Blob } from "nft.storage"
import { Web3Storage } from "web3.storage"

const saveCompanyData = async (data: ICompanyData) => {
    let hashNftStorage = null
    let hashWeb3Storage = null

    try {
        const nftStoragePromise = saveCompanyDataNftStorage(data)
        const web3StoragePromise = saveCompanyDataWeb3Storage(data)

        hashNftStorage = await nftStoragePromise
        hashWeb3Storage = await web3StoragePromise

        if (hashNftStorage) {
            return hashNftStorage
        }

        return hashWeb3Storage
    }
    catch (error) {
        if (hashNftStorage) {
            return hashNftStorage
        }

        if (hashWeb3Storage) {
            return hashWeb3Storage
        }

        throw error
    }
}

const saveCompanyDataNftStorage = async (data: ICompanyData): Promise<string> => {
    try {
        const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string })

        const blob = new Blob([JSON.stringify(data)])

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.storeCar(car)
    }
    catch (error) {
        throw error
    }
}

const saveCompanyDataWeb3Storage = async (data: ICompanyData): Promise<string> => {
    try {
        const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY as string })

        const blob = new Blob([JSON.stringify(data)])

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.putCar(car)
    }
    catch (error) {
        throw error
    }
}

const saveFile = async (file: File) => {
    let hashNftStorage = null
    let hashWeb3Storage = null

    try {
        const nftStoragePromise = saveFileToNftStorage(file)
        const web3StoragePromise = saveFileToWeb3Storage(file)

        hashNftStorage = await nftStoragePromise
        hashWeb3Storage = await web3StoragePromise

        if (hashNftStorage) {
            return hashNftStorage
        }

        return hashWeb3Storage
    }
    catch (error) {
        if (hashNftStorage) {
            return hashNftStorage
        }

        if (hashWeb3Storage) {
            return hashWeb3Storage
        }

        throw error
    }
}

const saveFileToNftStorage = async (file: File): Promise<string> => {
    try {
        const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string })

        const blob = new Blob([file], {type: 'application/pdf'})

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.storeCar(car)        
    }
    catch (error) {
        throw error
    }
}

const saveFileToWeb3Storage = async (file: File): Promise<string> => {
    try {
        const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY as string })

        const blob = new Blob([file], {type: 'application/pdf'})

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.putCar(car)
    }

    catch (error) {
        throw error
    }
}

const getCompanyData = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        const companyDataNFTStorage = await getCompanyDataNFTStorage(dataHash)

        if (companyDataNFTStorage) {
            return companyDataNFTStorage
        }

        const companyDataWeb3Storage = await getCompanyDataWeb3Storage(dataHash)

        if (companyDataWeb3Storage) {
            return companyDataWeb3Storage
        }

        throw new Error('Error fetching company data')
    }
    catch (error) {
        throw error
    }
}

const getCompanyDataWeb3Storage = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        const response = await fetch(`https://${dataHash}.ipfs.w3s.link`)

        if (response.ok) {
            return (await response.json()) as ICompanyData
        }

        return null
    }
    catch (error) {
        throw error
    }
}

const getCompanyDataNFTStorage = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        const response = await fetch(`https://nftstorage.link/ipfs/${dataHash}`)

        if (response.ok) {
            return (await response.json()) as ICompanyData
        }

        return null
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
    
    // companyData.id = item.id

    try {
        dispatch(setCompanyLoading(true))

        companyData = (await getCompanyData(item.dataHash)) ?? {} as ICompanyData        
    }
    catch (error) {
        companyData.companyName = item.name
        companyData.ticker = item.ticker
        companyData.country = ""
        companyData.financialStatements = {}
        companyData.annualReports = {}
    }
    finally {
        ///TODO
        companyData.id = item.id

        //Format old schema to new schema
        for (const year in companyData.financialStatements) {
            for (const statement in companyData.financialStatements[year]) {
                for (const item in companyData.financialStatements[year][statement as keyof IFinancialStatement]) {
                    if (typeof companyData.financialStatements[year][statement as keyof IFinancialStatement][item] === 'string') {
                        companyData.financialStatements[year][statement as keyof IFinancialStatement][item] = {
                            value: companyData.financialStatements[year][statement as keyof IFinancialStatement][item] as unknown as string,
                            multipleValues: null
                        }
                    }
                }
            }
        }

        dispatch(setCompanyData(companyData as ICompanyData))
        dispatch(setNewCompanyData(companyData as ICompanyData))
        dispatch(setCompanyLoading(false))
    }
}

const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;


export {
    saveCompanyData,
    saveCompanyDataWeb3Storage,
    getCompanyData,
    isObjectEmpty,
    selectCompany,
    saveFile
}