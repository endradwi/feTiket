import { useState, useEffect } from 'react'
import { ChevronDown, Edit, Trash2, Eye,  Loader2 } from 'lucide-react'
import { Button } from '../../shared/components/ui/Button'
import AdminLayout from '../../layout/AdminLayout'
import AdminMovieModal from './AdminMovieModal'
import apiClient, { BASE_URL } from '../../lib/api-client'
// import { format } from 'date-fns' // Removed to avoid build issues

export default function AdminMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: 1
  })

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/150'
    if (image.startsWith('http')) return image
    return `${BASE_URL}${image}`
  }

  const formatDuration = (durationStr) => {
    if (!durationStr) return '-'
    // Handle format HH:MM:SS.ms (e.g., 02:41:00 or 02:41:00.000000)
    const match = durationStr.match(/(\d+):(\d+):(\d+)/)
    if (match) {
      const hours = parseInt(match[1], 10)
      const minutes = parseInt(match[2], 10)
      let result = ""
      if (hours > 0) result += `${hours} jam `
      if (minutes > 0) result += `${minutes} menit`
      return result.trim() || "-"
    }
    return durationStr
  }

  const fetchMovies = async (page = 1) => {
    try {
      setLoading(true)
      const data = await apiClient.get(`/movies?page=${page}&limit=10`)
      setMovies(data.result)
      setPageInfo({
        currentPage: data.page_info.current_page,
        totalPage: data.page_info.total_page
      })
    } catch (err) {
      console.error('Failed to fetch movies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const handleAddMovie = () => {
    setEditingMovie(null)
    setIsModalOpen(true)
  }

  const handleEditMovie = (movie) => {
    setEditingMovie(movie)
    setIsModalOpen(true)
  }

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await apiClient.delete(`/movies/${id}`)
        fetchMovies(pageInfo.currentPage)
      } catch (err) {
        alert('Failed to delete movie: ' + (err.message || 'Error occurred'))
      }
    }
  }

  const handleSaveMovie = () => {
    setIsModalOpen(false)
    fetchMovies(pageInfo.currentPage)
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#5F2EEA] animate-spin" />
            <p className="text-slate-400 font-medium font-inter">Loading movies...</p>
          </div>
        ) : (
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
                    <td className="py-6 text-sm font-semibold text-slate-700 pl-4">
                      {(pageInfo.currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="py-6">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                        <img 
                          src={getImageUrl(movie.image)} 
                          alt={movie.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </td>
                    <td className="py-6 text-sm font-bold text-slate-900">{movie.title}</td>
                    <td className="py-6">
                      <div className="flex gap-2 flex-wrap">
                         {movie.genres?.map((g, i) => (
                           <span key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                             {g}{i < movie.genres.length - 1 ? ',' : ''}
                           </span>
                         ))}
                      </div>
                    </td>
                    <td className="py-6 text-sm font-semibold text-slate-500">
                      {movie.released_at ? new Date(movie.released_at).toLocaleDateString('en-GB') : '-'}
                    </td>
                    <td className="py-6 text-sm font-semibold text-slate-500">
                      {formatDuration(movie.duration)}
                    </td>
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

            {/* Pagination bar */}
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: pageInfo.totalPage }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => fetchMovies(page)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    pageInfo.currentPage === page 
                      ? 'bg-[#5F2EEA] text-white shadow-md shadow-[#5F2EEA]/20' 
                      : 'bg-white border border-slate-200 text-slate-400 hover:border-[#5F2EEA] hover:text-[#5F2EEA]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
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
