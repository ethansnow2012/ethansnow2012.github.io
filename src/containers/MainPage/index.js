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
        margin-top: 10vmin;
    }
    .p-content-wrapper{
        background: white;
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
        margin-top: 8vmin;
    }
`
const _fakeCategory = injectStyleState(fakeCategory)
const _fakeTags = injectStyleState(fakeTags)
const _fakeTopics = injectStyleState(fakeTopics)

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
    
    
    const click = ()=>{
        setFakeTopicState((self)=>{
            let newSelf = {
                ...self
            }
            newSelf.data[0].display = false
            
            console.log('newSelf', newSelf, newSelf.data[0].display)
            return newSelf
        })
    }
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
        console.log('useEffect1')
        let categoryObject = refActiveCategory.current//Raw_fakeCategory.current.data.filter(x=>categoryId==x.id)[0]
        setFakeTagState((self)=>{
            const newSelf = toggleDisplayViaArrayOfIds(self, 2, categoryObject['tags'])
            refActiveTags.current = newSelf.data.filter(x=>x.display)
            return {...newSelf}            
        })
        

    }, [fakeCategoryState]) //cascading effect: fakeCategoryState -> fakeTagState

    useEffect(()=>{
        //get tag ids
        console.log('useEffect2', refActiveTags.current)
        setFakeTopicState((self)=>{
            const newSelf = toggleDisplayViaKeyAndId(self, 2 , 'tags', refActiveTags.current.map(x=>x.id))
            return {...newSelf}   
        })
        //refTagIds
    }, [fakeTagState]) //cascading effect: fakeTagState -> fakeTopicState
    
    return (
        <Styled>
            <Header></Header>
            <BaseContentSpacing>
                <div onClick={click}>
                    BTN
                </div>
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
                <div className='p-content-wrapper'>
                    <SubjectCardWrapper data={fakeTopicState.data}></SubjectCardWrapper>
                </div>
            </BaseContentSpacing>
        </Styled>
    )
}