
import React, {useCallback} from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    background: black;
    width: 200px;
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
        font-size:0.9em;
    }
    & .description{
        font-size:0.5em;
        flex: 1;
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
`

export function SubjectCard({children, data, tags}){
    console.log('SubjectCard', tags)
    const filteredTags = tags.filter( x => data.tags.indexOf(x.id)>=0 )
    const filteredTagsLength = filteredTags.length
    const tagClick = useCallback((ev)=>{
        console.log('tagClick', ev)
    }, [])
    return (
        <Styled>
            <div className='topic'>
                {data.topic}
            </div>
            <div className='description'>
                {data.description}
            </div>
            <div className='tag-wrapper' length={filteredTagsLength}>
                {
                    filteredTags?.map((tag)=>{
                        return (
                            <div className='tag-wrapper-i' key={tag.id} style={{background: tag.color}} onClick={tagClick}>
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