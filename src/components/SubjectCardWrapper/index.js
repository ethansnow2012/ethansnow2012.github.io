
import React, {useState, useRef, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {SubjectCard ,DefaultStyle as SubjectCardDefaultStyle} from 'components/SubjectCard'
import {TransitionGroup, CSSTransition, } from 'react-transition-group'

const transitionTime = '0.5'
const Styled = styled.div`
    & > *{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-between;
    }
    & ${SubjectCardDefaultStyle}{
        position: relative;
    }
`
const transition = styled.div`
    
    .transition-enter{
        opacity: 0;
        transition: all ${transitionTime}s;
        top:30%;
        left:30%;
    }
    .transition-enter-active{
        opacity: 1;
        top:0%;
        left:0%;
    }
    .transition-exit{
        opacity: 1;
        top:0%;
        left:0%;
        transition: all ${transitionTime}s;
    }
    .transition-exit-active{
        opacity: 0;
        top:30%;
        left:30%;
    }
`

const adjectHeight = function(target) {
    console.log('adjectHeight')
    const wrapper =target.closest('.p-content-wrapper')
    const wrapperOuter =target.closest('.p-content-wrapper-outter')
    wrapperOuter.style.maxHeight = wrapper.offsetHeight+'px'
    wrapperOuter.style.minHeight = wrapper.offsetHeight+'px'
    setTimeout(()=>{
        wrapperOuter.style.maxHeight = wrapper.offsetHeight+'px'
        wrapperOuter.style.minHeight = wrapper.offsetHeight+'px'
    }, (+transitionTime)*1000)
}

export function SubjectCardWrapper({children, data}){
    const dataFiltered = data.filter(x=>x.display)
    const shouldBeDisplayedCount = useRef(dataFiltered.length)
    const isDisplayedCount = useRef(dataFiltered.length)
    
    const enter = useCallback(
        (target)=>{
            shouldBeDisplayedCount.current = shouldBeDisplayedCount.current + 1
            console.log('enter', shouldBeDisplayedCount.current, isDisplayedCount.current)
        },
        [isDisplayedCount]
    )
    const entering = useCallback(
        (target)=>{
            if( isDisplayedCount.current == shouldBeDisplayedCount.current ) {
                console.log('balanced')
                
            }
            console.log('entering', shouldBeDisplayedCount.current, isDisplayedCount.current)
        },
        [isDisplayedCount, shouldBeDisplayedCount]
    )
    const entered = useCallback(
        (target)=>{
            
            isDisplayedCount.current += 1
            if( isDisplayedCount.current == shouldBeDisplayedCount.current ) {
                console.log('balanced')
                adjectHeight(target)
            }
            console.log('entered', shouldBeDisplayedCount.current, isDisplayedCount.current)
        },
        [isDisplayedCount, shouldBeDisplayedCount]
    )
    const exit = (target)=>{

    }

    const exiting = useCallback(
        (target)=>{
            
            isDisplayedCount.current -= 1
            console.log('exiting', shouldBeDisplayedCount.current, isDisplayedCount.current)
        },
        [isDisplayedCount]
    )

    const exited = useCallback(
        (target)=>{
            
            shouldBeDisplayedCount.current -= 1
            if( isDisplayedCount.current == shouldBeDisplayedCount.current ) {
                console.log('balanced')
                adjectHeight(target)
            }
            console.log('exited', shouldBeDisplayedCount.current, isDisplayedCount.current)
        },
        [isDisplayedCount, shouldBeDisplayedCount]
    )

    return (
        <Styled>
            {/* //onExited={exited} */}
            <TransitionGroup component={transition}>
            {
                dataFiltered.map((dataEl)=>{
                    return (
                        <CSSTransition 
                            key={dataEl.id+'transition'}
                            onEnter={enter}
                            onEntering={entering}
                            onEntered={entered}
                            onExit={exit}
                            onExiting={exiting}
                            onExited={exited}
                            
                            timeout={{
                                    appear: (+transitionTime)*1000,
                                    enter: (+transitionTime)*1000,
                                    exit: (+transitionTime)*1000,
                                }}
                            classNames="transition">
                            <SubjectCard key={dataEl.id} data={dataEl} ></SubjectCard>
                        </CSSTransition>
                    )
                })
            }
            
            
            </TransitionGroup>
        </Styled>
    )
}

