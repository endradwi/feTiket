import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import apiClient from '../../../../lib/api-client'

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get('/movies')
        // Using same movies list but could filter by 'upcoming' if API supported it
        setMovies(response.result || [])
      } catch (err) {
        console.error("Failed to fetch upcoming movies:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <section className="px-8 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-[#003049] text-sm font-bold tracking-wider uppercase mb-3">Upcoming Movies</p>
            <h2 className="text-3xl font-bold leading-tight">Exciting Movie Coming Soon</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-transparent"><ArrowLeft className="w-4 h-4" /></Button>
            <Button size="icon" className="w-10 h-10 rounded-full bg-[#003049] text-white hover:bg-[#003049]/90"><ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#003049] animate-spin" />
            <p className="text-slate-500 font-medium">Loading upcoming movies...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.slice(0, 4).map(movie => (
              <div key={movie.id} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col transition-all hover:shadow-md">
                <div className="relative aspect-3/4 overflow-hidden">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5 text-center flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                    <p className="text-[#003049] text-sm font-semibold mb-4">{movie.releaseDate || 'December 2024'}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                    {movie.genres?.map(g => (
                      <span key={g} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-medium">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 font-medium border-2 border-dashed border-slate-200 rounded-3xl">
            Stay tuned for news about upcoming movies!
          </div>
        )}
      </div>
    </section>
  )
}

export default UpcomingMovies
