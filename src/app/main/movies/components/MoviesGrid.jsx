import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import MovieCard from '../../../../shared/components/custom/movie-card'

const MoviesGrid = ({ movies }) => {
  return (
    <section className="px-8 py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-slate-500 font-medium">
              No movies found matching your criteria.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <Button size="icon" className="w-10 h-10 rounded-full bg-[#003049] text-white hover:bg-[#003049]/90">1</Button>
          <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">2</Button>
          <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">3</Button>
          <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">4</Button>
          <Button size="icon" className="w-10 h-10 rounded-full bg-[#003049] text-white hover:bg-[#003049]/90 ml-2"><ArrowRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </section>
  )
}

export default MoviesGrid
