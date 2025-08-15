import React from 'react'
import "./contenthome.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import  { useRef } from 'react';


//gsap
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';

//context
import { useContext } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

    gsap.registerPlugin(ScrollTrigger)

export const ContentHome = () => {

    const containerRef = useRef(null);
    // context
    const {backstate} = useContext(BackgorndContext)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set(".card", { x: -200, opacity: 0  , scale: 0.6});
            gsap.set(".contact", { y: -200, opacity: 0  , scale: 0.6});
            gsap.set(".work", { y: -200, opacity: 0  , scale: 0.6});

            
            gsap.to(".card", {
                scrollTrigger: {
                trigger: ".card",
                start: "top 85%",
                toggleActions: "play none none none",
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                scale: 1,
                stagger: 0.6,
                ease: "power2.out"
            })

            gsap.to(".contact", {
                scrollTrigger: {
                trigger: ".contact",
                start: "top 50%",
                toggleActions: "play none none none",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                scale: 1,
                stagger: 0.6,
                ease: "power2.out"
            })

            gsap.to(".work", {
                scrollTrigger: {
                trigger: ".work",
                start: "top 50%",
                toggleActions: "play none none none",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                scale: 1,
                stagger: 0.6,
                ease: "power2.out"
            })

            
            setTimeout(() => {
                const cards = document.querySelectorAll(".card");
                cards.forEach(card => {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            scale: 1.05,
                            duration: 0.4, 
                            backgroundColor: "rgba(240, 240, 240, 0.035)", 
                            ease: "bounce.out"
                        });
                    });
                    
                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            scale: 1,
                            duration: 0.4,
                            backgroundColor: "transparent",
                            ease: "bounce.out"
                        });
                    });
                });
        }, 1000);


        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef, revertOnUpdate: false, once: true });

    return (
        <section className='content-home' ref={containerRef}>
            <div className='container' style={{backgroundColor: backstate? "white" : ""}}>
                <div className='content'>
                    <div className='content-left'>
                        <div className='card'>
                            <div className='date'>
                                <p>September 5, 2022</p>
                            </div>
                            <p className='title'style={{color: backstate? "black" : ""}}>Crafting a design system for a multiplanetary future</p>
                            <p className='main'>Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
                            <button>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                        </div>
                        <div className='card'>
                            <div className='date'>
                                <p>September 2, 2022</p>
                            </div>
                            <p className='title' style={{color: backstate? "black" : ""}}>Introducing Animaginary: High performance web animations</p>
                            <p className='main'>When you’re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.</p>
                            <button>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                        </div>
                        <div className='card'>
                            <div className='date'>
                                <p>July 14, 2022</p>
                            </div>
                            <p className='title'style={{color: backstate? "black" : ""}}>Rewriting the cosmOS kernel in Rust</p>
                            <p className='main'>When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language, but it’s been a while since I’ve seen an article on the front page of Hacker News about rewriting some important tool in Go and I see articles on there about rewriting things in Rust every single week.</p>
                            <button>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='contact'>
                            <div className='title'><EmailIcon></EmailIcon><p style={{color: backstate? "black" : ""}}>Stay up to date</p></div>
                            <p className='p'>Get notified when I publish something new, and unsubscribe at any time.</p>
                            <div className='input'>
                                <input type='email' placeholder='Email address'style={{backgroundColor: backstate? "white" : ""}}></input>
                                <button>Join</button>
                            </div>
                        </div>
                        <div className='work'>
                            <div className='title'><WorkIcon></WorkIcon><p style={{color: backstate? "black" : ""}}>Work</p></div>
                            <div className='work-card'>
                                <img src='/images/work-1.svg'></img>
                                <div className='card-content'>
                                    <p className='main'style={{color: backstate? "black" : ""}}>Planetaria</p>
                                    <div className='info'>
                                        <p>CEO</p>
                                        <p>2019 — Present</p>
                                    </div>
                                </div>
                            </div>
                            <div className='work-card'>
                                <img src='/images/work-2.svg'></img>
                                <div className='card-content'>
                                    <p className='main'style={{color: backstate? "black" : ""}}>Airbnb</p>
                                    <div className='info'>
                                        <p>Product Designer</p>
                                        <p>2014 — 2019</p>
                                    </div>
                                </div>
                            </div>
                            <div className='work-card'>
                                <img src='/images/work-3.svg'></img>
                                <div className='card-content'>
                                    <p className='main'style={{color: backstate? "black" : ""}}>Facebook</p>
                                    <div className='info'>
                                        <p>iOS Software Engineer</p>
                                        <p>2011 — 2014</p>
                                    </div>
                                </div>
                            </div>
                            <div className='work-card'>
                                <img src='/images/work-4.svg'></img>
                                <div className='card-content'>
                                    <p className='main'style={{color: backstate? "black" : ""}}>Starbucks</p>
                                    <div className='info'>
                                        <p>Shift Supervisor</p>
                                        <p>2008 — 2011</p>
                                    </div>
                                </div>
                            </div>
                            <button>Download CV <ArrowDownwardIcon></ArrowDownwardIcon> </button>
                        </div>
                    </div>
                </div>

                <span></span>
            </div>
        </section>
    )
}
