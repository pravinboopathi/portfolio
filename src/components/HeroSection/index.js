import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, SocialMediaIcons, SocialMediaIcon, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title> <span style={{ fontWeight: '500', fontSize: '1.8rem' }}>Hi, I am</span> <br /> {Bio.name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{Bio.description}</SubTitle>
                        <ResumeButton href={Bio.resume} target='display'>Connect with Me</ResumeButton>
                        <SocialMediaIcons>
              <SocialMediaIcon href={Bio.linkedin} target="_blank" className='text-blue-500 hover:bg-blue-100 hover:text-blue-500'>
                <FaLinkedin />
              </SocialMediaIcon>
              <SocialMediaIcon href={Bio.github} target="_blank" className='text-gray-700 hover:bg-gray-100 hover:text-gray-700'>
                <FaGithub />
              </SocialMediaIcon>
              <SocialMediaIcon href={Bio.twitter} target="_blank" className='text-blue-400 hover:bg-blue-100 hover:text-blue-400'>
                <FaTwitter />
              </SocialMediaIcon>
            </SocialMediaIcons>

                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">

                        <Img src={HeroImg} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection