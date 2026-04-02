import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { CalendarDays, Clock, MapPin, ChevronDown, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setBookingDetails } from '../../store/bookingSlice'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'
import { DUMMY_DATA } from '../../data/dummy'
import MainLayout from '../../layout/main'
import apiClient from '../../lib/api-client'

export default function MovieDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Formatting Helpers
  const formatDate = (dateString) => {
    if (!dateString) return "No release date"
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(dateString))
    } catch {
      return dateString
    }
  }

  const formatDuration = (durationString) => {
    if (!durationString) return "N/A"
    try {
      const parts = durationString.split(':')
      const h = parseInt(parts[0])
      const m = parseInt(parts[1])
      if (isNaN(h) || isNaN(m)) return durationString
      return `${h > 0 ? `${h} hours ` : ""}${m} minutes`
    } catch {
      return durationString
    }
  }
  
  const [selectedCinema, setSelectedCinema] = useState(null)
  
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  
  const [availableLocations, setAvailableLocations] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [availableTimes, setAvailableTimes] = useState([])
  
  const [filteredCinemas, setFilteredCinemas] = useState([])

  const fetchMovieDetail = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      
      // Build query string
      const queryParams = new URLSearchParams()
      if (params.location_id) queryParams.append('location_id', params.location_id)
      if (params.date) queryParams.append('date', params.date)
      if (params.time) queryParams.append('time', params.time)
      
      const url = `/movies/${id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await apiClient.get(url)
      const result = response.result
      
      if (result) {
        // Map API fields to UI state
        setMovie({
          ...result,
          posterImage: result.image,
          bannerImage: result.image,
          releaseDate: formatDate(result.released_at),
          directedBy: result.director_name,
          duration: formatDuration(result.duration),
          casts: result.casters ? result.casters.join(", ") : result.caster_name,
          genres: result.genres && result.genres.length > 0 ? result.genres : [result.genre_name]
        })

        setFilteredCinemas(result.cinemas || [])

        // Extract available filters from initial or current results
        if (result.cinemas) {
          const locations = [...new Set(result.cinemas.map(c => c.location_name))].filter(Boolean)
          const dates = [...new Set(result.cinemas.flatMap(c => c.showtimes?.map(s => s.show_date)))].filter(Boolean).sort()
          const times = [...new Set(result.cinemas.flatMap(c => c.showtimes?.map(s => s.show_time)))].filter(Boolean).sort()
          
          if (availableLocations.length === 0) setAvailableLocations(locations)
          if (availableDates.length === 0) setAvailableDates(dates)
          if (availableTimes.length === 0) setAvailableTimes(times)
        }
      } else {
        setError("Movie data not found.")
      }
    } catch (err) {
      console.error("Failed to fetch movie details:", err)
      setError("Movie not found or server error.")
    } finally {
      setLoading(false)
    }
  }, [id, availableLocations.length, availableDates.length, availableTimes.length])

  useEffect(() => {
    fetchMovieDetail()
    window.scrollTo(0, 0)
  }, [fetchMovieDetail])

  const handleFilter = () => {
    fetchMovieDetail({
      location_id: selectedLocation,
      date: selectedDate,
      time: selectedTime
    })
    setSelectedCinema(null)
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white">
          <Loader2 className="w-12 h-12 text-[#003049] animate-spin" />
          <p className="text-slate-500 font-bold text-lg animate-pulse">Loading movie details...</p>
        </div>
      </MainLayout>
    )
  }

  if (error || !movie) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-white px-8 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{error || "Movie Not Found"}</h2>
          <p className="text-slate-500 max-w-md">We couldn't find the movie you're looking for. It might have been removed or the link is incorrect.</p>
          <Button onClick={() => navigate('/')} className="bg-[#003049] hover:bg-[#003049]/90 text-white px-8 rounded-xl font-bold">
            Back to Home
          </Button>
        </div>
      </MainLayout>
    )
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
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent"></div>
      </section>

      {/* Main Content Area */}
      <section className="px-8 pb-20 bg-white relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 relative -mt-32 md:-mt-48 z-10">
          
          {/* Poster Column */}
          {/* <div className="w-[200px] md:w-[280px] shrink-0 mx-auto md:mx-0"> */}
            <div className="absolute -top-20 rounded-2xl overflow-hidden shadow-xl bg-white p-4 border border-slate-100">
              <img 
                src={movie.posterImage} 
                alt={movie.title} 
                className="w-full  size-96 object-cover rounded-xl"
              />
            </div>
          {/* </div> */}

          {/* Details Column */}
          <div className="flex-1 pt-4 md:pt-8 md:pl-80">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center md:text-left">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
              {movie.genres.map(g => (
                <span key={g} className="px-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-full text-sm font-medium">{g}</span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-8 max-w-2xl mb-20">
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
            <div className="mb-16 -ml-72">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Synopsis</h3>
              <p className="text-slate-500 leading-relaxed max-w-7xl">
                {movie.synopsis}
              </p>
            </div>
            
            {/* Book Tickets */}
            <div className='-ml-72'>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Tickets</h3>
              
              <div className="flex flex-col md:flex-row items-end gap-4 mb-8">
                <div className="w-full md:flex-1">
                  <p className="text-sm font-semibold mb-2 text-slate-900">Choose Date</p>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <select 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003049]/20"
                    >
                      <option value="">Select Date</option>
                      {availableDates.map(date => (
                        <option key={date} value={date}>{date}</option>
                      ))}
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
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003049]/20"
                    >
                      <option value="">Select Time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
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
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full h-12 pl-10 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003049]/20"
                    >
                      <option value="">Select Location</option>
                      {availableLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleFilter}
                  className="w-full md:w-auto h-12 px-8 bg-[#003049] hover:bg-[#003049]/90 text-white font-medium rounded-xl"
                >
                  Filter
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <h4 className="font-bold text-slate-900">Choose Cinema</h4>
                <span className="text-[#003049] text-xs font-semibold bg-[#003049]/10 px-3 py-1 rounded-full">{filteredCinemas.length} Result</span>
              </div>

              {/* Cinemas Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {filteredCinemas.length > 0 ? (
                  filteredCinemas.map((cinema, idx) => (
                    <div 
                      key={`${cinema.cinema_id}-${idx}`}
                      onClick={() => setSelectedCinema(cinema.cinema_id)}
                      className={`cursor-pointer rounded-2xl border flex items-center justify-center p-6 h-24 transition-all ${
                        selectedCinema === cinema.cinema_id 
                          ? 'bg-[#003049] border-[#003049] shadow-md' 
                          : 'bg-white border-slate-200 hover:border-[#003049]/50 hover:bg-slate-50'
                      }`}
                    >
                      <img 
                        src={cinema.cinema_image} 
                        alt={cinema.cinema_name} 
                        className={`h-8 object-contain ${selectedCinema === cinema.cinema_id ? 'brightness-0 invert' : ''}`}
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
                <Button size="icon" className="w-10 h-10 rounded-full bg-[#003049] text-white hover:bg-[#003049]/90">1</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">2</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">3</Button>
                <Button size="icon" variant="outline" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#003049] hover:border-[#003049] hover:bg-white bg-white">4</Button>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center max-w-sm mx-auto">
                <Button 
                  onClick={() => {
                    const c = filteredCinemas.find(ci => ci.cinema_id === selectedCinema)
                    if (selectedDate && selectedTime && c) {
                      const showtime = c.showtimes.find(st => st.show_date === selectedDate && st.show_time === selectedTime)
                      dispatch(setBookingDetails({
                        movie: movie,
                        cinema: {
                          ...c,
                          id: c.cinema_id,
                          name: c.cinema_name,
                          logo: c.cinema_image
                        },
                        showtime_id: showtime ? showtime.showtime_id : null,
                        price: showtime ? showtime.price : 0,
                        date: selectedDate,
                        time: selectedTime
                      }))
                      navigate(`/order/${movie.id}`)
                    }
                  }}
                  className="w-full h-14 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#003049]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedCinema || !selectedDate || !selectedTime}
                >
                  Book Now
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
