import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { CalendarDays, Clock, MapPin, ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { DUMMY_DATA } from '../data/dummy'
import MainLayout from '../layout/main'

export default function MovieDetail() {
  useParams() // In a real app we'd use id here
  // In a real app, we would fetch the exact movie using the ID. 
  // For now, we use the single detailed mock object.
  const movie = DUMMY_DATA.movieDetails
  const cinemas = DUMMY_DATA.cinemas
  
  const [selectedCinema, setSelectedCinema] = useState(null)
  
  const [date, setDate] = useState('21/07/28')
  const [time, setTime] = useState('08 : 30 AM')
  const [location, setLocation] = useState('Purwokerto')
  
  const [filteredCinemas, setFilteredCinemas] = useState(cinemas)

  // Initial filter sync
  useEffect(() => {
    handleFilter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = () => {
    // filter cinemas by location
    const result = cinemas.filter(c => c.location.toLowerCase() === location.toLowerCase())
    setFilteredCinemas(result.length > 0 ? result : [])
    setSelectedCinema(null)
  }

  return (
    <MainLayout>
      {/* Banner Section */}
      <section className="relative h-[300px] md:h-[400px] w-full bg-slate-900 overflow-hidden">
        <img 
          src={movie.bannerImage} 
          alt="Banner" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradients to fade smoothly into content below */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content Area */}
      <section className="px-8 pb-20 bg-white relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 relative -mt-32 md:-mt-48 z-10">
          
          {/* Poster Column */}
          <div className="w-[200px] md:w-[280px] shrink-0 mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4 border border-slate-100">
              <img 
                src={movie.posterImage} 
                alt={movie.title} 
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 pt-4 md:pt-[240px]">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center md:text-left">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
              {movie.genres.map(g => (
                <span key={g} className="px-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-full text-sm font-medium">{g}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 max-w-2xl mb-10">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Release date</p>
                <p className="font-semibold text-slate-900">{movie.releaseDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Directed by</p>
                <p className="font-semibold text-slate-900">{movie.directedBy}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Duration</p>
                <p className="font-semibold text-slate-900">{movie.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Casts</p>
                <p className="font-semibold text-slate-900">{movie.casts}</p>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Synopsis</h3>
              <p className="text-slate-500 leading-relaxed max-w-3xl">
                {movie.synopsis}
              </p>
            </div>
            
            {/* Book Tickets */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Tickets</h3>
              
              <div className="flex flex-col md:flex-row items-end gap-4 mb-8">
                <div className="w-full md:flex-1">
                  <p className="text-sm font-semibold mb-2 text-slate-900">Choose Date</p>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <select 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5F2EEA]/20"
                    >
                      <option value="21/07/28">21/07/28</option>
                      <option value="22/07/28">22/07/28</option>
                      <option value="23/07/28">23/07/28</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:flex-1">
                  <p className="text-sm font-semibold mb-2 text-slate-900">Choose Time</p>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5F2EEA]/20"
                    >
                      <option value="08 : 30 AM">08 : 30 AM</option>
                      <option value="10 : 30 AM">10 : 30 AM</option>
                      <option value="12 : 30 PM">12 : 30 PM</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:flex-1">
                  <p className="text-sm font-semibold mb-2 text-slate-900">Choose Location</p>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5F2EEA]/20"
                    >
                      <option value="Purwokerto">Purwokerto</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Bandung">Bandung</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleFilter}
                  className="w-full md:w-auto h-12 px-8 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-medium rounded-xl"
                >
                  Filter
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <h4 className="font-bold text-slate-900">Choose Cinema</h4>
                <span className="text-[#5F2EEA] text-xs font-semibold bg-[#5F2EEA]/10 px-3 py-1 rounded-full">{filteredCinemas.length} Result</span>
              </div>

              {/* Cinemas Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {filteredCinemas.length > 0 ? (
                  filteredCinemas.map((cinema, idx) => (
                  <div 
                    key={`${cinema.id}-${idx}`}
                    onClick={() => setSelectedCinema(cinema.id)}
                    className={`cursor-pointer rounded-2xl border flex items-center justify-center p-6 h-24 transition-all ${
                      selectedCinema === cinema.id 
                        ? 'bg-[#5F2EEA] border-[#5F2EEA] shadow-md' 
                        : 'bg-white border-slate-200 hover:border-[#5F2EEA]/50 hover:bg-slate-50'
                    }`}
                  >
                    <img 
                      src={cinema.logo} 
                      alt={cinema.name} 
                      className={`h-8 object-contain ${selectedCinema === cinema.id ? 'brightness-0 invert' : ''}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-6 text-center text-slate-500 font-medium">
                  No cinemas available for this location.
                </div>
              )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mb-12">
                <Button size="icon" className="w-10 h-10 rounded-full bg-[#5F2EEA] text-white hover:bg-[#5F2EEA]/90">1</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#5F2EEA] hover:border-[#5F2EEA] hover:bg-white bg-white">2</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#5F2EEA] hover:border-[#5F2EEA] hover:bg-white bg-white">3</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#5F2EEA] hover:border-[#5F2EEA] hover:bg-white bg-white">4</Button>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center max-w-sm mx-auto">
                <Link to={`/order/${movie.id}?cinema=${selectedCinema}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&loc=${encodeURIComponent(location)}`} className={`w-full ${!selectedCinema ? 'pointer-events-none' : ''}`}>
                  <Button 
                    className="w-full h-14 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#5F2EEA]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedCinema}
                  >
                    Book Now
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
