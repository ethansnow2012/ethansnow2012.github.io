
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    background: black;
    width: 100px;
    height: 200px;
    margin: 5px;
`

export function SubjectCard({children}){
    return (
        <Styled>
            SubjectCardWrapper
        </Styled>
    )
}

export const DefaultStyle = Styled