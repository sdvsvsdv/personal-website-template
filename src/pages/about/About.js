import "./About.css";

// material ui
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

//context
import { useContext , useRef } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

//gsap
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const containerRef = useRef(null);
    // context
    const {backstate} = useContext(BackgorndContext)


    useGSAP(() => {
        const ctx = gsap.context(() => {
            
            gsap.set("h1", { x: -200, opacity: 0  , scale: 0.6});
            gsap.set(".p p", { x: -200, opacity: 0  , scale: 0.6});
            gsap.set(".link", { y: -200, opacity: 0  , scale: 0.6});
            gsap.set(".image", {
                scale: 0,
                rotation: 1440, 
                opacity: 0,
                transformOrigin: "center center"
            });

            gsap.to("h1", {
                x: 0,
                opacity: 1,
                duration: 1,
                scale: 1,
                ease: "power2.out"
            })

            gsap.to(".p p", {
                scrollTrigger: {
                trigger: ".p p",
                start: "top 50%",
                toggleActions: "play none none none",
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                scale: 1,
                stagger: 0.6,
                ease: "power2.out"
            })

            gsap.to(".link", {
                scrollTrigger: {
                trigger: ".link",
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

            gsap.to(".image", {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out"
            });

            setTimeout(() => {
                const images = document.querySelectorAll(".image");
                images.forEach(image => {
                    image.addEventListener("mouseenter", () => {
                        gsap.to(image, {
                            scale: 1.3,
                            duration: 0.4,
                            ease: "bounce.out"
                        });
                    });
                    
                    image.addEventListener("mouseleave", () => {
                        gsap.to(image, {
                            scale: 1,
                            duration: 0.4,
                            backgroundColor: "transparent",
                            ease: "bounce.out"
                        });
                    });
                });
        }, 1000);

        setTimeout(() => {
                const links = document.querySelectorAll(".link");
                links.forEach(link => {
                    link.addEventListener("mouseenter", () => {
                        gsap.to(link, {
                            scale: 1.05,
                            duration: 0.4, 
                            ease: "bounce.out"
                        });
                    });
                    
                    link.addEventListener("mouseleave", () => {
                        gsap.to(link, {
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
        <div ref={containerRef}>
            <div className="container" style={{backgroundColor: backstate? "white" : ""}}>
                <div className="about-content" style={{backgroundColor: backstate? "white" : ""}}>
                    <div className="left">
                        <div className="h1"><h1  style={{color: backstate? "black" : "white"}}>I’m Spencer Sharp. I live in New York City, where I design the future.</h1></div>
                        <div className="p">
                            <p>I’ve loved making things for as long as I can remember, and wrote my first program when I was 6 years old, just two weeks after my mom brought home the brand new Macintosh LC 550 that I taught myself to type on.</p>
                            <p>The only thing I loved more than computers as a kid was space. When I was 8, I climbed the 40-foot oak tree at the back of our yard while wearing my older sister’s motorcycle helmet, counted down from three, and jumped — hoping the tree was tall enough that with just a bit of momentum I’d be able to get to orbit.</p>
                            <p>I spent the next few summers indoors working on a rocket design, while I recovered from the multiple surgeries it took to fix my badly broken legs. It took nine iterations, but when I was 15 I sent my dad’s Blackberry into orbit and was able to transmit a photo back down to our family computer from space.</p>
                            <p>Today, I’m the founder of Planetaria, where we’re working on civilian space suits and manned shuttle kits you can assemble at home so that the next generation of kids really can make it to orbit — from the comfort of their own backyards.</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="image"><img src="/images/about-image.webp"></img></div>
                        <div className="links">
                            <div className="link">
                                <XIcon  className="icons"></XIcon>
                                <p style={{color: backstate? "black" : "white"}}>Follow on X</p>
                            </div>
                            <div className="link">
                                <InstagramIcon  className="icons"></InstagramIcon>
                                <p style={{color: backstate? "black" : "white"}}>Follow on Instagram</p>
                            </div>
                            <div className="link">
                                <GitHubIcon className="icons"></GitHubIcon>
                                <p style={{color: backstate? "black" : "white"}}>Follow on GitHub</p>
                            </div>
                            <div className="link">
                                <LinkedInIcon className="icons"></LinkedInIcon>
                                <p style={{color: backstate? "black" : "white"}}>Follow on Linkedin</p>
                            </div>
                            <span className="span"></span>
                            <div className="link">
                                <EmailIcon className="icons"></EmailIcon>
                                <p style={{color: backstate? "black" : "white"}}>spencer@planetaria.tech</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;