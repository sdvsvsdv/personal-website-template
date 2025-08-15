import React from 'react'
import "./introhome.css"
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

//context
import { useContext } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

const IntroHome = () => {
    // context
        const {backstate} = useContext(BackgorndContext)

    return (
        <section className='introhome'>
            <div className='container' style={{backgroundColor: backstate? "white" : ""}}>
                <div className='main'>
                    <p className='p-main' style={{color: backstate? "black" : ""}}>Software designer, founder, and amateur astronaut.</p>
                </div>
                <div className='second'>
                <p>I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.</p>
                </div>
                <div className='icons'>
                    <XIcon></XIcon>
                    <InstagramIcon></InstagramIcon>
                    <GitHubIcon></GitHubIcon>
                    <LinkedInIcon></LinkedInIcon>
                </div>
            </div>
        </section>
    )
}

export default IntroHome