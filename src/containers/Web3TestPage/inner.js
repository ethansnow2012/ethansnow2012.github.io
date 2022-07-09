

import styled from 'styled-components'
import useSWR from 'swr'
import { useEffect, useRef, useMemo, useState } from 'react'

import { useAccount, useConnect, useDisconnect, useContract, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


const Styled = styled.div`
    &  * + * {
        margin-top:10px;
    }

    &  .l-button {
        background-color: #5757f5;
        padding: 10px 20px;
        width: max-content;
        color: white;
        border-radius: 8px;
        cursor: pointer;
    }
`
const contractAddress = '0x73425c9644B1ff1760B74E8fB60c0534562c89b2'

const abi = [
    {
        "inputs": [],
        "name": "inc",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            }
        ],
        "name": "Inc",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "incbytwo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_counter",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    console.log(method, params)
    return library[method](...params)
}

export const Web3TestPageInner = () => {
    
    const [count, setCount] = useState('')
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
    const { data: signer, isError, isLoading } = useSigner()

    const contract = useContract({
        addressOrName: contractAddress,
        contractInterface: abi,
        signerOrProvider: signer,
    })

    const [contractData, setContractData] = useState()


    const connectClick = async () => {
        try {
            connect()
        } catch (err) {

        }
    }
    const disconnectClick = async () => {
        try {
            disconnect()
        } catch (err) {
            console.log('connect err')
        }
    }
    const add = async () => {

        console.log('add', contract)

        try {
            contract.inc()
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        if (address && isConnected && signer) {
            const getData = async () => {
                const data = await contract.get()
                setCount(parseInt(data._hex))
            }
            getData()
        }
    }, [isConnected, signer])
    useEffect(() => {
        const getDataInterval = async () => {
            if (address && isConnected && signer) {
                const data = await contract.get()
                setCount(parseInt(data._hex))
            }
        }
        const intervalHanlde = setInterval(() => {
            getDataInterval()
        }, 4000)
        return () => {
            clearInterval(intervalHanlde);
        }
    }, [isConnected, signer])

    return (
        <Styled>
            {
                isConnected ?
                    (
                        <div>
                            <div>
                                Connected to {address}
                            </div>
                            <button className='l-button' onClick={() => disconnect()}>Disconnect</button>
                            <div>
                                <button className='l-button' onClick={add}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <button className='l-button' onClick={() => connect()}>Connect Wallet</button>
                    )
            }
            <div >{contractData}</div>
            {
                isConnected
                    ?
                    <div>count: {count}</div> : ""
            }

        </Styled>
    )


}

