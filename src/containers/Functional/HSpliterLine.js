import React, {useContext} from 'react'
import styled from 'styled-components'
import { CSSTransition, } from 'react-transition-group'
import { SplitContext } from 'hoc/factory/RootPageHoc'

const Styled = styled.div`
    width: 3px;
    background: blue;
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
    const {toLeftContent, currentSplitLoc} = useContext(SplitContext)
    const clickGoBack = ()=>{
        if(typeof toLeftContent=='function'){
            toLeftContent()
            window.history.pushState(null,'', '/')
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