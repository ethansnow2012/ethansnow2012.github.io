import React, {useState, useRef, createContext, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { HeaderWithContext, HeaderWithContextWithForwardRef, FilterTagWrapper, SubjectCardWrapper } from 'components'
import { BaseContentSpacing, BaseContentSpacingStyle, HSpliter, HSpliterLine } from 'containers/Functional'
import { MainPage, DefaultStyle as MainPageDefaultStyle } from 'containers/MainPage'

import {RouterMeta} from 'components/RouterMeta'



const Styled = styled.div`
    & .splitwrapper{
        display: flex;
        max-width: 100vw;
        overflow-x: hidden;
    }
    & .splitwrapper-i .spliter-inner{
        opacity: 0;
    }
    & .splitwrapper-i[data-location='active'] .spliter-inner{
        opacity: 1;
    }
    & .splitwrapper > div{
        background-color: var(--color-basic-background);
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
        const headRef = useRef(null)
        

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
                <SplitContext.Provider value={{toRightContent, toLeftContent, leftContentRef, headRef, rightContentRef, currentSplitLoc}}>{/* pseudo type define: SplitContextValue */}
                    <HeaderWithContextWithForwardRef ref={headRef}></HeaderWithContextWithForwardRef>
                    <div className="splitwrapper">
                        <div className="splitwrapper-i" data-location={currentSplitLoc=='left'?'active':''} >
                            <HSpliter >
                                {/* pairContentRef={rightContentRef}  */}
                                <LeftContent ref={leftContentRef} pageOptions={pageOptions} selfPosition={'left'}/>
                            </HSpliter>
                        </div>
                        <HSpliterLine ></HSpliterLine>
                        <div className="splitwrapper-i" data-location={currentSplitLoc=='left'?'':'active'}>
                            <HSpliter shrink={60}>
                                {/* pairContentRef={leftContentRef}  */}
                                <RightContent ref={rightContentRef} pageOptions={pageOptions} selfPosition={'right'}/>
                            </HSpliter>
                        </div>
                    </div>
                </SplitContext.Provider>
            </Styled>
        )
    }
    
    return Component
}

export function SingleRootPageHoc(Page){
    const Component = () => {
        const [currentSplitLoc, setCurrentSplitLoc] = useState('left')//
        const leftContentRef = useRef(null)
        const rightContentRef = useRef(null)
        const headRef = useRef(null)
        return (
            <Styled>
                <RouterMeta/>
                <SplitContext.Provider value={{ leftContentRef, headRef, rightContentRef, currentSplitLoc}}>{/* pseudo type define: SplitContextValue */}
                    <HeaderWithContextWithForwardRef ref={headRef}></HeaderWithContextWithForwardRef>
                    <Page></Page>
                </SplitContext.Provider>
            </Styled>
        )
    }
    
    return Component
}