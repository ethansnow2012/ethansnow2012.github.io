
import React, {useEffect, useState, forwardRef} from 'react'
import { getOneFakeTopic } from 'service/data'
import styled from 'styled-components'

const Styled = styled.div`
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
            <div>
                {topicContent?.topic}
            </div>
            <div>
                {topicContent?.description}
            </div>
            <div>
                {topicContent?.content}
            </div>
        </Styled>
    )
})