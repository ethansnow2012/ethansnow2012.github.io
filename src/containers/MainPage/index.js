import React, { useState, useEffect, useRef }from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing, BaseContentSpacingStyle } from 'containers/Functional'
import { fakeTopics, fakeTags, fakeCategory } from 'testData/data'

import { injectStyleState, toggleDisplayViaKeyAndId , toggleDisplayViaArrayOfIds } from 'utils/dataProcessor'



const Styled = styled.div`
    min-height: 100vh;
    background: var(--color-basic-background);
    & ${BaseContentSpacingStyle} {
        padding-top: 10vmin;
        padding-bottom: 10vmin;
    }
    .p-select-wrapper{
        //max-width:350px;
        margin-left:auto;
        margin-right:auto;
    }
    & .p-select-wrapper > * + * {
        margin-top: min(10vmin, 2em);
    }
    .p-content-wrapper-outter{
        position: relative;
        overflow: hidden;
        transition: all 1s ease-out;
        background: white;
    }
    .p-content-wrapper{
        padding: 5vmin 10vmin;
    }
    .p-select-wrapper-i1{
        max-width:350px;
        margin-right:auto;
        margin-left:auto;
    }
    .p-select-wrapper-i2{
        max-width:600px;
        margin-right:auto;
        margin-left:auto;
    }
    .p-select-wrapper-i2 * > *{
        margin-top: min(8vmin, 23px);
    }
`
const _fakeCategory = injectStyleState(fakeCategory)
const _fakeTags = injectStyleState(fakeTags)
const _fakeTopics = injectStyleState(fakeTopics)

function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
}

export function MainPage() {
    const Raw_fakeCategory = useRef(_fakeCategory)
    const Raw_fakeTags = useRef(_fakeTags)
    const Raw_fakeTopics = useRef(_fakeTopics)


    const refActiveCategory = useRef(Raw_fakeCategory.current.data.filter(x=>x.selected)[0])

    const refActiveTags = useRef(
                        Raw_fakeTags.current.data
                            .filter((x)=>{
                                return refActiveCategory.current.tags.indexOf(x.id)>=0
                            })[0].id
                        )

    const [fakeCategoryState, setFakeCategoryState] = useState(Raw_fakeCategory.current)
    const [fakeTagState, setFakeTagState] = useState(Raw_fakeTags.current)
    const [fakeTopicState, setFakeTopicState] = useState(Raw_fakeTopics.current)
    
    const select = (ev)=>{
        const selectedId = ev.currentTarget.value 
        refActiveCategory.current = Raw_fakeCategory.current.data.filter(x=>x.id==selectedId)[0]
        setFakeCategoryState((self)=>{
            let newSelf = {}
            for(let key in self){
                if(key=='selected'){
                    if(selectedId==self.id){
                        newSelf[key] = self[key]
                        continue
                    }else{
                        continue
                    }
                }
                newSelf[key] = self[key]
            }
            return newSelf
        })
    }
    useEffect(()=>{
        //let categoryId = refCategoryId.current
        
        let categoryObject = refActiveCategory.current//Raw_fakeCategory.current.data.filter(x=>categoryId==x.id)[0]
        setFakeTagState((self)=>{
            const newSelf = toggleDisplayViaArrayOfIds(self, 2, categoryObject['tags'])
            refActiveTags.current = newSelf.data.filter(x=>x.display)
            console.log('useEffect1')
            if(arraysEqual(self.data, newSelf.data)){// prevent same value
                return {...self}
            }
            return {...newSelf}            
        })
        

    }, [fakeCategoryState]) //cascading effect: fakeCategoryState -> fakeTagState

    useEffect(()=>{
        console.log('useEffect2')
        setFakeTopicState((self)=>{
            const newSelf = toggleDisplayViaKeyAndId(self, 2 , 'tags', refActiveTags.current.map(x=>x.id))
            if(arraysEqual(self.data, newSelf.data)){// prevent same value
                return {...self}
            }
            return {...newSelf}   
        })
    }, [fakeTagState]) //cascading effect: fakeTagState -> fakeTopicState
    
    return (
        <Styled>
            <Header></Header>
            <BaseContentSpacing>
                <div className='p-select-wrapper'>
                    <div className='p-select-wrapper-i1'>
                        <CSelect  defaultValue={fakeCategoryState.data.filter(x=>x.selected)[0].id} onChange={select}>
                            {
                                fakeCategoryState.data.map((category)=>{
                                    return (
                                        <option key={category.id} value={category.id} >
                                            {category.name}
                                        </option>
                                    )
                                })
                            }
                        </CSelect>
                    </div>
                    <div className='p-select-wrapper-i2'>
                        <FilterTagWrapper data={fakeTagState.data}></FilterTagWrapper>
                    </div>
                    
                </div> 
                <div className='p-content-wrapper-outter'>
                    <div className='p-content-wrapper'>
                        <SubjectCardWrapper data={fakeTopicState.data}></SubjectCardWrapper>
                    </div>
                </div>
            </BaseContentSpacing>
        </Styled>
    )
}