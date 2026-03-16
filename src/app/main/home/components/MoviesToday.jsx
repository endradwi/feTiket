import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import { DUMMY_DATA } from '../../../../data/dummy'

const MoviesToday = () => {
  return (
    <section className="px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#003049] text-sm font-bold tracking-wider uppercase mb-3">Movies</p>
          <h2 className="text-3xl font-bold leading-tight">Exciting Movies That Should Be<br />Watched Today</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUMMY_DATA.nowShowingMovies.map(movie => (
            <div key={movie.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md">
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
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="ghost" className="text-[#003049] font-semibold hover:bg-[#003049]/5 hover:text-[#003049] rounded-lg">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </div>
    </section>
  )
}

export default MoviesToday
