import React, {useState, useRef, createContext, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { HeaderWithContext, FilterTagWrapper, SubjectCardWrapper } from 'components'
import { BaseContentSpacing, BaseContentSpacingStyle, HSpliter, HSpliterLine } from 'containers/Functional'
import { MainPage, DefaultStyle as MainPageDefaultStyle } from 'containers/MainPage'

import {RouterMeta} from 'components/RouterMeta'



const Styled = styled.div`
    & .splitwrapper{
        display: flex;
        max-width: 100vw;
        overflow-x: hidden;
    }
`
export const SplitContext = createContext({});

export function RootPageHoc(LeftContent, RightContent, pageOptions){
    console.log('RootPageHoc')
    const Component = () => {
        const [splitPrecent, setSplitPrecent] = useState(10)// : 20 out of 100
        const initialized = useRef(false);
        
        const [currentSplitLoc, setCurrentSplitLoc] = useState(pageOptions.priority?pageOptions.priority:'left')//
        const leftContentRef = useRef(null)
        const rightContentRef = useRef(null)
        

        const toRightContent = useCallback(
            ()=>{
                // let scrollIntoView = rightContentRef.current.scrollIntoView
                //                     ??rightContentRef.current.rawRef.current.scrollIntoView
                let rawRef = rightContentRef.current.scrollIntoView?
                    rightContentRef
                    :
                    rightContentRef.current.rawRef
                setCurrentSplitLoc('right')
                window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
                    top: -0.1,
                    left: 0,
                })
                rawRef.current.scrollIntoView({behavior:"smooth"})
            }, 
        [])

        const toLeftContent = useCallback(
            ()=>{
                let rawRef = leftContentRef.current.scrollIntoView?
                    leftContentRef
                    :
                    leftContentRef.current.rawRef
        
                setCurrentSplitLoc('left')
                window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
                    top: -0.1,
                    left: 0,
                })
                rawRef.current.scrollIntoView({behavior:"smooth", inline: 'start', block: 'start' })    
            }, 
        [])
        
        useEffect(()=>{
            if(initialized.current){
                //rightContentRef.current.simpleConsole()
            }
            initialized.current = true
        },[currentSplitLoc])

        return (
            <Styled>
                <RouterMeta/>
                <SplitContext.Provider value={{toRightContent, toLeftContent, leftContentRef, rightContentRef, currentSplitLoc}}>{/* pseudo type define: SplitContextValue */}
                    <HeaderWithContext></HeaderWithContext>
                    {/* <div >AAA</div> */}
                    <div className="splitwrapper">
                        <HSpliter >
                            {/* pairContentRef={rightContentRef}  */}
                            <LeftContent ref={leftContentRef} pageOptions={pageOptions} selfPosition={'left'}/>
                        </HSpliter>
                        <HSpliterLine ></HSpliterLine>
                        <HSpliter shrink={60}>
                            {/* pairContentRef={leftContentRef}  */}
                            <RightContent ref={rightContentRef} pageOptions={pageOptions} selfPosition={'right'}/>
                        </HSpliter>
                    </div>
                </SplitContext.Provider>
            </Styled>
        )
    }
    
    return Component
}