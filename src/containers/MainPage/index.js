import React, { useState, useContext ,useEffect, useRef, forwardRef, useImperativeHandle, useCallback }from 'react'
import { FilterTagWrapper, SubjectCardWrapper } from 'components'
import { globalContext } from 'App'
import { SplitContext } from 'hoc/factory/RootPageHoc'
import {CSelect} from 'hoc/instance'
import styled from 'styled-components'
import { BaseContentSpacing, BaseContentSpacingStyle } from 'containers/Functional'
import {faker} from '@faker-js/faker'

import { injectStyleState, toggleDisplayViaKeyAndId , toggleDisplayViaArrayOfIds } from 'utils/dataProcessor'

import { getTopics, getTags, getCategory, storeMainContent } from 'service/data'

const StyledFooter = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 60px;
    & .inner-title{

    }
    & .inner{
        margin-top:0.7em;
        max-width: 600px
    }
    & .inner > * + *{
        margin-top:0.5em;
    }
    & .worklink{
        position: relative;
        width: max-content;
        display: flex;
        font-size: 1.4em;
    }
    & .worklink + .worklink{
        margin-top:5px;
    }
    & .worklink:hover img{
        right: 100%;
    }
    & .worklink-dot{
        margin-right: 10px;
    }
    & .worklink a{
        z-index: 1;
    }
    & .worklink img{
        transition: all 1s ease;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        mix-blend-mode: lighten;
        filter: brightness(0.5);
    }
