import React from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing } from 'containers/Functional'

const Styled = styled.div`
    min-height: 100vh;
    background: var(--color-basic-background);
    .p-select-wrapper{
        max-width:350px;
        margin-left:auto;
        margin-right:auto;
    }
    .p-content-wrapper{
        background: white;
        padding: 5vmin 10vmin;
    }
`

export function MainPage() {
    
    return (
        <Styled>
            <Header></Header>
            <BaseContentSpacing>
                <div className='p-select-wrapper'>
                    <div>
                        <CSelect>
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </CSelect>
                    </div>
                    <FilterTagWrapper data={[1,2,3]}></FilterTagWrapper>
                </div> 
                <div className='p-content-wrapper'>
                    <SubjectCardWrapper></SubjectCardWrapper>
                </div>
            </BaseContentSpacing>
        </Styled>
    )
}