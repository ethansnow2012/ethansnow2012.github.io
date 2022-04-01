import React from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing } from 'containers/Functional'
import { fakeTopics, fakeTags, fakeCategory } from 'testData/data'


const Styled = styled.div`
    min-height: 100vh;
    background: var(--color-basic-background);
    .p-select-wrapper{
        //max-width:350px;
        margin-left:auto;
        margin-right:auto;
    }
    .p-content-wrapper{
        background: white;
        padding: 5vmin 10vmin;
    }
    .p-select-wrapper-i1{
        max-width:350px;
        margin:auto;
    }
    .p-select-wrapper-i2{
        max-width:600px;
        margin:auto;
    }
`

export function MainPage() {
    
    return (
        <Styled>
            <Header></Header>
            <BaseContentSpacing>
                <div className='p-select-wrapper'>
                    <div className='p-select-wrapper-i1'>
                        <CSelect>
                            {
                                fakeCategory.data.map(()=>{
                                    return (
                                        <option value='option1'>Option 1</option>
                                    )
                                })
                            }
                        </CSelect>
                    </div>
                    <div className='p-select-wrapper-i2'>
                        <FilterTagWrapper data={fakeTags.data}></FilterTagWrapper>
                    </div>
                    
                </div> 
                <div className='p-content-wrapper'>
                    <SubjectCardWrapper data={fakeTopics.data}></SubjectCardWrapper>
                </div>
            </BaseContentSpacing>
        </Styled>
    )
}