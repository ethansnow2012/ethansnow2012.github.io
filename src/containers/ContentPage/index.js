
import React, {useEffect, useContext,  useState, useImperativeHandle, forwardRef, useRef, useCallback} from 'react'
import { storeMainContent, getOneFakeTopic } from 'service/data'
import styled from 'styled-components'
import { globalContext } from 'App'
import { SplitContext } from 'hoc/factory/RootPageHoc'
import { ShiningButton } from 'components'

// Import the Slate editor factory.
import { createEditor, Transforms } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
const StyledInnerIncMenu = styled.div`
    display: none;
`
const Styled = styled.div`
    /* This page is contrasting the main page. */
    padding-top: var(--maincontent-vpadding);
    padding-bottom: var(--maincontent-vpadding);
    color: #404040;
    & .inner{
        max-width: var(--maincontent-maxwidth);
        margin:auto;
        min-height: 100vh;
        position: relative;
    }
    & .inner > * + *{
        margin-top: var(--maincontent-innerspacing);
    }
    & .inner-inc{
        position: absolute;
        top:5px;
        right:5px;
    }
    & .inner-inc-btn{
        z-index: 1;
        position: relative;
    }
    & .inner-inc-btn-icon{
        display: flex;
        justify-content: end;
        cursor: pointer;
    }
    .inner-inc-menu-i-label{
        padding-left:20px;
        margin-bottom: 4px;
    }
    .inner-inc-menu-i-label > span{
        text-decoration: underline;
        text-underline-offset: 3px;
    }
    & .inner-inc-menu-i-label +  .inner-inc-menu-i-label{
        margin-top: 10px;
    }
    & .inner-inc-menu-i-optionwrapper{
        margin-top: 5px;
    }
    & .inner-inc-menu-i-optionwrapper-i{
        cursor: pointer;
        display:flex;
        font:0.9em;
    }
    & .inner-inc-menu-i-optionwrapper-i-check{
        width: 20px;
    }
    & .inner-inc-menu-i-optionwrapper-i:not(.active){
        color: #afafaf;
    }
    & .inner-inc-btn:hover ${StyledInnerIncMenu}{
        display: flex;
        background: #ffffffe0;
        padding: 6px 7px 6px 5px;
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
        min-width: 22px;
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
    & .topicContent *[role='textbox'] > *[data-slate-node="element"]{
        border-left: 2px solid #7fffd4a8
    }
    & .topicContent *[role='textbox'] pre + pre{
        margin-top:0px;
    }
    & .topicContent .incinfo{
        position: absolute;
        top: -54px;
        right: 0;
        font-size: 0.5em;
    }
    & .editToolbar{
        background:white;
    }
    & .p-slate-code{
        background: #ffffff4a;
    }
    &.isEditable .topichead-title{
        border-bottom: 1px solid #80808075;
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

let TARGET_COLLECTION =  process.env.REACT_APP_TARGET_COLLECTION


//inner-inc-menu
const InnerIncMenu = forwardRef((props, ref)=>{
    const [data, setData] = useState([])
    useImperativeHandle(ref, ()=>
        ({
            innerStates:{
                _data: [data, setData],
            },
        })
    )
    
    const click = (ev)=>{
        let id = ev.currentTarget.dataset.id
        props.setTopicContent((self)=>{
            let tags = self.tags
            let index = tags.indexOf(id)
            if(index==-1){
                tags.push(id)
            }else{
                tags.splice(index, 1);
            }
            self.tags = tags
            return {...self}
        })
    }
    const deleteClick = ()=>{
        window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
            top: -0.1,
            left: 0,
        })
        props.leftContentRef.current.rawRef.current.scrollIntoView({behavior:"smooth"})
        
        setTimeout(()=>{
            props.setTopicContent((self)=>{
                return {...self, to_be_deleted:true}
            })
        }, 1000)
    }
    return (
        <StyledInnerIncMenu className="inner-inc-menu">
            <div className="inner-inc-menu-i">
                <div className="inner-inc-menu-i-label">
                    <span>加入分類</span>
                    <div className="inner-inc-menu-i-optionwrapper">
                        {
                            data.map(x=>
                                <div className={"inner-inc-menu-i-optionwrapper-i"+((props.topicContent?.tags.indexOf(x.id)>=0)?' active':'')} data-id={x.id} onClick={click}>
                                    <div className='inner-inc-menu-i-optionwrapper-i-check' >
                                        { (props.topicContent?.tags.indexOf(x.id)>=0)?'✓':'‎ ' }
                                    </div>
                                    { x.name }
                                </div>                                                
                            )
                        }
                    </div>
                </div>
                <div className="inner-inc-menu-i-label">
                    <span>其他</span>
                    <div className="inner-inc-menu-i-optionwrapper">
                        <div className="inner-inc-menu-i-optionwrapper-i active">
                            <ShiningButton shiningColor={'hsl(0deg 50% 75% / 50%)'} onClick={deleteClick}>刪除</ShiningButton>
                        </div>    
                    </div>
                </div>
                
            </div>
        </StyledInnerIncMenu>
    )
})

export const ContentPage = forwardRef(function(props, ref) {
    const {firebase} = useContext(globalContext)
    const {headRef, leftContentRef} = useContext(SplitContext)
    const [topicContent, setTopicContent] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    //const [toBeSaved, setTobeSaved] = useState(false)
    const rawRef = useRef()
    const innerIncMenuRef = useRef()

    const [editorTitle] = useState(() => withReact(createEditor()))
    const [editorData_title, setEditorData_title] = useState(editorDataEmpty)

    const [editorDescription] = useState(() => withReact(createEditor()))
    const [editorData_description, setEditorData_description] = useState(editorDataEmpty)

    const [editorContent] = useState(() => withReact(createEditor()))
    const [editorData_content, setEditorData_content] = useState(editorDataEmpty)

    useImperativeHandle(ref, ()=>
        ({
            simpleConsole: ()=>{ console.log('simpleConsole') },
            innerStates:{
                _topicContent: [topicContent, setTopicContent],
                _isLoggedIn: [isLoggedIn, setIsLoggedIn],
                _isEditing: [isEditing, setIsEditing]
            },
            innerRefs:{
                innerIncMenuRef
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
        console.log('topicContent effect')
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
        if(leftContentRef.current&&topicContent){
            const [_topicState, _setTopicState] = leftContentRef.current.innerStates._topicState
            _setTopicState((self)=>{
                const id = topicContent.id
                const dueTopic = self.data.filter(x=>x.id==id)[0]
                const dueTopicStringRepresent = JSON.stringify(dueTopic)
                const selfTopicStringRepresent= JSON.stringify(topicContent)

                if(dueTopicStringRepresent == selfTopicStringRepresent){
                    return self//nop
                }else{
                    const replaceIndex = self.data.findIndex(x=>x.id==id)
                    if(topicContent.to_be_deleted){
                        self.data.splice(replaceIndex, 1)
                        return {...self}
                    }
                    
                    self.data[replaceIndex] = JSON.parse(JSON.stringify(topicContent))
                    return {...self}
                }
            })
            const [toBeSaved, setTobeSaved] = leftContentRef.current.innerStates._toBeSaved
            setTobeSaved(true)
        }
    },[topicContent])

    // useEffect(()=>{
    //     console.log('isEditing')
    // },[isEditing])

    const updateRootDataByKeyFactoty = useCallback((state, setState, targetKey, value, contentId)=>{
        let updated = false
        return ()=>{
            setState((self)=>{
                if(state[targetKey]){
                    if(JSON.stringify(state[targetKey])!= JSON.stringify(value)){
                        state[targetKey] = value
                        updated = true
                    }
                }
    
                if(updated){
                    return {...self}
                }
                return self//nop
            })
            let actuallyUpdated = updated
            return actuallyUpdated
        }
    }, [])
    

    const slateOnChange = useCallback((targetKey)=>{
        const  leftInnerStatesKey = '_topicState'
        return (value)=>{
            // setTopicContent((self)=>{
            //     return self
            // })
            const updateRootDataByKey = updateRootDataByKeyFactoty(topicContent, setTopicContent, targetKey, value, topicContent.id)
            updateRootDataByKey()
            console.log('updateRootDataByKey')
            //update the origin data instead to be reactive
        }
    }, [topicContent]) 
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
        // get the select block
        let selected
        let selection = editorContent.selection
        if (selection !== null && selection.anchor !== null) {
            selected = editorContent.children[selection.anchor.path[0]];
        } else {
            selected = null;
        }
        //end: get the select block
        switch (event.key) {
            case '`':
                if(event.ctrlKey){
                    event.preventDefault()
                    Transforms.insertNodes(
                        editorContent,
                        { type: 'code', children: [{ text: `xxxx` }] },
                        { at: [editorContent.children.length] }
                    )
                }
                event.key = 0
                break;
            case 'Enter':
                if(event.ctrlKey){
                    event.preventDefault()
                    const targetIndex = editorContent.children.indexOf(selected) + 1
                    Transforms.insertNodes(
                        editorContent,
                        { type: 'paragraph', children: [{ text: ' ' }] },
                        { at: [targetIndex] }//editorContent.children.length
                    )
                }else if(event.shiftKey){
                    event.preventDefault()
                    editorContent.insertText("\n")
                }
            default:
                break;
        }
    }

    return (
        <Styled ref={rawRef} onKeyDown={handleKeyDown} className={(isEditing?' isEditable':'')}>
                <div className="inner">
                    {
                        isEditing?
                        <div className="inner-inc">
                            <div className="inner-inc-btn">
                                <div className="inner-inc-btn-icon">...</div>
                                
                                <InnerIncMenu ref={innerIncMenuRef} leftContentRef={leftContentRef} topicContent={topicContent} setTopicContent={setTopicContent}></InnerIncMenu>
                            </div>
                        </div>
                        :""
                    }
                    <div className="topichead">
                        <div className="topichead-title">
                            <Slate editor={editorTitle} value={editorData_title} onChange={slateOnChange('topic')}>
                                <Editable readOnly={!isEditing} />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicDescription">
                        <div className="topicDescription-inner">
                            <Slate editor={editorDescription}  value={editorData_description} onChange={slateOnChange('description')}>
                                <Editable readOnly={!isEditing} />
                            </Slate>
                        </div>
                    </div>
                    <div className="topicContent">
                        {
                            (
                                isLoggedIn?
                                <div className="incinfo">
                                    Command:  <span style={{fontWeight:'bolder'}}>ctrl + `</span>  to insert a code block<br/>
                                    Command:  <span style={{fontWeight:'bolder'}}>ctrl + Enter</span>  now block below<br/>
                                    Command:  <span style={{fontWeight:'bolder'}}>shift + Enter</span>  change line
                                    
                                </div>
                                :
                                ""
                            )
                        }
                        <Slate editor={editorContent}  value={editorData_content} onChange={slateOnChange('content')}>
                            <div className="editToolbar" style={{display: 'none'}}>aaaa(Transforms)</div>{/*hide this for; wait for construction*/}
                            
                            <Editable 
                                readOnly={!isEditing}
                                renderElement={renderElement}
                                onKeyDown={editorContentOnKeyDown}
                            />
                        </Slate>
                    </div>
                </div>
            
        </Styled>
    )
})