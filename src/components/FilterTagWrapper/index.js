import React from 'react'
import styled from 'styled-components'
import {FilterTag , DefaultStyle} from 'components/FilterTag'
const Styled = styled.div`
    display: flex;
    flex-gap: 2em;
    flex-wrap: wrap;
    transform:rotate(180deg);
    justify-content: end;
    ${DefaultStyle}{
        transform:rotate(180deg);
        margin-right: 10px;
    }
`

export function FilterTagWrapper({children, data}){
    return (
        <Styled>
            {
                data.map((tagData)=>{
                    return (
                        <FilterTag tagData={tagData}></FilterTag>
                    )
                })
            }
        </Styled>
    )
}