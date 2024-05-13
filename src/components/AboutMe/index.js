import React from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 60px;
    & .inner-space{
        padding-right:1em;
        padding-left:1em;
    }
    & .inner-title{

    }
    & .inner{
        margin-top:0.7em;
        max-width: 600px
    }
    & .inner > * + *{
        margin-top:0.5em;
    }
    & .worklink{
        position: relative;
        width: max-content;
        display: flex;
        font-size: 1.4em;
    }
    & .worklink + .worklink{
        margin-top:5px;
    }
    & .worklink:hover img{
        right: 100%;
    }
    & .worklink-dot{
        margin-right: 10px;
    }
    & .worklink a{
        z-index: 1;
    }
    & .worklink img{
        transition: all 1s ease;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        mix-blend-mode: lighten;
        filter: brightness(0.5);
    }
`

export function AboutMe({children, shiningColor, onClick}){
    return (
        <Styled >
            <div className='inner-space'>
                <div className='inner-title'>這個網站與關於我:</div>
                <div className='inner'>
                    <div>
                    我是高傑(ethansnow2012@gmail.com)，這個部落格網站的作者，<br/>
                    之後也許會開放成共編平台。<br/>
                    </div>
                    <div>
                    任何如果想合作或聊聊的人，如果看到這裡，<br/>
                    能與您相遇是我的榮幸～<br/>
                    </div>
                    <div></div>
                    <div data-aos="subtle-in-v2" data-aos-duration={500}>
                        <div>
                        其他我的作品：<br/>
                        <br/>
                        </div>
                        <a className="worklink" href="https://ethansnow2012.github.io/rdrag-rdrop">
                            <div className="worklink-dot" >-</div> <div >拖拉元件的函式庫</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <a className="worklink" href="https://ethansnow2012.github.io/recole">
                            <div className="worklink-dot" >-</div> <div >響應式編成實驗</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <a className="worklink" href="https://ethansnow2012.github.io/rinnegan">
                            <div className="worklink-dot" >-</div> <div >萬花筒寫輪眼</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <a className="worklink" href="https://ethansnow2012.github.io/d3_graph_file_node_viewer">
                            <div className="worklink-dot" >-</div> <div >d3 檔案瀏覽方式（不好懂）</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                        <br/>
                        <a className="worklink" href="https://github.com/ethansnow2012">
                            <div className="worklink-dot" >-</div> <div >Github</div>
                            <img src="/link-background.jpg"></img>
                        </a>
                    </div>
                </div>
            </div>
        </Styled>
    )
}