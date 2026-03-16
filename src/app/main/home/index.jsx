import React from 'react'
import MainLayout from '../../../layout/main'
import HeroSection from './components/HeroSection'
import WhyChooseUs from './components/WhyChooseUs'
import MoviesToday from './components/MoviesToday'
import UpcomingMovies from './components/UpcomingMovies'

function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <WhyChooseUs />
      <MoviesToday />
      <UpcomingMovies />
    </MainLayout>
  )
}

export default Home
