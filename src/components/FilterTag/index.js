import React, { useContext } from 'react'
import styled from 'styled-components'
import { WithContextFactory }from 'hoc/factory/WithContext'
import { SplitContext } from 'hoc/factory/RootPageHoc'

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
        margin-right: 2px;
        position: relative;
        top: 1px;
        background: var(---color-filter-tag);
    }
    & > *{
        padding-left: 3px;
        padding-right: 3px;
        border-radius: 3px;
    }
    &.active{

    }
    &.inactive{
        opacity: 0.4;
    }
    &.inactive::before{
        opacity: 0.5;
    }
    &.editable > *{
        background: #ffffff38;
    }
`
//
export function FilterTag({children, tagData, checkActive, tagClickFactory, tagEditBlurFactory}){
    //const { leftContentRef, rightContentRef }  = useContext(SplitContext)
    const active = checkActive?tagData.active: true
    const editable = tagData.editable
    
    console.log('FilterTag')
    if(editable){
        return (
            <Styled color={tagData.color} onClick={tagClickFactory(tagData)} key={tagData.id} className={(active?' active':' inactive') + (' editable') } >
                <div contentEditable="true" onBlur={tagEditBlurFactory(tagData)} suppressContentEditableWarning={true}>
                    {tagData.name}
                </div>
            </Styled>
        )
    }else{
        return (
            <Styled color={tagData.color} onClick={tagClickFactory(tagData)} key={tagData.id} className={active?' active':' inactive'}>
                <div >
                    {tagData.name}
                </div>
            </Styled>
        )
    }
    
}

export const DefaultStyle = Styled

export const FilterTagWithContext = WithContextFactory(FilterTag)