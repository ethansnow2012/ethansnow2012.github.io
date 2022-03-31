import React from 'react'
import styled from 'styled-components'
import {SubjectCard , DefaultStyle} from 'components/SubjectCard'

const Styled = styled.div`
    
`

export function SubjectCardWrapper({children}){
    return (
        <Styled>
            <SubjectCard></SubjectCard>
            <SubjectCard></SubjectCard>
            <SubjectCard></SubjectCard>
        </Styled>
    )
}
