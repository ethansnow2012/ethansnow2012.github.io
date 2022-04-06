
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    max-width: var(--maincontent-maxwidth);
    margin-left: auto;
    margin-right: auto;
    flex:${props=>props.styleArgs?.active?9999:'1'}
`

export function BaseContentSpacing({children, styleArgs}) {
    console.log('BaseContentSpacing', styleArgs)
    return (
        <Styled styleArgs={styleArgs}>
            {children}
        </Styled>
    )
}

export const DefaultStyle = Styled