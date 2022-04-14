
import React, {useEffect, useContext,  useState, useImperativeHandle, forwardRef, useRef, useCallback} from 'react'
import { getOneFakeTopic } from 'service/data'
import styled from 'styled-components'
import { globalContext } from 'App'
import { SplitContext } from 'hoc/factory/RootPageHoc'

// Import the Slate editor factory.
import { createEditor, Transforms } from 'slate'
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
        position: relative;
        background:#cbcbcb;
        padding:var(--blockpadding) calc(var(--blockpadding) * 2);
        margin-top: calc(var(--maincontent-innerspacing) * 1.8);
        min-height: 40vmin;
    }
    & .topicContent *[role='textbox'] * + *{
        margin-top:5px;
    }
    & .topicContent .incinfo{
        position: absolute;
        top: -20px;
        right: 0;
        font-size: 0.5em;
    }
    & .editToolbar{
        background:white;
    }
    & .p-slate-code{
        background: #ffffff4a;
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
    const {firebase} = useContext(globalContext)
    const {leftContentRef} = useContext(SplitContext)
    const [topicContent, setTopicContent] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const rawRef = useRef()

    const [editorTitle] = useState(() => withReact(createEditor()))
    const [editorData_title, setEditorData_title] = useState(editorDataEmpty)

    const [editorDescription] = useState(() => withReact(createEditor()))
    const [editorData_description, setEditorData_description] = useState(editorDataEmpty)

    const [editorContent] = useState(() => withReact(createEditor()))
    const [editorData_content, setEditorData_content] = useState(editorDataEmpty)

    useImperativeHandle(ref, ()=>
        ({
            simpleConsole: ()=>{ console.log('simpleConsole', ref) },
            //contentPageState: [topicContent, setTopicContent],
            innerStates:{
                _topicContent: [topicContent, setTopicContent],
                _isLoggedIn: [isLoggedIn, setIsLoggedIn]
            },
            rawRef
        })
    )
    const gotoCurrentLocation = useCallback(()=>{
        ref.current.rawRef.current.scrollIntoView()
    },[])

    const CodeElement = props => {
        return (
          <pre {...props.attributes} className="p-slate-code">
            <code>{props.children}</code>
          </pre>
        )
      }
      
    const DefaultElement = props => {
        return <p {...props.attributes}>{props.children}</p>
    }

    const renderElement = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          default:
            return <DefaultElement {...props} />
        }
      }, [])

    useEffect(()=>{
        const isLandDirectly = (props.selfPosition==props.pageOptions.priority)
        if(isLandDirectly){
            gotoCurrentLocation()
        }
        const _getOneTopic = async ()=>{
            let dueTopic = null
            if(isLandDirectly){
                const topicId = (new URL(window.location)).pathname.split('/')[2]
                dueTopic =  await getOneFakeTopic(topicId, firebase)
                setTopicContent(dueTopic)
            }else{
                // state update via other component here
            }
        }
        _getOneTopic()
    },[])

    useEffect(()=>{
        if(topicContent?.topic){
            editorTitle.children = topicContent.topic
            editorTitle.onChange();
        }
        if(topicContent?.description){
            editorDescription.children = topicContent.description
            editorDescription.onChange();
        }
        if(topicContent?.content){
            editorContent.children = topicContent.content
            editorContent.onChange();
        }
    },[topicContent])
    
    

    const slateOnChange = (targetKey)=>{
        const  leftInnerStatesKey = '_topicState'
        return (value)=>{
            // bad example: do not update self's state
            // setTopicContent((self)=>{
            //     if(JSON.stringify(value)==JSON.stringify(self[targetKey])){
            //         //nop
            //         return self
            //     }else{
            //         self[targetKey] = value
            //         return {...self}
            //     }
            // })
            
            //update the origin data instead to be reactive
            if(leftContentRef){
                const [state, setState] = leftContentRef.current.innerStates[leftInnerStatesKey]
                let updated = false
                setState((self)=>{
                    state.data.map((el)=>{
                        if(el.id==topicContent.id){
                            console.log('change')
                            el[targetKey] = value
                            updated = true
                        }
                        return el
                    })

                    if(updated){
                        return {...self}
                    }
                    return self//nop
                })
            }
            
            
        }
    } 
    const handleKeyDown = useCallback((event)=>{
        console.log('handleKeyDown')
        let preventDefault = false
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if((event.ctrlKey || event.metaKey) && charCode === 's') {
          //alert("CTRL+S Pressed");
          preventDefault = true
          console.log('saving', )//get the main page ref  || pairContentRef={leftContentRef} 
        }else if((event.ctrlKey || event.metaKey) && charCode === 'c') {
            //preventDefault = true
          //alert("CTRL+C Pressed");
        }else if((event.ctrlKey || event.metaKey) && charCode === 'v') {
            //preventDefault = true
          //alert("CTRL+V Pressed");
        }
        if(preventDefault){
            event.preventDefault();
        }
    }, [])

    const editorContentOnKeyDown = (event) => {
        console.log('editorContentOnKeyDown')
        
        if(event.key === '`' && event.ctrlKey){
            event.preventDefault()
            Transforms.insertNodes(
                editorContent,
                { type: 'code', children: [{ text: 'xxxx' }] },
                { at: [editorContent.children.length] }
            )
        }
      }

    return (
        <Styled ref={rawRef} onKeyDown={handleKeyDown}>
                <div className="inner">
                    <div className="topichead">
                        <div className="topichead-title">
                            <Slate editor={editorTitle} value={editorData_title} onChange={slateOnChange('topic')}>
                                <Editable />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicDescription">
                        <div className="topicDescription-inner">
                            <Slate editor={editorDescription} value={editorData_description} onChange={slateOnChange('description')}>
                                <Editable />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicContent">
                        {
                            (
                                isLoggedIn?
                                <div className="incinfo">Command:  <span style={{fontWeight:'bolder'}}>ctrl + `</span>  to insert a code block</div>
                                :
                                ""
                            )
                        }
                        <Slate editor={editorContent} value={editorData_content} onChange={slateOnChange('content')}>
                            <div className="editToolbar" style={{display: 'none'}}>aaaa(Transforms)</div>{/*hide this for; wait for construction*/}
                            
                            <Editable 
                                renderElement={renderElement}
                                onKeyDown={editorContentOnKeyDown}
                            />
                        </Slate>
                    </div>
                </div>
            
        </Styled>
    )
})