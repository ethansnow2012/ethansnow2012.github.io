

import React, { useState, useEffect, useRef } from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import { BaseContentSpacing, BaseContentSpacingStyle, HSpliter, HSpliterLine } from 'containers/Functional'
import { MainPage, DefaultStyle as MainPageDefaultStyle } from 'containers/MainPage'

import styled from 'styled-components'
const Styled = styled.div`
    min-height:100vh;
    background: var(--color-basic-background);
    & ${MainPageDefaultStyle}{
        padding-top:10px;
        padding-bottom:10px;
    }
    .splitwrapper{
        display: flex;
    }
`
const switchRender = function(renderCode) {
    if(renderCode=='1'){
        return (
            <Styled>
                <BaseContentSpacing>
                    1
                </BaseContentSpacing>
            </Styled>
        )
    }else{
        return (
            <Styled>
                <div className="splitwrapper">
                    <HSpliter>
                        <div>dddd</div>
                        {/* <MainPage/> */}
                    </HSpliter>
                    <HSpliterLine></HSpliterLine>
                    <HSpliter styleArgs={{active: true}}>
                        ss
                    </HSpliter>
                </div>
            </Styled>
        )
    }
    return (
        <BaseContentSpacing>
            404
        </BaseContentSpacing>
    )
    
}

export function RootPage({renderCode}) {
    return (
        <Styled>
            <Header></Header>
            <div>
            {
                switchRender(renderCode)
            }
            </div>
        </Styled>
    )
}

export const DefaultStyle = Styled