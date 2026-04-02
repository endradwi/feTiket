import React, { useState, useEffect } from 'react'
import MainLayout from '../../../layout/main'
import MoviesHero from './components/MoviesHero'
import MoviesFilter from './components/MoviesFilter'
import MoviesGrid from './components/MoviesGrid'
import apiClient from '../../../lib/api-client'
import { Loader2 } from 'lucide-react'

export default function Movie() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get('/movies')
        setMovies(response.result || [])
      } catch (err) {
        console.error("Failed to fetch movies list:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  // Search Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1) // Reset to first page on search
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter and Paginate movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesFilter = activeFilter === "All" ? true : movie.genres?.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  return (
    <MainLayout>
      <MoviesHero />
      <MoviesFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeFilter={activeFilter} 
        setActiveFilter={(filter) => {
          setActiveFilter(filter)
          setCurrentPage(1) // Reset to first page on filter change
        }} 
      />
      
      {loading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-slate-50 gap-4">
          <Loader2 className="w-10 h-10 text-[#003049] animate-spin" />
          <p className="text-slate-500 font-medium">Updating movie list...</p>
        </div>
      ) : (
        <MoviesGrid 
          movies={currentItems} 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </MainLayout>
  )
}

