import React from 'react'
import "./projects.css"

// material ui
import LinkIcon from '@mui/icons-material/Link';

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

export default function Projects() {
    const containerRef = useRef(null);
        // context
    const {backstate} = useContext(BackgorndContext)

    useGSAP(() => {
        const titleSplit = new SplitText(".title h1" , {type: "chars, words"})
        const paragraphSplit = new SplitText(".title p" , {type: "lines"})

        const ctx = gsap.context(() => {
            // Set initial states
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
                const cards = document.querySelectorAll(".card");
                cards.forEach(card => {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            scale: 1.05,
                            duration: 0.4, 
                            backgroundColor: backstate? "rgba(240, 240, 240, 0.1)" : "rgba(78, 71, 71, 0.1)", // very light gray, almost transparent
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
        <section ref={containerRef}>
            <div className="container" style={{backgroundColor: backstate? "white" : ""}}>
                <div className="projects-content">
                    <div className='title'>
                        <h1 style={{color: backstate? "black" : "white"}}>Things I’ve made trying to put my dent in the universe.</h1>
                        <p>I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.</p>
                    </div>
                    <div className='cards'>
                        <div className='card'>
                            <img src='/images/work-1.svg'></img>
                            <p className='first' style={{color: backstate? "black" : "white"}}>Planetaria</p>
                            <p className='second'>Creating technology to empower civilians to explore space on their own terms.</p>
                            <button style={{color: backstate? "black" : "white"}}><LinkIcon></LinkIcon> Planetaria.tech</button>
                        </div>
                        <div className='card'>
                            <img src='/images/projects-2.svg'></img>
                            <p className='first' style={{color: backstate? "black" : "white"}}>Animaginary</p>
                            <p className='second'>High performance web animation library, hand-written in optimized WASM.</p>
                            <button style={{color: backstate? "black" : "white"}}><LinkIcon></LinkIcon> GitHub.com</button>
                        </div>
                        <div className='card'>
                            <img src='/images/projects-3.svg'></img>
                            <p className='first' style={{color: backstate? "black" : "white"}}>HelioStream</p>
                            <p className='second'>Real-time video streaming library, optimized for interstellar transmission.</p>
                            <button style={{color: backstate? "black" : "white"}}><LinkIcon></LinkIcon> GitHub.com</button>
                        </div>
                        <div className='card'>
                            <img src='/images/projects-4.svg'></img>
                            <p className='first' style={{color: backstate? "black" : "white"}}>cosmOS</p>
                            <p className='second'>The operating system that powers our Planetaria space shuttles.</p>
                            <button style={{color: backstate? "black" : "white"}}><LinkIcon></LinkIcon> GitHub.com</button>
                        </div>
                        <div className='card'>
                            <img src='/images/projects-5.svg'></img>
                            <p className='first' style={{color: backstate? "black" : "white"}}>Open Shuttle</p>
                            <p className='second'>The schematics for the first rocket I designed that successfully made it to orbit.</p>
                            <button style={{color: backstate? "black" : "white"}}><LinkIcon></LinkIcon> GitHub.com</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
