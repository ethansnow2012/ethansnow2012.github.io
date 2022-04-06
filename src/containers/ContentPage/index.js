
import React, {useEffect, useState, forwardRef} from 'react'
import { getOneFakeTopic } from 'service/data'
import styled from 'styled-components'

// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

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
const editorDataEmpty = [
    {
        type: 'paragraph',
        children: [
            { text: '' },
        ],
    }
]


export const ContentPage = forwardRef(function(props, ref) {
    const [topicContent, setTopicContent] = useState()

    const [editorTitle] = useState(() => withReact(createEditor()))
    const [editorData_title, setEditorData_title] = useState(editorDataEmpty)

    const [editorDescription] = useState(() => withReact(createEditor()))
    const [editorData_description, setEditorData_description] = useState(editorDataEmpty)

    const [editorContent] = useState(() => withReact(createEditor()))
    const [editorData_content, setEditorData_content] = useState(editorDataEmpty)

    useEffect(()=>{
        const _getOneFakeTopic = async ()=>{
            const fakeTopic =  await getOneFakeTopic()
            setTopicContent(fakeTopic)
        }
        _getOneFakeTopic()
    },[])

    useEffect(()=>{
        if(topicContent?.topic){
            editorTitle.children =  [
                        {
                        type: 'paragraph',
                        children: [
                            { text: topicContent.topic },
                        ],
                    }
                ]
            editorTitle.onChange();
        }
        if(topicContent?.description){
            editorDescription.children =  [
                        {
                        type: 'paragraph',
                        children: [
                            { text: topicContent.description },
                        ],
                    }
                ]
            editorDescription.onChange();
        }
        if(topicContent?.content){
            editorContent.children =  [
                        {
                        type: 'paragraph',
                        children: [
                            { text: topicContent.content },
                        ],
                    }
                ]
            editorContent.onChange();
        }
    },[topicContent])
    
    

    const slateOnChange = (value)=>{
        console.log('slateOnChange')
    }

    return (
        <Styled ref={ref}>
            
                <div className="inner">
                    <div className="topichead">
                        <div className="topichead-title">
                            <Slate editor={editorTitle} value={editorData_title} onChange={slateOnChange}>
                                <Editable />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicDescription">
                        <div className="topicDescription-inner">
                            <Slate editor={editorDescription} value={editorData_description} onChange={slateOnChange}>
                                <Editable />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicContent">
                            <Slate editor={editorContent} value={editorData_content} onChange={slateOnChange}>
                                <Editable />
                            </Slate>
                    </div>
                </div>
            
        </Styled>
    )
})