import React from 'react'
import "./Home.css"
import IntroHome from '../../components/intro home/IntroHome'
import { Images } from '../../components/images/Images'
import { ContentHome } from '../../components/content home/ContentHome'

const Home = () => {
    return (
        <div>
            <IntroHome></IntroHome>
            <Images></Images>
            <ContentHome></ContentHome>
        </div>
    )
}

export default Home