 import React from 'react'
 import styled from 'styled-components'


 const Styled = styled.div`
    ${
        props => props.styleString
    }
 `
 
export function ChakraCssInjector(ChakraEl, styleString){
    return (props)=>(
        <Styled styleString={styleString}>
            <ChakraEl {...props}/>
        </Styled>
    )
}

