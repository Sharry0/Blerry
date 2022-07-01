
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
    ],
    
    // _______ This is TypeScript, why declare the type before the array? ________
    // export interface IERC20 {
    //     symbol: string
    //     address: string
    //     decimals: number
    //     name: string
    // }
    
    // export const TOKENS_BY_NETWORK: {
    //     [key]: IERC20[]
    // } = {
    //     [Networks.Rinkeby]: [
    //         {
    //             address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    //             symbol: "DAI",
    //             name: "Dai",
    //             decimals: 18,
    //         },
    //         {
    //             address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
    //             symbol: "MKR",
    //             name: "Maker",
    //             decimals: 18,
    //         },
    //     ],
    // }
    
}