`

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
        position: relative;
        padding: 5vmin 6.5vmin;
    }
    .p-content-wrapper-controlwrapper{
        position: absolute;
        left: calc(5vmin -  0.35em);
        top: calc(6.5vmin + 5px - 9px );
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

function injectDefaultCategory (category, allTags){
    category.data.unshift({
        id: faker.datatype.uuid(),
        name: 'All',
        ui_data:true,
        tags: allTags,//tags.data.map(x=>x.id),
        selected:true,
    })
    return category
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

let TARGET_COLLECTION =  process.env.REACT_APP_TARGET_COLLECTION
//TARGET_COLLECTION = 'alpha_github_page_data_root'

const MainPageFooter = ()=>{
    return (
        <StyledFooter>
            <div>
                <div className='inner-title'>這個網站與關於我:</div>
                <div className='inner'>
                    <div>
                    我是高傑(ethansnow2012@gmail.com)，這個部落格網站的作者，<br/>
                    之後也許會開放成共編平台。<br/>
                    </div>
                    <div>
                    任何如果想合作或聊聊的人，如果看到這裡，<br/>
                    能與您相遇是我的榮幸～<br/>
                    </div>
                    <div></div>
                    <div>
                        <div>
                        其他我的作品：<br/>
                        <br/>
                        </div>
                        <a className="worklink" href="https://ethansnow2012.github.io/rdrag-rdrop">
                            <div className="worklink-dot" >-</div> <div >拖拉元件的函式庫</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <a className="worklink" href="https://ethansnow2012.github.io/recole">
                            <div className="worklink-dot" >-</div> <div >響應式編成實驗</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <a className="worklink" href="https://atticstone.com">
                            <div className="worklink-dot" >-</div> <div >Atticstone.V1</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <br/>
                        <a className="worklink" href="https://github.com/ethansnow2012">
                            <div className="worklink-dot" >-</div> <div >Github</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                    </div>
                </div>
            </div>
        </StyledFooter>
    )
}

export const MainPage = forwardRef(function (props, ref) {
    const { headRef, rightContentRef }  = useContext(SplitContext)
    const {firebase} = useContext(globalContext)
    const rawRef = useRef()
    useImperativeHandle(ref, ()=>
        ({
            simpleConsole: ()=>{ console.log('simpleConsole') },
            innerStates:{ // pseudo field key defined/used
                _categoryState: [categoryState, setCategoryState],
                _tagState: [tagState, setTagState],
                _topicState: [topicState, setTopicState],
                _isEditing: [isEditing, setIsEditing],
                _toBeSaved: [toBeSaved, setTobeSaved]
            },
            saveMainStates: saveMainStates,
            rawRef
        })
    )
    const [categoryState, setCategoryState] = useState({data:[]})
    const [tagState, setTagState] = useState({data:[]})
    const [topicState, setTopicState] = useState({data:[]})

    const [toBeSaved, setTobeSaved] = useState(false)

    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const effectPreventer_1 = useRef(true)
    const effectPreventer_2 = useRef(true)
    const effect1_initialDataLoaded = useRef(false)

    const Raw_category = useRef(categoryState)
    const Raw_tags = useRef(tagState)
    const Raw_topics = useRef(topicState)
    
    const [defaultSelect, setDefaultSelect] = useState(null);
    const refActiveCategory = useRef(Raw_category.current.data.filter(x=>x.selected)[0])
    const refActiveTags = useRef(
                        Raw_tags.current.data
                            .filter((x)=>{
                                return refActiveCategory.current.tags.indexOf(x.id)>=0
                            })[0]?.id
                        )

    const gotoCurrentLocation = useCallback(()=>{
        rawRef.current.scrollIntoView()
    },[])

    useEffect(()=>{
        console.log('MainPage effect')
        const isLandDirectly = (props.selfPosition==props.pageOptions.priority)
        if(isLandDirectly){
            gotoCurrentLocation()
        }
        Promise.all([getCategory(firebase), getTags(firebase), getTopics(firebase)])
            .then(values => {
                console.log('values', values)
                const [category, tags, topics] = values
                
                let _tags = injectStyleState(tags)
                const _category = injectDefaultCategory(
                                        injectStyleState(category),
                                        _tags.data.map(x=>x.id)
                                    )
                const _topics = injectStyleState(topics)

                //_tags.data[0].active = true //fake at lease one active tag
                
                // relate with refs
                Raw_category.current = _category
                Raw_tags.current = _tags
                Raw_topics.current = _topics
                
                // determine whether is active
                refActiveCategory.current = Raw_category.current.data.filter(x=>x.selected)[0]
                // const tagsHaveActive = Raw_tags.current.data.filter(x=>x.active).length>0?true:false
                // refActiveTags.current = Raw_tags.current.data
                //                         .filter((x)=>{
                //                             if(tagsHaveActive){
                //                                 return x.active && refActiveCategory.current.tags.indexOf(x.id)>=0
                //                             }
                //                             return refActiveCategory.current.tags.indexOf(x.id)>=0
                //                         })
                refActiveTags.current = tagsFilter(Raw_tags.current.data, refActiveCategory.current)
                                     
                setDefaultSelect(refActiveCategory.current.id)
                setCategoryState(()=>{
                    return {...Raw_category.current}
                })
                setTagState(()=>{
                    const newSelf = toggleDisplayViaArrayOfIds(Raw_tags.current, 2, refActiveCategory.current['tags'])
                    return {...newSelf}
                })
                setTopicState(()=>{
                    const newSelf = toggleDisplayViaKeyAndId(Raw_topics.current, 2 , 'tags', refActiveTags.current.map(x=>x.id), Raw_tags.current.data)
                    return {...newSelf}
                })
            });
        
                            
    },[])

   
    //====
    const clickAddTopic = ()=>{
        console.log('clickAddTopic')

        const newTopic = {
            id: faker.datatype.uuid(),
            display: true,
            topic: [{
                "type":"paragraph",
                "children":[
                    {
                        "text":""
                    }
                ]
            }],
            description: [{
                "type":"paragraph",
                "children":[
                    {
                        "text": ''
                    }
                ]
            }],
            content: [{
                "type":"paragraph",
                "children":[
                    {
                        "text": ''
                    }
                ]
            }],
            tags:[
                
            ]
        }
        setTopicState((self)=>{
            let newSelf = {}
            self.data.unshift(newTopic)
            for(let key in self){
                newSelf[key] = self[key]
            }
            return {...self}
        })
        setTobeSaved(true)
    }

    const select = (ev)=>{
        const selectedId = ev.currentTarget.value 
        refActiveCategory.current = Raw_category.current.data.filter(x=>x.id==selectedId)[0]
        setCategoryState((self)=>{
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
    const tagEditBlurFactory = (tagData)=>{
        return (ev)=>{
            console.log('tagEditBlur', tagData, ev)
            const tagDataId = tagData.id
            const newText = ev.currentTarget.innerText
            setTagState((self)=>{
                self.data = self.data.map((x)=>{
                    if(x.id==tagDataId){
                        x.name = newText
                        return x
                    }
                    return x
                })
                return {...self}
            })
            setTobeSaved(true)
        }
    }
    
    const tagClickFactory = useCallback(function(tagData){
        return (ev)=>{
            if(isEditing){
                console.log('isEditing')
            }else{
                console.log('tagClick', tagData, ev)
                const tagDataId = tagData.id
        
                setTagState((self)=>{
                    self.data = self.data.map((x)=>{
                        if(x.id==tagDataId){
                            x.active = !x.active
                            return x
                        }
                        return x
                    })
                    refActiveTags.current = tagsFilter(self.data, refActiveCategory.current)
                    return {...self}
                    
                })
            }
            
        }
    }, [isEditing]) 
    /**
     * useEffect0: isEditing mode change
     *  trigger - isEditing
     *  output - tagState
     */
    useEffect(()=>{
        setTagState((self)=>{
            self.data = self.data.map((x)=>{
                x.editable = isEditing
                return x
            })
            return {...self}
        })
    }, [isEditing])
    /**
     * useEffect1: category to tagState
     *  trigger - categoryState
     *  output - tagState
     *  inner state(ref) - effect1_initialDataLoaded
     */
    useEffect(()=>{
        let categoryObject = refActiveCategory.current//Raw_category.current.data.filter(x=>categoryId==x.id)[0]
        if(categoryObject){ //reactive effect stopper
            setTagState((self)=>{
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
    }, [categoryState]) //cascading effect: categoryState -> tagState

    /**
     * useEffect2: tagState to topicState
     *  trigger - tagState
     *  output - topicState
     *  inner state(ref) - 
     */
    useEffect(()=>{
        console.log('useEffect2')
        if(effectPreventer_2.current==true){
            effectPreventer_2.current = false
            return
        }

        if(refActiveTags.current){
            setTopicState((self)=>{
                const newSelf = toggleDisplayViaKeyAndId(self, 2 , 'tags', refActiveTags.current.map(x=>x.id), Raw_tags.current.data)
                if(arraysEqual(self.data, newSelf.data)){// prevent same value
                    return {...self}
                }
                return {...newSelf}   
            })
        }
        if(rightContentRef.current.innerRefs.innerIncMenuRef.current?.innerStates){
            const [rightContentOptions, setRightContentOptions] = rightContentRef.current.innerRefs.innerIncMenuRef.current.innerStates._data
            setRightContentOptions(tagState.data)
        }
        
    }, [tagState]) //cascading effect: tagState -> topicState
    const saveMainStates = ()=>{
        console.log('main page saving', headRef)
        const [isSaving, setIsSaving] = headRef.current.innerStates._isSaving
        setIsSaving(true)//mimic http
        storeMainContent(
            firebase,
            TARGET_COLLECTION, 
            categoryState,
            tagState,
            topicState
        ).then(()=>{
            setTobeSaved(false)
            setIsSaving(false)//mimic http
        })
    }

    //useMemo(() => toBeSaved, [toBeSaved]);
    useEffect(()=>{
        if(toBeSaved){
            setTimeout(()=>{
                if(toBeSaved){//what's the closure here
                    saveMainStates()
                }
            }, 2000)
        }
    }, [toBeSaved])
    
    return (
        <Styled ref={rawRef}>            
            <BaseContentSpacing>
                <div className='p-select-wrapper'>
                    <div className='p-select-wrapper-i1'>
                        <CSelect defaultValue={defaultSelect} onChange={select} key={defaultSelect} >
                            {
                                categoryState.data.map((category)=>{
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
                        <FilterTagWrapper key={tagState.id} data={tagState.data} tagClickFactory={tagClickFactory} tagEditBlurFactory={tagEditBlurFactory}></FilterTagWrapper>
                    </div>
                    
                </div> 
                <div className='p-content-wrapper-outter'>
                    <div className='p-content-wrapper'>
                        <div className='p-content-wrapper-controlwrapper'>
                            {
                                isEditing?
                                <div className='p-content-wrapper-controlwrapper-i' onClick={clickAddTopic}>
                                    <svg style={{'---svg-fill':'grey', 'width': '1.2em', 'height': '1.2em'}}>
                                        <use href="#svg-add-item"/>
                                    </svg>
                                </div>
                                :
                                ""
                            }
                            
                        </div>
                        <SubjectCardWrapper data={topicState.data} tags={tagState.data}></SubjectCardWrapper>
                    </div>
                </div>
            </BaseContentSpacing>
            <MainPageFooter></MainPageFooter>
        </Styled>
    )
})
export const DefaultStyle = Styled
