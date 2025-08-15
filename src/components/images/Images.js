import React from 'react'
import "./images.css"
import  { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const Images = () => {

    const containerRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            
            gsap.set(".image", { x: 0, opacity: 0  , scale: 0.6});

            
            gsap.to(".image", {
                x: -200,
                opacity: 1,
                duration: 0.8,
                scale: 1,
                stagger: 0.6,
                ease: "power2.out"
            })

            
            setTimeout(() => {
                
                const images = document.querySelectorAll(".image");
                images.forEach(image => {
                    image.addEventListener("mouseenter", () => {
                        gsap.to(image, {
                            scale: 1.05,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });
                    
                    image.addEventListener("mouseleave", () => {
                        gsap.to(image, {
                            scale: 1,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    });
                });

            }, 1000);

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef, revertOnUpdate: false, once: true });

    return (
        <section className='images' ref={containerRef}>
            <img src='/images/image-1.webp' className='one image'></img>
            <img src='/images/image-2.webp' className='two image'></img>
            <img src='/images/image-3.webp' className='three image'></img>
            <img src='/images/image-4.webp' className='four image'></img>
            <img src='/images/image-5.webp' className='five image'></img>
        </section>
    )
}
