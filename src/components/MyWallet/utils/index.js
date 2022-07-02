
import {isAddress} from "@ethersproject/address"
import {Contract} from "@ethersproject/contracts"

export const Networks = {
    MainNet: 1,
    Rinkeby: 4,
    Ropsten: 3,
    Kovan: 42,
}

export const TOKENS_BY_NETWORK = {
    [Networks.Rinkeby] : [
        {
            address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
            symbol: "DAI",
            name: "Dai",
            decimals: 18,
        },
        {
            address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
            symbol: "MKR",
            name: "Maker",
            decimals: 18,
        },
    ],
    [Networks.Kovan] : [
        {
            address: "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
            symbol: "DAI",
            name: "Dai",
            decimals: 18,
        },
        {
            address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
            symbol: "WETH",
            name: "Wrapped Ether",
            decimals: 18,
        },
        {
            address: "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
            symbol: "MFNFT",
            name: "MultiFaucet NFT",
            decimals: 0,
        }
    ],
}

export const fetcher = (library, abi) => (...args) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
      const address = arg1
      const method = arg2
      const contract = new Contract(address, abi, library.getSigner())
      return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
  }
