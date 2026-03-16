import React, { useState } from 'react'
import { DUMMY_DATA } from '../../../data/dummy'
import MainLayout from '../../../layout/main'
import MoviesHero from './components/MoviesHero'
import MoviesFilter from './components/MoviesFilter'
import MoviesGrid from './components/MoviesGrid'

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
      <MoviesHero />
      <MoviesFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      <MoviesGrid movies={filteredMovies} />
    </MainLayout>
  )
}

