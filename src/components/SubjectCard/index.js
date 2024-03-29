
import React, {useCallback, useContext} from 'react'
import styled from 'styled-components'
import { WithContextFactory }from 'hoc/factory/WithContext'
import { useParams } from 'react-router-dom';

const Styled = styled.div`
    background: black;
    width: 210px;
    // height: 140px;
    margin: 5px auto;
    padding: 10px 15px;
    color: white;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top:10px;
    }
    & .topic{
        margin-bottom:7px;
        font-size:1.15em;
        cursor: pointer;
    }
    & .topic:hover{
        text-decoration: underline;
        text-underline-offset: 1px;
        text-decoration-thickness: 1px;
    }
    & .description{
        font-size:0.5em;
        flex: 1;
    }
    & .goto-content-wrapper{
        height: 10px;
        position: relative;
        top: -4px;
        left: 5px;
    }
    & .goto-content{
        cursor: pointer;
        margin-left: auto;
        width: max-content;
        transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        letter-spacing: 0px;
        left:0px;
        position:relative;
        font-size: 1.7em;
        line-height: 1;
        height: 20px;
        // padding: 3px 4px;
        padding: 6px 7px;
    }
    & .goto-content > *{
        transform: translateY(-13px);
    }
    & .goto-content:hover{
        // background: green;
        // padding: 6px 7px;
        background: #ffffff33;
        padding: 6px 7px;
        border-radius: 3px;
    }
    & .tag-wrapper{
        display:flex;
        flex-wrap: wrap;
    }

    & .tag-wrapper[length='0'], 
    & .tag-wrapper[length='1'],
    & .tag-wrapper[length='2'],
    & .tag-wrapper[length='3']{
        flex-wrap: initial;
    }

    & .tag-wrapper-i{
        height: 20px;
        width: 27%;
        transition: all 1s ease;
        font-size: 0.7em;
        overflow:hidden;
        padding-left:5px;
        cursor:pointer;
    }
    
    & .tag-wrapper-i:hover{
        width: 100%;
    }
    & .tag-wrapper[length='1'] .tag-wrapper-i:hover{
        width: 100%;
        max-width: max-content;
        padding-right: 20px;
    }
`

export function SubjectCard({children, data, tags, toRightContent, rightContentRef, leftContentRef}){
    //console.log('SubjectCard', tags)
    //let { id } = useParams(); //this do not update dynamically
    const filteredTags = tags.filter( x => data.tags.indexOf(x.id)>=0 )
    const filteredTagsLength = filteredTags.length

    const tagClick = useCallback((ev)=>{
        console.log('tagClick', ev)
        
        let tagId = ev.currentTarget.dataset.keyid
        var url = new URL(window.location.href);
        var theParam = url.searchParams.get('tag')
        if(theParam){
            url.searchParams.set('tag', tagId)
        }else{
            url.searchParams.append('tag', tagId);
        }

        window.location.href = url.toString()
    }, [])

    const gotoContent = useCallback(()=>{
        console.log('gotoContent')
        const author = leftContentRef.current.innerRefs.authorRef.current
        const body = document.querySelector('body')
        if (body.classList.contains('p-size-xs')||body.classList.contains('p-size-md')){
            window.location.href = `/content/${author}/${data.id}`
        }
        else if(typeof toRightContent=='function'){
            toRightContent()
            window.history.replaceState(null,'', `/content/${author}/${data.id}`)
            
            const [contentPageState, setContentPageState] = rightContentRef.current.innerStates._topicContent
            const [topicState, setTopicState] = leftContentRef.current.innerStates._topicState
            setContentPageState((self)=>{
                const topicId = (new URL(window.location)).pathname.split('/')[3]
                const dueTopic = topicState.data.filter(x=>x.id==topicId)[0]
                return {...dueTopic}
            })
        }
    }, [])
    const parstSlateDataToString = (data)=>{
        return data.filter(x=>x.type=='paragraph').map(x=>x.children.map(y=>y.text).join('')).join('')
    }
    return (
        <Styled>
            <div className='topic' onClick={gotoContent}>
                {parstSlateDataToString(data.topic)}
            </div>
            <div className='description'>
                {parstSlateDataToString(data.description)}
            </div>
            <div className='goto-content-wrapper'>
                <div className='goto-content' onClick={gotoContent}>
                    <div>⇒</div>
                </div>
            </div>
            <div className='tag-wrapper' length={filteredTagsLength}>
                {
                    filteredTags?.map((tag)=>{
                        return (
                            <div className='tag-wrapper-i' data-keyid={tag.id} key={tag.id} style={{background: tag.color}} onClick={tagClick}>
                                {
                                    tag.name
                                }
                            </div>
                        )
                    })
                }
            </div>
        </Styled>
    )
}

export const DefaultStyle = Styled

// component mutate:
// export const SubjectCardWithContext = function(props) { // 
//     const {toRightContent, leftContent, contentPageState, leftContentRef, rightContentRef} = useContext(SplitContext)
//     return (
//         <SubjectCard {...props} toRightContent={toRightContent} leftContentRef={leftContentRef} rightContentRef={rightContentRef}/>
//     )
// }
export const SubjectCardWithContext = WithContextFactory(SubjectCard)