import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import { DUMMY_DATA } from '../../../../data/dummy'
import MovieCard from '../../../../shared/components/custom/movie-card'

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
            <MovieCard key={movie.id} movie={movie} />
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
