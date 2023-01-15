import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { ICompanyData, ICompanyEthData } from "../types/CompanyDataTypes"
import { IGeneral, setCompanyLoading } from "src/features/general"
import { setCompanyData } from "src/features/companyDataSlice"
import { setCompanyData as setNewCompanyData } from 'src/features/newCompanyDataSlice'
import { nftStorageApiKey, web3StorageApiKey } from "src/metadata"
import { NFTStorage } from "nft.storage"
import { WebBundlr } from '@bundlr-network/client';
import { Web3Storage } from "web3.storage"

const saveCompanyData = async (data: ICompanyData) => {
    let hashNftStorage = null
    let hashWeb3Storage = null

    try {
        let nftStoragePromise = saveCompanyDataNftStorage(data)
        let web3StoragePromise = saveCompanyDataWeb3Storage(data)

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
        const client = new NFTStorage({ token: nftStorageApiKey })

        let blob = new Blob([JSON.stringify(data)])

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.storeCar(car)
    }
    catch (error) {
        throw error
    }
}

const saveCompanyDataWeb3Storage = async (data: ICompanyData): Promise<string> => {
    try {
        let client = new Web3Storage({ token: web3StorageApiKey })

        const blob = new Blob([JSON.stringify(data)])

        const { car } = await NFTStorage.encodeBlob(blob)

        // const { car } = await NFTStorage.encodeNFT({
        //     description: "",
        //     name: "",
        //     image: file
        // })

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
        let nftStoragePromise = saveFileToNftStorage(file)
        let web3StoragePromise = saveFileToWeb3Storage(file)

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
        // let client = new NFTStorage({ token: nftStorageApiKey })

        // const { car } = await NFTStorage.encodeNFT({
        //     description: file.name,
        //     name: file.name,
        //     image: file
        // })

        // console.log(car)

        // return await client.storeCar(car)

        const client = new NFTStorage({ token: nftStorageApiKey })

        let blob = new Blob([file], {type: 'application/pdf'})

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.storeCar(car)        
    }
    catch (error) {
        throw error
    }
}

const saveFileToWeb3Storage = async (file: File): Promise<string> => {
    try {
        // let client = new Web3Storage({ token: web3StorageApiKey })

        // const { car } = await NFTStorage.encodeNFT({
        //     description: file.name,
        //     name: file.name,
        //     image: file
        // })

        // return await client.putCar(car)

        let client = new Web3Storage({ token: web3StorageApiKey })

        const blob = new Blob([file], {type: 'application/pdf'})

        const { car } = await NFTStorage.encodeBlob(blob)

        return await client.putCar(car)
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

const getCompanyData = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        let companyDataNFTStorage = await getCompanyDataNFTStorage(dataHash)

        if (companyDataNFTStorage) {
            return companyDataNFTStorage
        }

        let companyDataWeb3Storage = await getCompanyDataWeb3Storage(dataHash)

        if (companyDataWeb3Storage) {
            return companyDataWeb3Storage
        }

        throw new Error('Error fetching company data')

        // let response = await fetch(`https://nftstorage.link/ipfs/${dataHash}`)

        // if (response.ok) {
        //     return await response.json() as ICompanyData
        // }
        // else {
        //     throw new Error('Error fetching company data')
        // }
    }
    catch (error) {
        throw error
    }
}

const getCompanyDataWeb3Storage = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        let client = new Web3Storage({ token: web3StorageApiKey })

        let response = await client.get(dataHash)
        let files = (await response?.files())

        if (files && files.length > 0) {
            let blob = new Blob([files[0]], { type: files[0].type })

            return JSON.parse(await blob.text()) as ICompanyData
        }

        return null
    }
    catch (error) {
        throw error
    }
}

const getFileWeb3Storage = async (dataHash: string): Promise<File | null> => {
    try {
        let client = new Web3Storage({token: web3StorageApiKey})

        let response = await client.get(dataHash)
        let files = (await response?.files())

        if (files && files.length > 0) {
            return files[0]
        }

        return null
    }
    catch (error) {
        throw error
    }
}

const getCompanyDataNFTStorage = async (dataHash: string): Promise<ICompanyData | null> => {
    try {
        let response = await fetch(`https://nftstorage.link/ipfs/${dataHash}`)

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