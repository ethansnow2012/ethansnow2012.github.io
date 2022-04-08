
import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { globalContext } from 'App'
import { firebaseEndpoints } from 'service/firebaseEndpoints'
import { WithContextFactory }from 'hoc/factory/WithContext'

const Styled = styled.div`
    position: relative;
    padding-top:15vmin;
    padding-bottom:15vmin;
    color: white;
    background-color: var(--color-blue-visual-weight);
    justify-content: center;
    display: flex;
    .control{
        position: absolute;
        right:0;
        top:0;
    }
    .control .btn{
        padding: 5px 8px;
        cursor: pointer;
    }
`

export function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
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

        firebaseEndpoints.authed.setStore(
            firebase, 
            'test_random',
            {
                categories:categoryState,
                tags:tagState,
                topics:topicState,
            }
        )

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
    
    return (
        <Styled>
            xxxxxdddddxxxxx
            <div className='control'> 
                {
                    isLoggedIn?
                    <div className='btn' onClick={signOut}>SignOut</div>
                    :
                    <div className='btn' onClick={logIn}>LogIn</div>
                }
                <div className='btn' onClick={save}>Save</div>
            </div>
        </Styled>
    )
}

// component mutate:
export const HeaderWithContext = WithContextFactory(Header)