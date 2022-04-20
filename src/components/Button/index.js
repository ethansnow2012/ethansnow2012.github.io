import React from 'react'
import styled from 'styled-components'
const Styled = styled.div`
    position: relative;
    padding: 2px 6px;
    overflow: hidden;
    border-radius: 6px;
    ::before{
        content:'';
    }
    :hover::before{
        position: absolute;
        top: 0;
        left: -20px;
        width: 10px;
        height: calc(100% + 20px);
        background: ${props=>props.shiningColor??"hsla(0,0%,100%,.5019607843137255)"};
        transform: skew(-15deg);
        animation: e-aaaa-transleft 4.5s infinite;
    }
    @keyframes e-aaaa-transleft {
        from {
          left: -20px;
        }
        15%{
          left: 100%;
        }
        to {
          left: 100%;
        }
    }
`

export function ShiningButton({children, shiningColor, onClick}){
    return (
        <Styled shiningColor={shiningColor} onClick={onClick}>
            {children}
        </Styled>
    )
}