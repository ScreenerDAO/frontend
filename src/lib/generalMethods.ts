import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import ICompanyData from "src/types/ICompanyData"
import ICompanyEthData from "src/types/ICompanyEthData"
import { IGeneral, setCompanyLoading } from "src/features/general"
import { setCompanyData } from "src/features/companyDataSlice"
import { setCompanyData as setNewCompanyData } from 'src/features/newCompanyDataSlice'
import { NFTStorage, Blob } from "nft.storage"
import { Web3Storage } from "web3.storage"
import FormData from "form-data"

const saveCompanyData = async (data: string) => {
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

const saveCompanyDataNftStorage = async (data: string): Promise<string> => {
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string })

    const blob = new Blob([data])

    return await client.storeBlob(blob)
}

const saveCompanyDataWeb3Storage = async (data: string): Promise<string> => {
    const blob = new Blob([data])

    const response = await fetch("https://api.web3.storage/upload", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.WEB3_STORAGE_API_KEY}`,
            "Content-Type": "application/octet-stream",
        },
        body: blob,
    })

    return (await response.json()).cid
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
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string })

    return await client.storeBlob(file)
}

const saveFileToWeb3Storage = async (file: File): Promise<string> => {
    const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY as string })

    return await client.put([file])
}

const saveFileToEstuary = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('data', file);

    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.ESTUARY_API_KEY}`,
        'Content-Type': 'multipart/form-data'
    };

    fetch('https://api.estuary.tech/content/add', {
        method: 'POST',
        headers,
        body: formData as any
    })
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data));
        })
        .catch(error => {
            console.error(error);
        });
}

const getCompanyData = async (dataHash: string): Promise<ICompanyData | null> => {
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

const getCompanyDataWeb3Storage = async (dataHash: string): Promise<ICompanyData | null> => {
    const response = await fetch(`https://${dataHash}.ipfs.w3s.link`)

    if (response.ok) {
        return parseCompanyData(await response.text())
    }

    return null
}

const getCompanyDataNFTStorage = async (dataHash: string): Promise<ICompanyData | null> => {
    const response = await fetch(`https://nftstorage.link/ipfs/${dataHash}`)
    const responseText = await response.text()

    if (response.ok) {
        return parseCompanyData(responseText)
    }

    return null
}

const parseCompanyData = (compressedData: string): Promise<ICompanyData> => JSON.parse(compressedData)

const selectCompany = async (
    item: ICompanyEthData,
    dispatch: ThunkDispatch<{
        companyData: ICompanyData;
        newCompanyData: ICompanyData;
        general: IGeneral;
    }, undefined, AnyAction>
) => {
    let companyData = {} as ICompanyData

    try {
        dispatch(setCompanyLoading(true))

        companyData = (await getCompanyData(item.dataHash)) ?? {} as ICompanyData

        if (!companyData.id) {
            companyData.id = item.id
        }
    }
    catch (error) {
        companyData.id = item.id
        companyData.companyName = item.name
        companyData.ticker = item.ticker
        companyData.country = ""
        companyData.financialStatements = {}
        companyData.annualReports = {}
    }
    finally {
        dispatch(setNewCompanyData(companyData as ICompanyData))
        dispatch(setCompanyData(companyData as ICompanyData))
        dispatch(setCompanyLoading(false))
    }
}

const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;

const getWikipediaSummary = async (pageTitle: string) => {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`;

    const response = await fetch(apiUrl)

    return await response.json()
}

const getISOCountries = () => fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => data.map((country: any) => country.name.common))

const getISOCurrencies = (): Promise<string[]> => fetch('https://openexchangerates.org/api/currencies.json')
    .then(response => response.json())
    .then(data => Object.values(data))

export {
    saveCompanyData,
    saveCompanyDataWeb3Storage,
    getCompanyData,
    isObjectEmpty,
    selectCompany,
    saveFile,
    saveFileToEstuary,
    getWikipediaSummary,
    getISOCountries,
    getISOCurrencies
}