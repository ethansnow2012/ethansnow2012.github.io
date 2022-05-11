
import React, {useEffect, useContext, useState, useImperativeHandle, forwardRef, useRef, useCallback} from 'react'
import { storeMainContent, getOneFakeTopic } from 'service/data'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { globalContext } from 'App'
import { SplitContext } from 'hoc/factory/RootPageHoc'
import { ShiningButton } from 'components'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { AiFillDelete } from 'react-icons/ai';
import { BsFillImageFill } from 'react-icons/bs';

import toast from 'react-hot-toast';

// Import the Slate editor factory.
import { createEditor, Transforms } from 'slate'
// Import the Slate components and React plugin.
import {
    Slate,
    Editable,
    useSlateStatic,
    useSelected,
    useFocused,
    withReact,
    ReactEditor,
  } from 'slate-react'
   
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
        background: #e9e9e9;
    }
    & .topicDescription .topicDescription-inner{
        padding: 10px 12px;
        box-shadow: 2px 3px 5px 2px #888;
    }
    & .topicContent{
        position: relative;
        background:#e9e9e9;
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
    
    & .topicContent .editToolbar{
        background:white;
        margin-left: calc(var(--blockpadding) * -2);
        margin-right: calc(var(--blockpadding) * -2);
        margin-top: calc(var(--blockpadding) * -1);
        padding: calc(var(--blockpadding) * 2);
    }
    & .topicContent .editToolbar > *{
        font-size: 1.3em;
        width: max-content;
        cursor:pointer;
    }
    & .p-slate-code{
        background: white;
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
    const {toLeftContent} = useContext(SplitContext)
    const goBack = ()=>{
        if(typeof toLeftContent=='function'){
            toLeftContent()
            window.history.replaceState(null,'', '/')
        }
    }
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
        // window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
        //     top: -0.1,
        //     left: 0,
        // })
        //props.leftContentRef.current.rawRef.current.scrollIntoView({behavior:"smooth"})
        goBack()
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
                    {
                        props.topicContent?.tags?
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
                        :
                        ''

                    }
                    
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
    let { author } = useParams();
    if(!author){// sorry for this: hosting spa on github page afterall
        const hiddenAuthor = (new URL(window.location)).searchParams.toString().replace('gh-pages-alter%2F', '').replace('=','')
        if(hiddenAuthor){
            author = hiddenAuthor
        }
    }

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

    const [editorContent] = useState(() => 
        withMyCustomizedPlugin(
            withImages(withReact(createEditor()))
        )
    )
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
          case 'image':
            return <Image {...props} />
          default:
            return <DefaultElement {...props} />
        }
    }, [])
    const renderElementLoggedIn = useCallback(props => {
        switch (props.element.type) {
          case 'code':
            return <CodeElement {...props} />
          case 'image':
            return <Image {...props} isLoggedIn={true}/>
          default:
            return <DefaultElement {...props} />
        }
    }, [])

    useEffect(()=>{
        leftContentRef.current.innerRefs.authorRef.current=author

        const isLandDirectly = (props.selfPosition==props.pageOptions.priority)
        if(isLandDirectly){
            gotoCurrentLocation()
        }
        const _getOneTopic = async ()=>{
            let dueTopic = null
            if(isLandDirectly){
                const topicId = (new URL(window.location)).pathname.split('/')[3]
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
                    // chaining effect
                    const [toBeSaved, setTobeSaved] = leftContentRef.current.innerStates._toBeSaved
                    setTobeSaved(true)

                    const replaceIndex = self.data.findIndex(x=>x.id==id)
                    if(topicContent.to_be_deleted){
                        self.data.splice(replaceIndex, 1)
                        return {...self}
                    }
                    
                    self.data[replaceIndex] = JSON.parse(JSON.stringify(topicContent))
                    return {...self}
                }
            })  
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
                    
                    <div className="inner-inc" style={{display: isEditing?'':'none'}}>
                        <div className="inner-inc-btn">
                            <div className="inner-inc-btn-icon">...</div>
                            
                            <InnerIncMenu ref={innerIncMenuRef} leftContentRef={leftContentRef} topicContent={topicContent} setTopicContent={setTopicContent}></InnerIncMenu>
                        </div>
                    </div>
                        
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
                            {
                                (
                                    isLoggedIn?
                                    <div className="editToolbar">
                                    <Toolbar>
                                        <ToolbarAddImageButton></ToolbarAddImageButton>
                                    </Toolbar>
                                    </div>:
                                    ""
                                )
                                
                            }
                            
                            <Editable 
                                readOnly={!isEditing}
                                renderElement={isLoggedIn?renderElementLoggedIn:renderElement}
                                onKeyDown={editorContentOnKeyDown}
                            />
                        </Slate>
                    </div>
                </div>
            
        </Styled>
    )
})

//==
const withMyCustomizedPlugin = (editor) => {
    console.log('withMyPlugin')
    const { apply } = editor
    
    editor.apply = (op) => {
        console.log('apply:', op)
        
        // behavior define: prevent code block to change line
        if(op.type=='split_node' && op.properties?.type== "code"){
            const lastOp = editor.operations[editor.operations.length-1]
            Transforms.insertText(editor, `\n`, {
                at: { path: lastOp.path, offset: lastOp.position??0},
              })
        }
        else{
            apply(op)
        }
    }
    return editor
}

