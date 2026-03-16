import React, { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'
import { DUMMY_DATA } from '../../data/dummy'
import MainLayout from '../../layout/main'
import { Link } from 'react-router'

export default function Movie() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  
  const filteredMovies = DUMMY_DATA.movieList.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === "All" ? true : movie.genres.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center bg-slate-900 border-b border-slate-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop")', filter: 'brightness(0.4)' }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-white">
          <p className="text-[#003049] text-xs font-bold tracking-wider uppercase mb-4">List Movie of the Week</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="px-8 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="w-full md:w-auto flex-1 max-w-sm">
            <p className="text-sm font-semibold mb-2">Cari Event</p>
            <Input 
              startContent={<Search className="w-4 h-4" />} 
              placeholder="Search Movie..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white h-12 rounded-xl border-slate-200" 
            />
          </div>
          <div className="w-full md:w-auto">
            <p className="text-sm font-semibold mb-2">Filter</p>
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Horror', 'Romantic', 'Adventure', 'Sci-Fi'].map((genre) => (
                <Button 
                  key={genre}
                  onClick={() => setActiveFilter(genre)}
                  variant={activeFilter === genre ? 'solid' : 'outline'} 
                  className={activeFilter === genre 
                    ? "bg-[#003049] hover:bg-[#003049]/90 text-white rounded-xl h-10 px-6" 
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100 rounded-xl h-10 px-6"}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="px-8 py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
              <div key={`${movie.id}-${index}`} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md">
                <div className="relative aspect-3/4 overflow-hidden">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-[#003049] text-white text-xs font-bold px-3 py-1 rounded-md opacity-0 transition-opacity">
                    RECOMMENDED
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6">
                    <Link to={`/movie/${movie.id}`} className="w-full">
                      <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black rounded-lg">Details</Button>
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
    </MainLayout>
  )
}
