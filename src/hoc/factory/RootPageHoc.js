import React, {useState, useRef, createContext} from 'react'
import styled from 'styled-components'
import { Header, FilterTagWrapper, SubjectCardWrapper } from 'components'
import { BaseContentSpacing, BaseContentSpacingStyle, HSpliter, HSpliterLine } from 'containers/Functional'
import { MainPage, DefaultStyle as MainPageDefaultStyle } from 'containers/MainPage'


const Styled = styled.div`
    & .splitwrapper{
        display: flex;
        max-width: 100vw;
        overflow-x: hidden;
    }
`
export const SplitContext = createContext({});

export function RootPageHoc(LeftContent, RightContent){//
    const [splitPrecent, setSplitPrecent] = useState(20)// : 20 out of 100
    const [currentSplitLoc, setCurrentSplitLoc] = useState('left')
    const leftContentRef = useRef(null)
    const rightContentRef = useRef(null)
    

    const toRightContent = ()=>{
        setCurrentSplitLoc('right')
        window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
            top: -0.1,
            left: 0,
        })
        rightContentRef.current.scrollIntoView({behavior:"smooth"})
    }
    const toLeftContent = ()=>{
        setCurrentSplitLoc('left')
        window.scrollBy({ // fix: scrollIntoView interanl bug(not invole)
            top: -0.1,
            left: 0,
        })
        leftContentRef.current.scrollIntoView({behavior:"smooth", inline: 'start', block: 'start' })
        
    }
    return (
        <Styled>
            <Header></Header>
            <div >AAA</div>
            <SplitContext.Provider value={{toRightContent}}>
                <div className="splitwrapper">
                    <HSpliter weightPercent={splitPrecent}>
                        <LeftContent ref={leftContentRef} toRightContent={toRightContent}/>
                    </HSpliter>
                    <HSpliterLine currentSplitLoc={currentSplitLoc} toLeftContent={toLeftContent}></HSpliterLine>
                    <HSpliter styleArgs={{active: true}} weightPercent={(100-splitPrecent)} shrink={60}>
                        <RightContent ref={rightContentRef}/>
                    </HSpliter>
                </div>
            </SplitContext.Provider>
        </Styled>
    )
}