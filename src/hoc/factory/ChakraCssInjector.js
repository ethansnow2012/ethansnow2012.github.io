 import React, {forwardRef} from 'react'
 import styled from 'styled-components'


 const Styled = styled.div`
    ${
        props => props.styleString
    }
 `
 
export function ChakraCssInjector(ChakraEl, styleString){
    return forwardRef((props, ref)=>(
        <Styled styleString={styleString}>
            <ChakraEl ref={ref} {...props}/>
        </Styled>
    ))
}

