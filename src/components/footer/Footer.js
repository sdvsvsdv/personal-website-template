import React from 'react'
import "./footer.css"
import { Link} from 'react-router-dom';

//context
import { useContext } from 'react';
import { BackgorndContext } from '../../contexts/BackgroundContext';

export const Footer = () => {
    // context
    const {backstate} = useContext(BackgorndContext)


    return (
        <section className='footer'>
            <div className='container' style={{backgroundColor: backstate? "white" : ""}}>
                <div className='footer-content'>
                <div className='links'>
                    <ul>
                        <Link to="about" style={{textDecoration: "none" , color: backstate? "black" : "white"}}>
                            <li>About</li>
                        </Link>
                        <Link to="projects" style={{textDecoration: "none" , color: backstate? "black" : "white"}}>
                            <li>Projects</li>
                        </Link>
                        <Link to="speaking" style={{textDecoration: "none" , color: backstate? "black" : "white"}}>
                            <li>Speaking</li>
                        </Link>
                        <Link to="uses" style={{textDecoration: "none" , color: backstate? "black" : "white"}}>
                            <li>Uses</li>
                        </Link>
                    </ul>
                </div>
                <p>© 2025 Spencer Sharp. All rights reserved.</p>
                </div>
            </div>
        </section>
    )
}