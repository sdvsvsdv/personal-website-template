import React from 'react'
import "./articles.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//context
import { useContext , useRef } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

//gsap
import gsap from 'gsap';
import { ScrollTrigger} from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText);

const Articles = () => {

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
            <div className="container" style={{backgroundColor: backstate? "white" : ""}}>
                <div className='articles-content'>
                    <div className='title'>
                        <h1 style={{color: backstate? "black" : "white"}}>Writing on software design, company building, and the aerospace industry.</h1>
                        <p>All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.</p>
                    </div>
                    <div className='cards'>
                        <div className='card'>
                            <div className='date'><p>September 5, 2022</p></div>
                            <div className='content'>
                                <p className='first'style={{color: backstate? "black" : "white"}} >Crafting a design system for a multiplanetary future</p>
                                <p className='second'>Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.</p>
                                <Link to="/articles/design-system" style={{textDecoration: "none"}}>
                                <button style={{cursor: "pointer"}}>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                                </Link>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='date'><p>September 2, 2022</p></div>
                            <div className='content'>
                                <p className='first' style={{color: backstate? "black" : "white"}}>Introducing Animaginary: High performance web animations</p>
                                <p className='second'>When you’re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.</p>
                                <Link to="/articles/animaginary" style={{textDecoration: "none"}}>
                                <button style={{cursor: "pointer"}}>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                                </Link>
                            </div>
                        </div>
                        <div className='card third'>
                            <div className='date'><p>July 14, 2022</p></div>
                            <div className='content'>
                                <p className='first' style={{color: backstate? "black" : "white"}}>Rewriting the cosmOS kernel in Rust</p>
                                <p className='second'>When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language, but it’s been a while since I’ve seen an article on the front page of Hacker News about rewriting some important tool in Go and I see articles on there about rewriting things in Rust every single week.</p>
                                <Link to="/articles/cosmos-rust" style={{textDecoration: "none"}}>
                                <button style={{cursor: "pointer"}}>Read article <ArrowRightIcon></ArrowRightIcon> </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Articles