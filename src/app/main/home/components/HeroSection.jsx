import React from 'react'
import { DUMMY_DATA } from '../../../../data/dummy'

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between  py-16 gap-10 max-w-7xl mx-auto">
      <div className=" space-y-6 ">
        <p className="text-[#003049] text-xs md:text-sm font-bold tracking-wider uppercase">Movie Ticket Purchases #1 in Indonesia</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
          Experience the Magic of Cinema: Book Your Tickets Today
        </h1>
        <p className="text-muted-foreground text-lg">Sign up and get the ticket with a lot of discount</p>
      </div>

      <div className="column-2 gap-2 flex  w-3xl items-center ">
        <div className="space-y-4">
          <img src={DUMMY_DATA.heroImages[0]} alt="Movie placeholder" className="rounded-t-2xl object-cover w-full h-[213px] shadow-lg" />
          <img src={DUMMY_DATA.heroImages[1]} alt="Movie placeholder" className="rounded-b-2xl object-cover w-full mt-2 h-[250px] shadow-lg" />
        </div>
        <div className="space-y-4">
          <img src={DUMMY_DATA.heroImages[2]} alt="Movie placeholder" className="rounded-t-2xl object-cover w-full mb-2 h-[240px] shadow-lg" />
          <img src={DUMMY_DATA.heroImages[3]} alt="Movie placeholder" className="rounded-b-2xl object-cover w-full h-[223px] shadow-lg" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
