
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from "@ethersproject/units"
import { fetcher } from '../utils'
import ERC20ABI from "../abi/erc20Abi.json"
import useSWR from 'swr'


export default function WalletBalance() {

    const { account, active, library, chainId } = useWeb3React()

    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library, ERC20ABI)
      })
    // console.log("ETHBalanceSWR", balance)
    // console.log(library.on)

    useEffect(() => {
        if (!library) return

        // listen for changes on an Ethereum address
        // console.log(`listening for blocks...`)
        library.on('block', () => {
            console.log('update balance...')
            mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners('block')
        }

        // trigger the effect only on component mount
        // ** changed to library prepared
    }, [library])


    return (
        <div>

            <div>
                {active && balance ? (
                    <div fontSize="md" w='100%' my='2' align='left'>
                        ETH in account: {parseFloat(formatEther(balance)).toFixed(3)} {chainId === 31337 ? 'Test' : ' '} ETH
                    </div>
                ) : (
                    <div fontSize="md" w='100%' my='2' align='left'>ETH in account:</div>
                )}
            </div>

        </div>
    )
}

