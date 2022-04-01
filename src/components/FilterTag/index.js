import React from 'react'
import styled from 'styled-components'
const Styled = styled.div`
    position: relative;
    min-width: max-content;
    ---color-filter-tag:${props=>props.color??''};
    &::before{
        content: '';
        width: 10px;
        height: 10px;
        background: #618ddc;
        display: inline-block;
        margin-right: 5px;
        position: relative;
        top: 1px;
        background: var(---color-filter-tag);
    }
`

export function FilterTag({children, tagData}){
    return (
        <Styled color={tagData.color}>
            {tagData.name}
        </Styled>
    )
}

export const DefaultStyle = Styled
