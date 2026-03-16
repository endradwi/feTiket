import React, { useState } from 'react'
import { ChevronDown, Edit, Trash2, Eye, Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import AdminLayout from '../../layout/AdminLayout'
import AdminMovieModal from './AdminMovieModal'
import { DUMMY_DATA } from '../../data/dummy'

export default function AdminMovies() {
  const [movies, setMovies] = useState(DUMMY_DATA.movieList)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)

  const handleAddMovie = () => {
    setEditingMovie(null)
    setIsModalOpen(true)
  }

  const handleEditMovie = (movie) => {
    setEditingMovie(movie)
    setIsModalOpen(true)
  }

  const handleDeleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id))
    }
  }

  const handleSaveMovie = (movieData) => {
    if (editingMovie) {
      setMovies(movies.map(m => m.id === editingMovie.id ? { ...m, ...movieData } : m))
    } else {
      setMovies([...movies, { id: Date.now(), ...movieData }])
    }
    setIsModalOpen(false)
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[600px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <h2 className="text-xl font-bold text-slate-800">List Movie</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-semibold cursor-pointer">
              <span>November 2022</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <Button 
                onClick={handleAddMovie}
                className="bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl h-[44px] px-8 flex items-center gap-2 shadow-lg shadow-[#5F2EEA]/30"
            >
              Add Movies
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100 pb-4">
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">No</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Thumbnail</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Movie Name</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Release Date</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                <th className="pb-6 text-xs font-bold text-slate-400 uppercase tracking-widest pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {movies.map((movie, index) => (
                <tr key={movie.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 text-sm font-semibold text-slate-700 pl-4">{index + 1}</td>
                  <td className="py-6">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                      <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-6 text-sm font-bold text-slate-900">{movie.title}</td>
                  <td className="py-6">
                    <div className="flex gap-2">
                       {movie.genres?.map(g => (
                         <span key={g} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{g}{index < movie.genres.length - 1 ? ',' : ''}</span>
                       ))}
                    </div>
                  </td>
                  <td className="py-6 text-sm font-semibold text-slate-500">{movie.releaseDate || '07/07/2023'}</td>
                  <td className="py-6 text-sm font-semibold text-slate-500">{movie.duration || '2 Hours 13 Minutes'}</td>
                  <td className="py-6 pr-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-[#5F2EEA] text-white flex items-center justify-center hover:bg-[#5F2EEA]/90 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditMovie(movie)}
                        className="w-8 h-8 rounded-lg bg-white border border-[#5F2EEA] text-[#5F2EEA] flex items-center justify-center hover:bg-[#5F2EEA]/10 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="w-8 h-8 rounded-lg bg-[#D62828] text-white flex items-center justify-center hover:bg-[#D62828]/90 transition-colors shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="flex justify-center mt-12 gap-2">
           <button className="w-10 h-10 rounded-xl bg-[#5F2EEA] text-white font-bold text-sm shadow-md shadow-[#5F2EEA]/20">1</button>
           <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 font-bold text-sm hover:border-[#5F2EEA] hover:text-[#5F2EEA]">2</button>
           <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 font-bold text-sm hover:border-[#5F2EEA] hover:text-[#5F2EEA]">3</button>
           <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-400 font-bold text-sm hover:border-[#5F2EEA] hover:text-[#5F2EEA]">4</button>
        </div>
      </div>

      {isModalOpen && (
        <AdminMovieModal 
          key={editingMovie ? `edit-${editingMovie.id}` : 'add-new'}
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveMovie}
          editingMovie={editingMovie}
        />
      )}
    </AdminLayout>
  )
}
