import React from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/Button'

function MovieCard({ movie }) {
  return (
     <div className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md">
              <div className="relative aspect-3/4 overflow-hidden">
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-[#003049] text-white text-xs font-bold px-3 py-1 rounded-md opacity-0 transition-opacity">
                  RECOMMENDED
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6">
                  <Link to={`/movie/${movie.id}`} className="w-full">
                    <Button variant="outline" className="w-full text-white border-white bg-transparent hover:bg-white hover:text-black rounded-lg">Details</Button>
                  </Link>
                  <Button className="w-full bg-[#003049] hover:bg-[#003049]/90 text-white rounded-lg">Buy Ticket</Button>
                </div>
              </div>
              <div className="p-5 text-center flex flex-col flex-1 justify-between">
                <h3 className="font-bold text-lg mb-4">{movie.title}</h3>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                  {movie.genres.map(g => (
                    <span key={g} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-medium">{g}</span>
                  ))}
                </div>
              </div>
            </div>
  )
}

export default MovieCard