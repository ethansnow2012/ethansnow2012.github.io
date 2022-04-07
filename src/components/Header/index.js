
import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { globalContext } from 'App'

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

export function Header() {
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
    useEffect(()=>{
        firebase.self.auth().onAuthStateChanged(function(user) {
            if (user) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
          });
    }, [])
    
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
            </div>
        </Styled>
    )
}