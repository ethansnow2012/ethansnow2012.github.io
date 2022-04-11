
import React, { useContext, useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { globalContext } from 'App'
import { firebaseEndpoints } from 'service/firebaseEndpoints'
import { WithContextFactory }from 'hoc/factory/WithContext'
import { SplitContext } from 'hoc/factory/RootPageHoc'

const StyledFloating = styled.div`
    z-index: 90000;
    position: fixed;
    right:0;
    top:0;
    mix-blend-mode: exclusion;
    .control{
        color: white;
    }
    .control .btn{
        display:flex;
        width: max-content;
        padding: 5px 8px;
        cursor: pointer;
    }
    .control .btn-spinner{
        opacity:0;
        width: max-content;
        height: max-content;
        margin-right:3px;
        animation: lds-dual-ring 1.2s linear infinite;
        transition: opacity 1s ease;
    }

    .control .btn-spinner.active{
        opacity:1;  
    }
    
    @keyframes lds-dual-ring {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
`


const Styled = styled.div`
    position: relative;
    padding-top:15vmin;
    padding-bottom:15vmin;
    color: white;
    background-color: var(--color-blue-visual-weight);
    justify-content: center;
    display: flex;
`


export function HeaderFloating({fromParentArgs, portalTarget}) {
    const {isLoggedIn, isSaving, signOut, logIn, save, currentSplitLoc} = fromParentArgs
    return ReactDom.createPortal(
        <StyledFloating>
            <div className='control'> 
                {
                    isLoggedIn?
                    <div className='btn' onClick={signOut}>SignOut</div>
                    :
                    <div className='btn' onClick={logIn}>LogIn</div>
                }
                {
                    (isLoggedIn&&currentSplitLoc=='right')?
                    <div className='btn' onClick={save} >
                        <span className={('btn-spinner') + (isSaving?' active':'')} style={{'position':'relative', 'top':'0.2em'}}>
                            <svg style={{'---svg-fill':'grey', 'width': '0.8em', 'height': '0.8em'}}>
                                <use href="#svg-loading"/>
                            </svg>
                        </span>
                        <span>
                            Save
                        </span>
                    </div>
                    :''
                }
                
            </div>
        </StyledFloating>,
        document.querySelector(portalTarget||"#root-fix-header")
    )
}

export function Header(props) {
    const { currentSplitLoc}  = useContext(SplitContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const {firebase} = useContext(globalContext)
    const logIn = ()=>{
        firebase.firebaseGSignin().then(()=>{
            setIsLoggedIn(true)
        })
    }
    const signOut = ()=>{
        //firebase.firebaseGSignout()
        setIsLoggedIn(false)
    }
    const save = ()=>{
        console.log('props save', props)
        const {_categoryState, _tagState, _topicState} = props.leftContentRef.current.innerStates
        const [categoryState, setCategoryState] = _categoryState
        const [tagState, setTagState] = _tagState
        const [topicState, setTopicState] = _topicState
        setIsSaving(true)
        firebaseEndpoints.authed.setStore(
            firebase, 
            'test_random',
            {
                categories:categoryState,
                tags:tagState,
                topics:topicState,
            }
        ).then(()=>{
            setIsSaving(false)
        })

    }
    useEffect(()=>{
        firebase.self.auth().onAuthStateChanged(function(user) {
            if (user) {
                setIsLoggedIn(true)
                // await firestore
                //     .collection(memberSchema.form.collectionStr)
                //     .doc(firebase.auth().currentUser.uid)
                //     .update(dataFirestore)
            } else {
                setIsLoggedIn(false)
            }
          });
    }, [])

    useEffect(()=>{
        if(isLoggedIn){
            console.log('firebaseEndpoints', props.leftContentRef)
            // firebaseEndpoints.authed.setStore(
            //     firebase, 
            //     'test_random',
            //     {}
            // )
        }    
    }, [isLoggedIn])
    const fromParentArgs = {isLoggedIn, isSaving, signOut, logIn, save, currentSplitLoc}
    return (
        <Styled>
            xxxxxdddddxxxxx
            <HeaderFloating fromParentArgs={fromParentArgs}></HeaderFloating>
        </Styled>
    )
}




// component mutate:
export const HeaderWithContext = WithContextFactory(Header)