import React from 'react'
import "./speaking.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//context
import { useContext , useRef } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

//gsap
import gsap from 'gsap';
import { ScrollTrigger} from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText);

export default function Speaking() {
    const containerRef = useRef(null);
        // context
    const {backstate} = useContext(BackgorndContext)

    useGSAP(() => {
        const titleSplit = new SplitText(".title h1" , {type: "chars, words"})
        const paragraphSplit = new SplitText(".title p" , {type: "lines"})

        const ctx = gsap.context(() => {
            
            gsap.set(titleSplit.chars , { y: 0, opacity: 0  , scale: 0.6});
            gsap.set(paragraphSplit.lines, { 
                y: -40, 
                x: gsap.utils.random(-100, 100, true), 
                opacity: 0,  
                scale: 0.6, 
                rotationX: 45, 
                filter: "blur(8px)",
                color: "#888" 
            });

            gsap.utils.toArray(".card").forEach((card, i) => {
            gsap.set(card, { 
                x: gsap.utils.random(-200, 200, true), 
                y: 50, 
                opacity: 0,
                scale: 0.6,
                rotation: gsap.utils.random(-15, 15, true) 
            });

            gsap.to(titleSplit.chars , {
            y: 0,
            duration: 1,
            opacity: 1,
            scale: 1,
            ease: "expo.out",
            stagger: {
                each: 0.05,
                from: "random"
            },
            })

            gsap.to(paragraphSplit.lines, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1.05, 
                rotationX: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "elastic.out(1, 0.6)", 
                stagger: {
                    each: 0.4,
                    from: "random"
                },
                delay: 0.4,
                onComplete: () => {
                    gsap.to(paragraphSplit.lines, { scale: 1, duration: 0.2, ease: "power1.out" });
                }
            });

            
            gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%", 
                        toggleActions: "play none none none"
                    },
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    delay: i * 0.15 
                });
            });

            
            
            setTimeout(() => {
                const contents = document.querySelectorAll(".content");
                contents.forEach(content => {
                    content.addEventListener("mouseenter", () => {
                        gsap.to(content, {
                            scale: 1.05,
                            duration: 0.4, 
                            backgroundColor: backstate? "rgba(240, 240, 240, 0.1)" : "rgba(78, 71, 71, 0.1)", // very light gray, almost transparent
                            ease: "bounce.out"
                        });
                    });
                    
                    content.addEventListener("mouseleave", () => {
                        gsap.to(content, {
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
        <section ref={containerRef}> 
            <div className='container' style={{backgroundColor: backstate? "white" : ""}}>
                <div className='speaking-content'>
                    <div className='title'>
                        <h1 style={{color: backstate? "black" : "white"}}>Things I’ve made trying to put my dent in the universe.</h1>
                        <p>I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.</p>
                    </div>
                    <div className='cards one'>
                        <div className='card'>
                            <div className='date' style={{color: backstate? "black" : "white"}}><p>Conferences</p></div>
                            <div className='content'>
                                <div className="type"><p>SysConf 2021</p></div>
                                <p className='first' style={{color: backstate? "black" : "white"}}>In space, no one can watch you stream — until now</p>
                                <p className='second'>A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth.</p>
                                <button>Watch video <ArrowRightIcon></ArrowRightIcon> </button>
                            </div>
                        </div>
                        <div className='card card-2'>
                            <div className='date'></div>
                            <div className='content'>
                                <div className="type"><p>Business of Startups 2020</p></div>
                                <p className='first' style={{color: backstate? "black" : "white"}}> learned from our first product recall</p>
                                <p className='second'>They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated.</p>
                                <button>Watch video <ArrowRightIcon></ArrowRightIcon> </button>
                            </div>
                        </div>
                    </div>
                    <div className='cards two'>
                        <div className='card'>
                            <div className='date' style={{color: backstate? "black" : "white"}}><p>Podcasts</p></div>
                            <div className='content'>
                                <div className="type"><p>Encoding Desgin, July 2022</p></div>
                                <p className='first' style={{color: backstate? "black" : "white"}}>Using design as a competitive advantage</p>
                                <p className='second'>How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria.</p>
                                <button>Listen to podcast <ArrowRightIcon></ArrowRightIcon> </button>
                            </div>
                        </div>
                        <div className='card card-2'>
                            <div className='date'></div>
                            <div className='content'>
                                <div className="type"><p>The escape velocity show, March 2022</p></div>
                                <p className='first' style={{color: backstate? "black" : "white"}}>Bootstrapping an aerospace company to $17M ARR</p>
                                <p className='second'>The story of how we built one of the most promising space startups in the world without taking any capital from investors.</p>
                                <button>Listen to podcast <ArrowRightIcon></ArrowRightIcon> </button>
                            </div>
                        </div>
                        <div className='card card-3'>
                            <div className='date'></div>
                            <div className='content'>
                                <div className="type"><p>How they work radio, september 2021</p></div>
                                <p className='first' style={{color: backstate? "black" : "white"}}>Programming your company operating system</p>
                                <p className='second'>On the importance of creating systems and processes for running your business so that everyone on the team knows how to make the right decision no matter the situation.</p>
                                <button>Listen to podcast <ArrowRightIcon></ArrowRightIcon> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
