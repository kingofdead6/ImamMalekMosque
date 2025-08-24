import React from 'react'
import Hero from '../components/Home/Hero'
import Jummua from '../components/Home/Jummua'
import Tilawa from '../components/Home/Tilawa'
import Mawaqit from '../components/Home/Mawakit'
import Dawra from '../components/Home/Dawra'
import Contact from '../components/Home/Contact'

const HomePage = () => {
  return (
    <div>
        <Hero />
        <Jummua />
        <Tilawa />
        <Mawaqit />
        <Dawra />
        <Contact />
    </div>
  )
}

export default HomePage