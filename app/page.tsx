import Hero from '@/components/Hero'
import Newest from '@/components/Newest'
import React from 'react'

const page = () => {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
    </div>
  )
}

export default page
