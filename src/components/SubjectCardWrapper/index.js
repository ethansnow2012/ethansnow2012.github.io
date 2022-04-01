
import React, {useState} from 'react'
import styled from 'styled-components'
import {SubjectCard , DefaultStyle} from 'components/SubjectCard'


const Styled = styled.div`
    //display: flex;
    //flex-wrap: wrap;
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
`

export function SubjectCardWrapper({children, data}){
    return (
        <Styled>
            {
                data.filter(x=>x.display).map((dataEl)=>{
                    return (
                        <SubjectCard key={dataEl.id} data={dataEl} ></SubjectCard>
                    )
                })
            }
        </Styled>
    )
}
