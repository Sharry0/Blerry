

import TokenBalance from "./TokenBalance"
import { TOKENS_BY_NETWORK } from "./wallet/tokenBalance"

export default function TokenList({ chainId }) {

  console.log(TOKENS_BY_NETWORK[chainId])

  return (
    <>
      {TOKENS_BY_NETWORK[chainId]?.map((token) => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  )
}

