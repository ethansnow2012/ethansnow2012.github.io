import React from 'react'
import styled from 'styled-components'
const Styled = styled.div`
    position: relative;
    &::before{
        content: '';
        width: 10px;
        height: 10px;
        background: #618ddc;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        top: 1px;
    }
`

export function FilterTag({children}){
    return (
        <Styled>
            sssss
        </Styled>
    )
}

export const DefaultStyle = Styled
