import React from 'react'
import "./navbar.css"
import { useState, useEffect, useRef, useContext } from 'react';

// gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// routing
import { Link, useLocation } from 'react-router-dom';

// responsive ibrary
import { useMediaQuery } from "react-responsive";

// material ui
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SunnyIcon from '@mui/icons-material/Sunny';

// context
import { BackgorndContext } from '../../contexts/BackgroundContext';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
    const { backstate, handleBackground } = useContext(BackgorndContext);

    const isMobile = useMediaQuery({ maxWidth: 800 });
    const [open, setOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('');
    const location = useLocation();

    const desktopNavRef = useRef(null);
    const navImageRef = useRef(null);
    const mobileNavRef = useRef(null);
    const responsiveNavRef = useRef(null);
    const navContentRef = useRef(null);
    const navButtonRef = useRef(null);
    const respNavRef = useRef(null);
    const mobileButtonRef = useRef(null);
    const growingSpan = useRef(null);


    const handleNav = () => setOpen(!open);

    useEffect(() => {
        const path = location.pathname.slice(1);
        if (path) {
            setActiveNav(path);
        } else {
            setActiveNav('');
        }
    }, [location]);

    const handleNavClick = (navItem) => {
        setActiveNav(navItem);
    };

    useEffect(() => {
        if (isMobile) {
            gsap.fromTo(mobileNavRef.current, 
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
            );
            
            gsap.fromTo(respNavRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.7)" }
            );
            
            gsap.fromTo(mobileButtonRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.5, delay: 0.4, ease: "back.out(1.7)" }
            );
        } else {
            gsap.fromTo(desktopNavRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
            );
            
            gsap.fromTo(navImageRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
            );
            
            gsap.fromTo(navContentRef.current,
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out" }
            );
            
            gsap.fromTo(navButtonRef.current,
                { scale: 0, rotation: 180 },
                { scale: 1, rotation: 0, duration: 0.6, delay: 0.7, ease: "back.out(1.7)" }
            );
        }
    }, [isMobile]);
    

    useEffect(() => {
        if (open) {
            gsap.fromTo(responsiveNavRef.current,
                { y: -50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
        } else {
            gsap.to(responsiveNavRef.current,
                { y: -50, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" }
            );
        }
    }, [open]);


    useEffect(() => {
    if (isMobile) return;

    const navbar = desktopNavRef.current;
    const logo = navImageRef.current;
    let lastScroll = window.scrollY;
    let isVisible = true;

    gsap.set(logo, { scale: 1, y: 120 });

    gsap.to(logo, {
        scale: 0.6,
        y: -10,
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "200px top", 
            scrub: true,
        },
    });


    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 150) {
            navbar.classList.add("fixed-nav");
        } else {
            navbar.classList.remove("fixed-nav");
        }

        if (Math.abs(currentScroll - lastScroll) < 5) return;

        if (currentScroll > lastScroll && isVisible) {
            gsap.to(navbar, { y: -navbar.offsetHeight, duration: 0.4, ease: "power2.out" });
            isVisible = false;
        } else if (currentScroll < lastScroll && !isVisible) {
            gsap.to(navbar, { y: 0, duration: 0.4, ease: "power2.out" });
            isVisible = true;
        }

        lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
}, [isMobile]);






    useEffect(() => {
    const button = navButtonRef.current;
    const circle = growingSpan.current;

    if (!button || !circle) return;

    const handleClick = () => {

        if (desktopNavRef.current) {
            gsap.to(desktopNavRef.current, { opacity: 0, duration: 0.7});
        }

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.set(circle, {
            top: centerY,
            left: centerX,
            scale: 0,
            backgroundColor: backstate ? "black" : "white",
            xPercent: -50,
            yPercent: -50,
            opacity: 1,
            position: "fixed",
            zIndex: 9999,
            pointerEvents: "none",
        });

        const maxDiameter = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2;

        gsap.to(circle, {
            scale: maxDiameter / 40,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(circle, { scale: 0, opacity: 0 });

                handleBackground();

                if (desktopNavRef.current) {
                    gsap.to(desktopNavRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
                }
            },
        });
    };

    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
}, [backstate, handleBackground]);


    return (
        <>
            <nav>
                <div className='container' style={{ backgroundColor: backstate ? "white" : "" }}>
                    {isMobile && (
                        <>
                            <div className='mobile-nav' ref={mobileNavRef}>
                                <div className='resp-nav' ref={respNavRef}>
                                    <p>Menu</p>
                                    <ArrowDropDownIcon onClick={handleNav}></ArrowDropDownIcon>
                                </div>
                                <button ref={mobileButtonRef} onClick={() => handleBackground()}>
                                    <AutoAwesomeIcon />
                                </button>
                            </div>
                        </>
                    )}

                    {!isMobile && (
                        <>
                            <span ref={growingSpan} className='background'></span>
                            <nav className={`desktop-nav`} ref={desktopNavRef}>
                                <img src='/images/nav.webp' ref={navImageRef} alt="nav logo" />
                                <div className='nav-content' ref={navContentRef} style={{ backgroundColor: backstate ? "white" : "", boxShadow: backstate ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "" }}>
                                    <ul>
                                        <Link to="about" style={{ textDecoration: "none", color: backstate ? "black" : "white" }}>
                                            <li className={activeNav === 'about' ? 'active-nav' : ''} onClick={() => handleNavClick('about')}>About</li>
                                        </Link>
                                        <Link to="articles" style={{ textDecoration: "none", color: backstate ? "black" : "white" }}>
                                            <li className={activeNav === 'articles' ? 'active-nav' : ''} onClick={() => handleNavClick('articles')}>Articles</li>
                                        </Link>
                                        <Link to="projects" style={{ textDecoration: "none", color: backstate ? "black" : "white" }}>
                                            <li className={activeNav === 'projects' ? 'active-nav' : ''} onClick={() => handleNavClick('projects')}>Projects</li>
                                        </Link>
                                        <Link to="speaking" style={{ textDecoration: "none", color: backstate ? "black" : "white" }}>
                                            <li className={activeNav === 'speaking' ? 'active-nav' : ''} onClick={() => handleNavClick('speaking')}>Speaking</li>
                                        </Link>
                                        <Link to="uses" style={{ textDecoration: "none", color: backstate ? "black" : "white" }}>
                                            <li className={activeNav === 'uses' ? 'active-nav' : ''} onClick={() => handleNavClick('uses')}>Uses</li>
                                        </Link>
                                    </ul>
                                </div>
                                <button ref={navButtonRef}>
                                    {backstate ? <SunnyIcon style={{ color: '#03a594' }} /> : <AutoAwesomeIcon />}
                                </button>
                            </nav>
                        </>
                    )}
                </div>
            </nav>

            {open && (
                <nav className='responsive-nav' ref={responsiveNavRef}>
                    <div className='container'>
                        <div className='close'>
                            <p>Navigation</p>
                            <button onClick={handleNav}>
                                <CloseIcon />
                            </button>
                        </div>
                        <ul>
                            <Link to="about" style={{ textDecoration: "none", color: "white" }} onClick={handleNav}>
                                <li className={activeNav === 'about' ? 'active-nav' : ''} onClick={() => handleNavClick('about')}>About</li>
                            </Link>
                            <Link to="articles" style={{ textDecoration: "none", color: "white" }} onClick={handleNav}>
                                <li className={activeNav === 'articles' ? 'active-nav' : ''} onClick={() => handleNavClick('articles')}>Articles</li>
                            </Link>
                            <Link to="projects" style={{ textDecoration: "none", color: "white" }} onClick={handleNav}>
                                <li className={activeNav === 'projects' ? 'active-nav' : ''} onClick={() => handleNavClick('projects')}>Projects</li>
                            </Link>
                            <Link to="speaking" style={{ textDecoration: "none", color: "white" }} onClick={handleNav}>
                                <li className={activeNav === 'speaking' ? 'active-nav' : ''} onClick={() => handleNavClick('speaking')}>Speaking</li>
                            </Link>
                            <Link to="uses" style={{ textDecoration: "none", color: "white" }} onClick={handleNav}>
                                <li className={activeNav === 'uses' ? 'active-nav' : ''} onClick={() => handleNavClick('uses')}>Uses</li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            )}
        </>
    )
}
