import React, {useContext} from 'react'
import styled from 'styled-components'
import { CSSTransition, } from 'react-transition-group'
import { SplitContext } from 'hoc/factory/RootPageHoc'

const Styled = styled.div`
    width: 3px;
    background: #60609e !important;
    flex-shrink: 0 !important;
    position: relative;
    .goback{
        position: absolute;
        top: 0;
        right: 100%;
        width: 57px;
        height: 57px;
        background: #ffffff30;
        font-size: 40px;
        color: white;
        display: flex;
        place-content: center;
        cursor: pointer;
    }
    .goback > *{
        line-height: 141%;
    }
    
`
const transitionTime = '0.5'

export function HSpliterLine({children}){
    const {toLeftContent, currentSplitLoc, leftContentRef, rightContentRef} = useContext(SplitContext)
    const clickGoBack = ()=>{
        console.log('clickGoBack', leftContentRef, rightContentRef)
        const body = document.querySelector('body')
        if (body.classList.contains('p-size-xs')||body.classList.contains('p-size-md')){
            const referrer = document.referrer
            if(referrer.match(/(\/\/localhost:300|\/\/ethansnow2012.github.io\/)/)){
                window.location.href = referrer
            }
            else{
                window.location.href = '/'
            }
        }
        else if(typeof toLeftContent=='function'){
            toLeftContent()
            window.history.replaceState(null,'', '/')
        }
    }
    console.log('HSpliterLine')
    return (
        <Styled>
            <CSSTransition 
                timeout={{
                    appear: 0,
                    enter: (+transitionTime)*1000,
                    exit: (+transitionTime)*1000,
                }}
                >
                {
                    currentSplitLoc=='right'?
                        <div onClick={clickGoBack} className="goback">
                            <div>←</div>
                        </div>
                        :
                        <div></div>
                }
                
            </CSSTransition>
        </Styled>
    )
}