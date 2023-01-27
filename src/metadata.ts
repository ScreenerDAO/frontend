const registriesContractAddress = "0xA32378239DE1dA367C4f7341F9E3355a76B7246e"
const registriesContractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"ticker","type":"string"},{"indexed":false,"internalType":"string","name":"dataHash","type":"string"}],"name":"CompanyAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"dataHash","type":"string"}],"name":"CompanyDataEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"ticker","type":"string"},{"indexed":false,"internalType":"string","name":"dataHash","type":"string"}],"name":"CompanyEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"CompanyNameEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"string","name":"ticker","type":"string"}],"name":"CompanyTickerEdited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"ticker","type":"string"},{"internalType":"string","name":"dataHash","type":"string"}],"name":"addNewCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"ticker","type":"string"},{"internalType":"string","name":"dataHash","type":"string"}],"name":"editCompany","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"dataHash","type":"string"}],"name":"editCompanyData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"}],"name":"editCompanyName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"ticker","type":"string"}],"name":"editCompanyTicker","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"numberCompanies","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const nftStorageApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI0RjRhMzE4ZkRjNzFBY0I3NEY5NDNlQ2E3MmVmNjBEZmM0NjMzODQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODM3NDgyOTgzOCwibmFtZSI6InRlc3QifQ.7D7Kd7qjkqD03pwe9vD6fytRaEetOMHCf2vIYorvg1c"
const web3StorageApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFhZmVEQjRlOENkYkY1NEIwNjVDRUU1NDQ5RTVDNTk0MEZGYWE0MjciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzMxNzYwNDM4NjUsIm5hbWUiOiJyZWFjdCJ9.jM7ZLsPG0JIcXJS8aX8OUy5v37tsR3jWNuoR1ynxyi8"
const alchemyApiKey = "RIvwjz04WgXuvDJ47-XbO1zc5vtdbIDr"
const THEGRAPH_API_URL = 'https://api.studio.thegraph.com/query/38337/screenerdao-test/v0.0.11'
const chainId = 5

export {
    registriesContractAddress,
    registriesContractABI,
    nftStorageApiKey,
    web3StorageApiKey,
    alchemyApiKey,
    THEGRAPH_API_URL,
    chainId
}