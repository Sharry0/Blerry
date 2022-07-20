

import TokenBalance from "./TokenBalance";
import { TOKENS_BY_NETWORK } from "../utils/index";

export default function TokenList({ chainId }) {

  return (
    <>
      {TOKENS_BY_NETWORK[chainId]?.map((token) => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  )
}

