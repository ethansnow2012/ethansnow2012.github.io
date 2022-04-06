
import React, {useEffect, useState, forwardRef} from 'react'
import { getOneFakeTopic } from 'service/data'
import styled from 'styled-components'

const Styled = styled.div`
    /* This page is contrasting the main page. */
    padding-top: var(--maincontent-vpadding);
    padding-bottom: var(--maincontent-vpadding);
    color: #404040;
    & .inner{
        max-width: var(--maincontent-maxwidth);
        margin:auto;
        min-height: 100vh;
    }
    & .inner > * + *{
        margin-top: var(--maincontent-innerspacing);
    }
    & .topichead{
        font-size: 1.5em;
        marin-left: auto;
        marin-right: auto;
    }
    & .topichead .topichead-title{
        margin-left: auto;
        margin-right: auto;
        width: max-content;
    }
    & .topicDescription{
        max-width:400px;
        margin-left: auto;
        margin-right: auto;
    }
    & .topicDescription .topicDescription-inner{
        padding: 10px 12px;
        box-shadow: 2px 3px 5px 2px #888;
    }
    & .topicContent{
        margin-top: calc(var(--maincontent-innerspacing) * 1.8);
    }
`

export const ContentPage = forwardRef(function(props, ref) {
    const [topicContent, setTopicContent] = useState()

    useEffect(()=>{
        const _getOneFakeTopic = async ()=>{
            const fakeTopic =  await getOneFakeTopic()
            setTopicContent(fakeTopic)
        }
        _getOneFakeTopic()
    },[])

    return (
        <Styled ref={ref}>
            <div className="inner">
                <div className="topichead">
                    <div className="topichead-title">
                        {topicContent?.topic}
                    </div>
                </div>
                <div className="topicDescription">
                    <div className="topicDescription-inner">
                        {topicContent?.description}
                    </div>
                </div>
                <div className="topicContent">
                    {topicContent?.content}
                </div>
            </div>
        </Styled>
    )
})