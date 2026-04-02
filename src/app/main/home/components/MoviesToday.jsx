import React, { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import MovieCard from '../../../../shared/components/custom/movie-card'
import apiClient from '../../../../lib/api-client'

const MoviesToday = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get('/movies')
        setMovies(response.result || [])
      } catch (err) {
        console.error("Failed to fetch movies:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <section className="px-8 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#003049] text-sm font-bold tracking-wider uppercase mb-3">Movies</p>
          <h2 className="text-3xl font-bold leading-tight">Exciting Movies That Should Be<br />Watched Today</h2>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#003049] animate-spin" />
            <p className="text-slate-500 font-medium">Fetching the latest movies...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.slice(0, 4).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 font-medium border-2 border-dashed border-slate-100 rounded-3xl">
            No movies currently showing. Check back later!
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button variant="ghost" className="text-[#003049] font-semibold hover:bg-[#003049]/5 hover:text-[#003049] rounded-lg">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </div>
    </section>
  )
}

export default MoviesToday