const withImages = (editor) => {
    const { insertData, isVoid } = editor
  
    editor.isVoid = element => {
      console.log('isVoid')
      return element.type === 'image' ? true : isVoid(element)
    }
  
    editor.insertData = data => {
      console.log('insertData')
      const text = data.getData('text/plain')
      const { files } = data
  
      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader()
          const [mime] = file.type.split('/')
  
          if (mime === 'image') {
            reader.addEventListener('load', () => {
              const url = reader.result
              insertImage(editor, url)
            })
  
            reader.readAsDataURL(file)
          }
        }
      } else if (isImageUrl(text)) {
            const doSomething = ()=>{
                return new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        resolve()
                        insertImage(editor, text)
                    }, 3000)
                })
            }
            toast.promise(doSomething(), {
                loading: 'Uploading Image.',
                success: 'Image upLoaded.',
                error: 'Error when fetching',
            })
      } else {
        insertData(data)
      }
    }
  
    return editor
}

const insertImage = (editor, url, firebasePath='') => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] , firebasePath: firebasePath}
    Transforms.insertNodes(editor, image)
}
const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}
const StyledImage = styled.div`
    position: relative;
`
const Image = ({ attributes, children, element, isLoggedIn }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
    const {firebase} = useContext(globalContext)
  
    const selected = useSelected()
    const focused = useFocused()

    const click = ()=>{
        const firebasePath = element.firebasePath
        if(firebasePath){
            const storageRef = firebase.self.storage().ref(firebasePath);
            storageRef.delete().then(()=>{
                console.log('deleted')
                Transforms.removeNodes(editor, { at: path })
            })
        }else{
            Transforms.removeNodes(editor, { at: path })
        }
        
    }
    return (
      <StyledImage {...attributes}>
        {children}
        <div contentEditable={false}>
          <img src={element.url}/>
          {
            (
                (element.firebasePath&&isLoggedIn)?
                <ImageRemove
                    onClick={click}
                >
                    <AiFillDelete/>
                </ImageRemove>:
                ""
            )
          }
          
        </div>
      </StyledImage>
    )
}

const StyledImageRemove = styled.div`
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    position: absolute;
    cursor:pointer;
    padding: 5px;
    box-sizing: content-box;
    transition: background-color 0.8s ease;
    background-color:transparent;
    border-radius:50%;
    &:hover{
        transition: background-color 0.1s ease;
        background-color: white;
    }
    & > svg{
        width: 100%;
        height: 100%;
    }
`
const StyledToolbar = styled.div`

`
const StyledToolbarAddImageButton = styled.div`

`
export const ImageRemove = React.forwardRef(
    (
      {
        className,
        ...props
      },
      ref
    ) => (
        <StyledImageRemove
        {...props}
        ref={ref}   
        >
        </StyledImageRemove>
    )
)
export const Icon = React.forwardRef(
    (
      { className, ...props },
      ref
    ) => (
      <span
        {...props}
        ref={ref}
      />
    )
)

export const Toolbar = React.forwardRef(
    (
      { className, children },
      ref
    ) => (
      <StyledToolbar
        ref={ref}
        >
            {children}
      </StyledToolbar>
    )
)

export const ToolbarAddImageButton = React.forwardRef(
    (
        { className, ...props }
    ) => {
            const editor = useSlateStatic()
            const {firebase} = useContext(globalContext)
            const ref = useRef(null)
            const upload = (e)=>{
                var file = e.target.files[0];
                var uid = firebase.self.auth().getUid()
                var path = `uploadsV2/${TARGET_COLLECTION}/`
                        +uid
                        +'/'+(new Date()).toISOString().slice(0,22)
                        +"_"+file.name
                var storageRef = firebase.self.storage().ref(path);
                var task = storageRef.put(file)
                var uploadUiFlow = ()=>{
                    return new Promise((resolve, reject)=>{
                        task.then((e)=>{
                            return firebase.self.storage().ref(path).getDownloadURL()
                        }).then((rtnPath)=>{
                            insertImage(editor, rtnPath, path)
                            resolve()
                        })
                    })
                }
                toast.promise(uploadUiFlow(), {
                    loading: 'Uploading Image.',
                    success: 'Image upLoaded.',
                    error: 'Error when fetching',
                })
            }
            return(
            <StyledToolbarAddImageButton
                {...props}
                ref={ref}
            >
                <input type="file" style={{display: 'none'}} onChange={upload}></input>
                <BsFillImageFill onClick={()=>{
                    console.log('BsFillImageFill', ref)
                    ref.current.querySelector('input').click()
                    // window.showSaveFilePicker();
                    // const saveFile = async ()=>{
                    //     const fileHandle = await window.showSaveFilePicker();
                    //     const fileStream = await fileHandle.createWritable();
                    //     await fileStream.write(new Blob(["CONTENT"], {type: "image/jpeg"}));
                    //     await fileStream.close();
                    // }
                    // saveFile()
                }}/>
            </StyledToolbarAddImageButton>
        )
    }
)