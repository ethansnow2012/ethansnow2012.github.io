import React, { useState, useEffect, useRef }from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing, BaseContentSpacingStyle } from 'containers/Functional'
import { fakeTopics, fakeTags, fakeCategory } from 'testData/data'

import { injectStyleState, toggleDisplayViaKeyAndId , toggleDisplayViaArrayOfIds } from 'utils/dataProcessor'

import { getFakeTopics, getFakeTags, getFakeCategory } from 'service/data'



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


function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
}

export function MainPage() {

    const [fakeCategoryState, setFakeCategoryState] = useState({data:[]})
    const [fakeTagState, setFakeTagState] = useState({data:[]})
    const [fakeTopicState, setFakeTopicState] = useState({data:[]})

    const Raw_fakeCategory = useRef(fakeCategoryState)
    const Raw_fakeTags = useRef(fakeTagState)
    const Raw_fakeTopics = useRef(fakeTopicState)
    
    const [defaultSelect, setDefaultSelect] = useState(null);
    const refActiveCategory = useRef(Raw_fakeCategory.current.data.filter(x=>x.selected)[0])
    const refActiveTags = useRef(
                        Raw_fakeTags.current.data
                            .filter((x)=>{
                                return refActiveCategory.current.tags.indexOf(x.id)>=0
                            })[0]?.id
                        )
    useEffect(()=>{
        Promise.all([getFakeCategory(), getFakeTags(), getFakeTopics()])
            .then(values => {
                console.log('values', values)
                const [fakeCategory, fakeTags, fakeTopics] = values
                
                const _fakeCategory = injectStyleState(fakeCategory)
                const _fakeTags = injectStyleState(fakeTags)
                const _fakeTopics = injectStyleState(fakeTopics)

                Raw_fakeCategory.current = _fakeCategory
                Raw_fakeTags.current = _fakeTags
                Raw_fakeTopics.current = _fakeTopics

                refActiveCategory.current = Raw_fakeCategory.current.data.filter(x=>x.selected)[0]
                refActiveTags.current = Raw_fakeTags.current.data
                                        .filter((x)=>{
                                            return refActiveCategory.current.tags.indexOf(x.id)>=0
                                        })
                                     
                setDefaultSelect(refActiveCategory.current.id)
                setFakeCategoryState(()=>{
                    return {...Raw_fakeCategory.current}
                })
                setFakeTagState(()=>{
                    const newSelf = toggleDisplayViaArrayOfIds(Raw_fakeTags.current, 2, refActiveCategory.current['tags'])
                    return {...newSelf}
                })
                setFakeTopicState(()=>{
                    const newSelf = toggleDisplayViaKeyAndId(Raw_fakeTopics.current, 2 , 'tags', refActiveTags.current.map(x=>x.id))
                    return {...newSelf}
                })
            });
        
                            
    },[])
    //====
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
        if(categoryObject){ //reactive effect stopper
            setFakeTagState((self)=>{
                const newSelf = toggleDisplayViaArrayOfIds(self, 2, categoryObject['tags'])
                refActiveTags.current = newSelf.data.filter(x=>x.display)
                console.log('useEffect1')
                if(arraysEqual(self.data, newSelf.data)){// prevent same value
                    return {...self}
                }
                return {...newSelf}            
            })
        }

    }, [fakeCategoryState]) //cascading effect: fakeCategoryState -> fakeTagState

    useEffect(()=>{
        if(refActiveTags.current){
            setFakeTopicState((self)=>{
                console.log('useEffect2')
                const newSelf = toggleDisplayViaKeyAndId(self, 2 , 'tags', refActiveTags.current.map(x=>x.id))
                if(arraysEqual(self.data, newSelf.data)){// prevent same value
                    return {...self}
                }
                return {...newSelf}   
            })
        }
    }, [fakeTagState]) //cascading effect: fakeTagState -> fakeTopicState
    
    return (
        <Styled>
            <Header></Header>
            <BaseContentSpacing>
                <div className='p-select-wrapper'>
                    <div className='p-select-wrapper-i1'>
                        <CSelect defaultValue={defaultSelect} onChange={select} key={defaultSelect} >
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