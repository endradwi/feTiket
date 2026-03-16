import React from 'react'

const MoviesHero = () => {
  return (
    <section className="relative h-[300px] flex items-center bg-slate-900 border-b border-slate-100 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop")', filter: 'brightness(0.4)' }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-white">
        <p className="text-[#FCBF49] text-xs font-bold tracking-wider uppercase mb-4">List Movie of the Week</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">
          Experience the Magic of Cinema: Book Your Tickets Today
        </h1>
      </div>
    </section>
  )
}

export default MoviesHero
