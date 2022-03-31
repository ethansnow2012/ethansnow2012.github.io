import React from 'react'
import styled from 'styled-components'
import {FilterTag , DefaultStyle} from 'components/FilterTag'
const Styled = styled.div`
    display: flex;
    flex-gap: 2em;
    ${DefaultStyle}{
        margin-right: 10px;
    }
`

export function FilterTagWrapper({children, data}){
    return (
        <Styled>
            {
                data.map(()=>{
                    return (
                        <FilterTag></FilterTag>
                    )
                })
            }
        </Styled>
    )
}