
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
`

export function BaseContentSpacing({children}) {
    return (
        <Styled>
            {children}
        </Styled>
    )
}

export const DefaultStyle = Styled