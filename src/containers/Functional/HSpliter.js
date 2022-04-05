
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    flex-grow: ${props=>props.weightPercent??1};
    flex-shrink: ${props=>props.weightPercent??1};
    .spliter-inner{
        position: relative;
        width:calc(100vw - ${props=>(props.shrink??0)+'px'});
        // height:100vh;
    }
`

export function HSpliter({children, weightPercent, shrink}){
    return (
        <Styled weightPercent={weightPercent} shrink={shrink}>
            <div className="spliter-inner">
                {children}
            </div>
        </Styled>
    )
}