
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    background: black;
    width: 200px;
    height: 140px;
    margin: 5px;
    padding: 10px 15px;
    color: white;
    & .topic{
        margin-bottom:7px;
        font-size:0.9em;
    }
    & .description{
        font-size:0.5em
    }
`

export function SubjectCard({children, data}){
    return (
        <Styled>
            <div className='topic'>
                {data.topic}
            </div>
            <div className='description'>
                {data.description}
            </div>
            
        </Styled>
    )
}

export const DefaultStyle = Styled