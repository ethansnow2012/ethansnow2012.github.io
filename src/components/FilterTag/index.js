import React from 'react'
import styled from 'styled-components'
const Styled = styled.div`
    position: relative;
    min-width: max-content;
    ---color-filter-tag:${props=>props.color??''};
    display: flex;
    align-items: center;
    cursor: pointer;
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
    &.active{

    }
    &.inactive{
        opacity: 0.4;
    }
    &.inactive::before{
        opacity: 0.5;
    }
`
//
export function FilterTag({children, tagData, checkActive, tagClickFactory}){
    const active = checkActive?tagData.active: true
    console.log('FilterTag')
    return (
        <Styled color={tagData.color} onClick={tagClickFactory(tagData)} key={tagData.id} className={active?' active':' inactive'}>
            <div >
                {tagData.name}
            </div>
        </Styled>
    )
}

export const DefaultStyle = Styled
