
import styled from 'styled-components'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Web3 from 'web3'
import {Web3TestPageInner} from './inner'

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  })

const Styled = styled.div`
    padding: 10px;
    & h1{
        font-size: 2em;
    }
`

const getLibrary = (provider)=>{
    return new Web3(provider)
}

export const Web3TestPage = () => {
    
    return (
        <Styled>
            <WagmiConfig client={client}>
                <h1>Web3 test</h1>
                <Web3TestPageInner></Web3TestPageInner>
            </WagmiConfig>
        </Styled>
        
    )
}

