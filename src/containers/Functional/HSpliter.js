
import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    .spliter-inner{
        position: relative;
        width:calc(100vw - ${props=>(props.shrink??0)+'px'});
        // height:100vh;
    }
`

export function HSpliter({children, shrink}){
    return (
        <Styled  shrink={shrink}>
            <div className="spliter-inner">
                {children}
            </div>
        </Styled>
    )
}