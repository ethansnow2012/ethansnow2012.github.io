import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import '../../../public/d3.js/index.js'
// import '../../../public/d3-path-morphing.js/index.js'

import {useEffect} from 'react'

const Styled = styled.div`

    --viewBox_width: 500px;
    --viewBox_height: 500px;
    --rinnegan-container-width:40%;
    --rinnegan-container-height:40%;
    --rinnegan-color:red;

.rinnegan-viewBox{
    width: var(--viewBox_width);
    height: var(--viewBox_height);
    background-color: gray;
    position: relative;
}
.rinnegan-eye-container{
    background-color: var(--rinnegan-color);
    width: var(--rinnegan-container-width);/*have to be a ratio to viewBox*/
    height: var(--rinnegan-container-height);
    position: absolute;        
    border-radius: 50%;
    /* center */
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.rinnegan-eye-blackFrame{
    --gutter: -5%;
    width: calc(100% - var(--gutter));
    height: calc(100% - var(--gutter));
    transform: translate(calc(var(--gutter)/2),calc(var(--gutter)/2));
    position: absolute;
    background: radial-gradient(closest-side, rgb(255 255 255 / 0%) 93%, rgb(0 0 0) 95%, rgb(255 255 255 / 0%) 98%);
}
.magatama1{
    position: absolute;
    top: 30%;
    left: 30%;
}
.magatama2{
    position: absolute;
    top: 31%;
    left: 29%;
    transform: rotate(117deg);
}
.magatama3{
    position: absolute;
    top: 30%;
    left: 29%;
    transform: rotate(229deg);
}
.center{
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 13px);
}
.btn1, .btn2{
    background-color: blue;
    color: white;
    padding: 10px 20px;
}
`

export const D3RinneganPage = ()=> {
    useEffect(()=>{
        const svg1 = 'M 108 13 C 82 36 85 59 99 62 C 121 56 107 38 101 43 C 97 41 98 32 107 15 '//'M10.7431 58.128C23.0014 30.8434 72.4301 0 72.4301 0C72.4301 0 23.0011 58.9189 36.4458 80.272C36.4458 93.3212 66.4986 88.9715 66.4986 114.279C66.4986 139.586 54.6355 147.1 32.4915 149.868C10.3475 152.636 0.0665547 111.115 0.0665547 111.115C0.0665547 111.115 -1.51516 85.4126 10.7431 58.128'
        const svg2 = 'M 143 26 C 67 40 46 133 101 123 C 132 120 128 75 95 81 C 90 71 110 39 140 28 Z'

        const svgContainerCenter = d3.selectAll(".svgContainer.center")
        const svgContainerMagatama = d3.selectAll(".svgContainer.magatama")
        const g = svgContainerMagatama.append('g').html(`
                    <path xd="M10.7431 58.128C23.0014 30.8434 72.4301 0 72.4301 0C72.4301 0 23.0011 58.9189 36.4458 80.272C36.4458 93.3212 66.4986 88.9715 66.4986 114.279C66.4986 139.586 54.6355 147.1 32.4915 149.868C10.3475 152.636 0.0665547 111.115 0.0665547 111.115C0.0665547 111.115 -1.51516 85.4126 10.7431 58.128Z" />
                `)
        const circle = svgContainerCenter.append('g').html(`
                    <circle cx="100" cy="100" r="0" />
                `)
                
        const toSamsara = () => {
            g.select('svg path')
                .transition()
                .duration(1000)
                    .attrTween('d', function () {
                        let startPath = svg1
                        let endPath = svg2
                        return d3.morphPath(startPath, endPath);
                    });    

            circle.select('circle')
                .transition()
                .duration(1000)
                .delay(650)
                .attr('r', 80);
        }
        const toRinnegan = () => {
            g.select('svg path')
                .transition()
                .duration(1000)
                    .attrTween('d', function () {
                        let startPath = svg2
                        let endPath = svg1
                        return d3.morphPath(startPath, endPath);
                    });    

            circle.select('circle')
                .transition()
                .duration(1000)
                .delay(650)
                .attr('r', 0);
        }
            

        
        document.querySelector('.btn1').addEventListener('click', () => {
            toRinnegan()
        });

        document.querySelector('.btn2').addEventListener('click', () => {
            toSamsara()
        });

        toSamsara()
    },[])
    return (
        <div>
        <Styled>
            
            <div
                dangerouslySetInnerHTML={{__html: `
            <div class="rinnegan-viewBox">
                <div class="rinnegan-eye-container">
                    <div class="rinnegan-eye-blackFrame"></div>
                    
                </div>
                <svg class="svgContainer magatama magatama1" width="200" height="200" viewBox="0 0 200 200" fill="black" xmlns="http://www.w3.org/2000/svg"></svg>
                <svg class="svgContainer magatama magatama2" width="200" height="200" viewBox="0 0 200 200" fill="black" xmlns="http://www.w3.org/2000/svg"></svg>
                <svg class="svgContainer magatama magatama3" width="200" height="200" viewBox="0 0 200 200" fill="black" xmlns="http://www.w3.org/2000/svg"></svg>
                <svg class="svgContainer center" width="20" height="20" viewBox="0 0 200 200" fill="red" xmlns="http://www.w3.org/2000/svg">
        
                </svg>
            </div>
            <!-- try -->
            
                
            </svg>
            <button class="btn1">寫輪眼</button>
            <button class="btn2">輪迴眼</button>
                `}}
            />
        </Styled>
        </div>
    )
}