import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle }from 'react'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing, BaseContentSpacingStyle } from 'containers/Functional'
import { fakeTopics, fakeTags, fakeCategory } from 'testData/data'
import {faker} from '@faker-js/faker'

import { injectStyleState, toggleDisplayViaKeyAndId , toggleDisplayViaArrayOfIds } from 'utils/dataProcessor'

import { getFakeTopics, getFakeTags, getFakeCategory } from 'service/data'



const Styled = styled.div`
    width:100%;
    min-height: 100vh;
    background: var(--color-basic-background);
    
    & ${BaseContentSpacingStyle} {
        padding-top: var(--maincontent-vpadding);
        padding-bottom: var(--maincontent-vpadding);
    }
    
    .p-select-wrapper{
        //max-width:350px;
        margin-left:auto;
        margin-right:auto;
    }
    & .p-select-wrapper > * + * {
        margin-top: var(--maincontent-innerspacing);
    }
    .p-content-wrapper-outter{
        position: relative;
        overflow: hidden;
        transition: all 1s ease-out;
        background: white;
    }
    .p-content-wrapper{
        padding: 5vmin 6.5vmin;
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
    .p-select-wrapper-i2 > * > * {
        margin-top: min(8vmin, 23px);
    }
    @media(max-width: 800px) {
        & ${BaseContentSpacingStyle} {
            padding-left: 10vmin;
            padding-right: 10vmin;
        }
    }
`


function arraysEqual(a1,a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1)==JSON.stringify(a2);
}

function injectDefaultCategory (fakeCategory){
    fakeCategory.data.unshift({
        id: faker.datatype.uuid(),
        name: 'All',
        tags: fakeTags.data.map(x=>x.id),
        selected:true,
    })
    return fakeCategory
}

function tagsFilter(tagsObject, activeCategoryObject){
    const tagsHaveActive = tagsObject.filter(x=>x.active).length>0?true:false
    return tagsObject
        .filter((x)=>{
            if(tagsHaveActive){
                return x.active && x.display && activeCategoryObject.tags.indexOf(x.id)>=0
            }
            return x.display && activeCategoryObject.tags.indexOf(x.id)>=0
        })
}

export const MainPage = forwardRef(function (props, ref) {
    const rawRef = useRef()
    useImperativeHandle(ref, ()=>
        ({
            simpleConsole: ()=>{ console.log('simpleConsole', ref) },
            rawRef
        })
    )
    const [fakeCategoryState, setFakeCategoryState] = useState({data:[]})
    const [fakeTagState, setFakeTagState] = useState({data:[]})
    const [fakeTopicState, setFakeTopicState] = useState({data:[]})

    const effectPreventer_1 = useRef(true)
    const effectPreventer_2 = useRef(true)
    const effect1_initialDataLoaded = useRef(false)

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
                
                const _fakeCategory = injectDefaultCategory(
                                        injectStyleState(fakeCategory)
                                    )
                let _fakeTags = injectStyleState(fakeTags)
                const _fakeTopics = injectStyleState(fakeTopics)

                _fakeTags.data[0].active = true
                
                // relate with refs
                Raw_fakeCategory.current = _fakeCategory
                Raw_fakeTags.current = _fakeTags
                Raw_fakeTopics.current = _fakeTopics
                
                // determine whether is active
                refActiveCategory.current = Raw_fakeCategory.current.data.filter(x=>x.selected)[0]
                // const tagsHaveActive = Raw_fakeTags.current.data.filter(x=>x.active).length>0?true:false
                // refActiveTags.current = Raw_fakeTags.current.data
                //                         .filter((x)=>{
                //                             if(tagsHaveActive){
                //                                 return x.active && refActiveCategory.current.tags.indexOf(x.id)>=0
                //                             }
                //                             return refActiveCategory.current.tags.indexOf(x.id)>=0
                //                         })
                refActiveTags.current = tagsFilter(Raw_fakeTags.current.data, refActiveCategory.current)
                                     
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

    const tagClickFactory = function(tagData){
        return (ev)=>{
            console.log('tagClick', tagData, ev)
            const tagDataId = tagData.id
            const tagsHaveActive = Raw_fakeTags.current.data.filter(x=>x.active).length>0?true:false
    
            setFakeTagState((self)=>{
                if(tagsHaveActive){
                    self.data = self.data.map((x)=>{
                        if(x.id==tagDataId){
                            x.active = !x.active
                            return x
                        }
                        return x
                    })
                    refActiveTags.current = tagsFilter(self.data, refActiveCategory.current)
                }
                return {...self}
            })
        }
    }

    /**
     * useEffect1: category to tagState
     *  trigger - fakeCategoryState
     *  output - fakeTagState
     *  inner state(ref) - effect1_initialDataLoaded
     */
    useEffect(()=>{
        let categoryObject = refActiveCategory.current//Raw_fakeCategory.current.data.filter(x=>categoryId==x.id)[0]
        if(categoryObject){ //reactive effect stopper
            setFakeTagState((self)=>{
                const newSelf = toggleDisplayViaArrayOfIds(self, 2, categoryObject['tags'])
                
                // reset active states of tags
                if(effect1_initialDataLoaded.current){
                    newSelf.data.forEach(
                        x=> delete x.active
                    )
                }
                
                refActiveTags.current = tagsFilter(newSelf.data, refActiveCategory.current, 'mode:remove_active')

                effect1_initialDataLoaded.current = true

                if(arraysEqual(self.data, newSelf.data)){// prevent same value
                    return {...self}
                }
                return {...newSelf}            
            })
        }
    }, [fakeCategoryState]) //cascading effect: fakeCategoryState -> fakeTagState

    /**
     * useEffect2: tagState to fakeTopicState
     *  trigger - tagState
     *  output - fakeTopicState
     *  inner state(ref) - 
     */
    useEffect(()=>{
        if(effectPreventer_2.current==true){
            effectPreventer_2.current = false
            return
        }

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
        <Styled ref={rawRef}>            
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
                        <FilterTagWrapper key={fakeTagState.id} data={fakeTagState.data} tagClickFactory={tagClickFactory}></FilterTagWrapper>
                    </div>
                    
                </div> 
                <div className='p-content-wrapper-outter'>
                    <div className='p-content-wrapper'>
                        <SubjectCardWrapper data={fakeTopicState.data} tags={fakeTagState.data}></SubjectCardWrapper>
                    </div>
                </div>
            </BaseContentSpacing>
        </Styled>
    )
})
export const DefaultStyle = Styled
