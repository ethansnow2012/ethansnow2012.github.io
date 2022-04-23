import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import Panorama from 'panorama';
import card_bg1 from 'assets/card-bg1.png';
import card_bg2 from 'assets/card-bg2.png';
import 'swiper/css'; // eslint-disable-line
import 'swiper/css/pagination'; // eslint-disable-line

// Import Swiper styles
import 'swiper/css';
import { background } from '@chakra-ui/react';
const StyledFooterButton = styled.div`
    position: absolute;
    right: 9px;
    bottom: 15px;
    font-size:0.8em;
`

const StyledFooterCard = styled.div`
    cursor: default;
    position: relative;
    background-image:${props=>props.image?`url(${props.image})`:''};
    margin: 11vmin;
    width: 45vmin;
    height: 26vmin;
    background-size: cover;
    padding: 5px 10px;
    border-radius: 5px;
    .footer-card-title{
        font-size: 1.7em;
    }
    .footer-card-text{
        margin-top: 23px;
        padding-left: 22px;
    }
`

const StyledFooter = styled.div`
    background:grey;
    height: 70vh;
    width:100%;
    display: flex;
    justify-content: center;
    align-content: center;
    .footer-inner{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer-card{
        
    }
`

const Styled = styled.div`
    background:var(--color-basic-background);
    height: 100vh;
    width:100%;
    position:relative;
    .orbitwrapper{
        position:absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow:hidden;
    }
    .one {
        animation: orbitone 3s infinite linear running;
        font-size: 4em;
    }
    .two {
        font-size: 8em;
        color:red;
        animation: orbittwo 3s infinite linear running;
    }
    .three {
        font-size: 7em;
        animation: orbitthree 7s infinite linear running;
    }
    .four {
        color:yellow;
        font-size: 7em;
        animation: orbitfour 5s infinite linear running;
    }

    .planet {
        position: absolute;
    }
    .planet-shift-one{
        transform: rotateX(255deg) rotateY(59deg);
    }
    .planet-shift-two{
        transform: rotateX(45deg) rotateY(45deg);
    }
    .planet-shift-three{
        transform: rotateX(118deg) rotateY(15deg);
    }
    .planet-shift-four{
        transform: rotateX(244deg) rotateY(15deg)
    }
    
    @keyframes orbitone {
        from {
          transform: rotate(0deg) translateX(80vw);
        }
        to {
          transform: rotate(360deg) translateX(80vw);
        }
    }
    @keyframes orbittwo {
        from {
          transform: rotate(0deg) translateX(70vw);
        }
        to {
          transform: rotate(360deg) translateX(70vw);
        }
    }
    @keyframes orbitthree {
        from {
            transform: rotate(0deg) translateX(95vw);
        }
        to {
            transform: rotate(360deg) translateX(95vw);
        }
    }
    @keyframes orbitfour{
        from {
            transform: rotate(0deg) translateX(75vw);
        }
        to {
            transform: rotate(360deg) translateX(75vw);
        }
    }
    .p-swiper-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
    }
    .p-swiper-wrapper-inner{
        width:100vw;
        // height:45vmin;
    }
    .swiper-panorama {
        overflow: visible;
    }
    .slide-block {
        margin: auto;
        width:22vmin;
        height:22vmin;
        background: black;
        padding: 5px;
        border-radius: 3px;
    }
    .slide-block:hover{
        box-shadow: 0 4px 30px rgb(237 237 237);
    }
`
const FooterCard = ({children, image , title, text, CTAtxt})=>{
    return (
        <div data-aos="subtle-in" data-aos-duration={500}>
            <StyledFooterCard image={image}>
                
                <div className='footer-card-title'>
                    {title}
                </div>
                <div className='footer-card-text'>
                    {text}
                </div>
                <StyledFooterButton>
                    {CTAtxt}
                </StyledFooterButton>
            </StyledFooterCard>
        </div>
    )
}

export const LandingPage = ()=> {
    return (
        <div>
            <Styled>
                <div className="p-swiper-wrapper">
                    <div className="p-swiper-wrapper-inner">
                        <Swiper
                            modules={[Pagination, Panorama]}
                            spaceBetween={50}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            effect={'panorama'}
                            slidesPerView={1} 
                            loop={true}
                            loopedSlides={10}
                            centeredSlides={true}
                            grabCursor= {true}
                            pagination= {{
                                el: '.swiper-pagination',
                                dynamicBullets: true,
                                dynamicMainBullets: 3,
                            }}
                            panorama= {{
                                depth: 150,
                                rotate: 45,
                            }}
                            breakpoints= {{
                                480: {
                                    slidesPerView: 2,
                                    panorama: {
                                    rotate: 35,
                                    depth: 150,
                                    },
                                },
                                640: {
                                    slidesPerView: 3,
                                    panorama: {
                                    rotate: 30,
                                    depth: 150,
                                    },
                                },
                                1024: {
                                    slidesPerView: 4,
                                    panorama: {
                                    rotate: 30,
                                    depth: 200,
                                    },
                                },
                                1200: {
                                    slidesPerView: 5,
                                    panorama: {
                                    rotate: 25,
                                    depth: 250,
                                    },
                                }
                            }}
                            >
                            <SwiperSlide>
                                <div className="slide-block">
                                    <Link to='/A6KyMKQiSIg1CmuVWVEw0Od3NVh1'>
                                        <img data-aos="subtle-scale-in" data-aos-duration={500} src='/Atticstone.svg'></img>
                                    </Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slide-block">

                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slide-block">
                                    
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="slide-block">

                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="orbitwrapper">
                    <div className="planet-shift-one" >
                        <div className="planet one">*</div>
                    </div>
                    <div className="planet-shift-two" >
                        <div className="planet two">*</div>
                    </div>
                    <div className="planet-shift-three" >
                        <div className="planet three">*</div>
                    </div>
                    <div className="planet-shift-four" >
                        <div className="planet four">*</div>
                    </div>
                </div>
            </Styled>
            <StyledFooter>
                <div className="footer-inner">
                    <FooterCard image={card_bg1} title={'想一起寫部落格？'} text={'立即獲得在上面的版位！'} CTAtxt={'寫信到: ethansnow2012@gmail.com'}></FooterCard>
                    <FooterCard image={card_bg2} title={'有些有趣的想法？'} CTAtxt={'寫信到: ethansnow2012@gmail.com'}></FooterCard>
                </div>
            </StyledFooter>
        </div>
    )
}