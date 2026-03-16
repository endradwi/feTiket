import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '../../../../shared/components/ui/Button'
import { Input } from '../../../../shared/components/ui/Input'

const MoviesFilter = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) => {
  const genres = ['All', 'Horror', 'Romantic', 'Adventure', 'Sci-Fi']

  return (
    <section className="px-8 py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
        <div className="w-full md:w-auto flex-1 max-w-sm">
          <p className="text-sm font-semibold mb-2">Cari Event</p>
          <Input 
            startContent={<Search className="w-4 h-4" />} 
            placeholder="Search Movie..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white h-12 rounded-xl border-slate-200 pl-10" 
          />
        </div>
        <div className="w-full md:w-auto">
          <p className="text-sm font-semibold mb-2">Filter</p>
          <div className="flex flex-wrap items-center gap-2">
            {genres.map((genre) => (
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
  )
}

export default MoviesFilter
