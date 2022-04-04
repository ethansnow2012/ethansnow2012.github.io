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

export function FilterTagWrapper({children, data, tagClickFactory}){
    const checkActive = data.filter(x=>x.active).length>0?true:false
    console.log('FilterTagWrapper')
    return (
        <Styled>
            {
                data.filter(x=>x.display).reverse().map((tagData)=>{//
                    return (
                        <FilterTag key={tagData.id} tagData={tagData} checkActive={checkActive} tagClickFactory={tagClickFactory}></FilterTag>
                    )
                })
            }
        </Styled>
    )
}