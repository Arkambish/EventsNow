
import React from 'react'
import BookticketSection from './components/BookticketSection'
import HowItWorks from './components/HowItWorks'
import OverviewComponent from './components/OverviewComponent'
import CreateEventSection from './components/CreateEventSection'
import HomeFooter from './components/HomeFooter'

export default function page() {
  return (
    <div className='bg-gradient-home  '>
      <BookticketSection/>
      <HowItWorks/>
      <OverviewComponent/>
      <CreateEventSection />
      <HomeFooter/>
    </div>
  )
}
