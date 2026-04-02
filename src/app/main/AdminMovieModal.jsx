import React, { useState, useEffect, useRef } from 'react'
import { X, Upload, Calendar, Clock, Plus, Loader2 } from 'lucide-react'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'
import apiClient, { BASE_URL } from '../../lib/api-client'
// import { format } from 'date-fns' // Removed to avoid build issues

export default function AdminMovieModal({ isOpen, onClose, onSave, editingMovie }) {
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState({
    genres: [],
    casters: [],
    cinemas: []
  })
  
  const [selectedFile, setSelectedFile] = useState(null)
  const getImageUrl = (image) => {
    if (!image) return null
    if (image.startsWith('http')) return image
    return `${BASE_URL}${image}`
  }
  const [previewUrl, setPreviewUrl] = useState(getImageUrl(editingMovie?.image))

  const [formData, setFormData] = useState({
    title: editingMovie?.title || '',
    genre_ids: editingMovie?.genre_ids || [], // Assuming backend returns IDs too, which I updated GetMovieById to populate
    caster_ids: editingMovie?.caster_ids || [],
    cinema_ids: editingMovie?.cinema_ids || [],
    released_at: editingMovie?.released_at ? new Date(editingMovie.released_at).toISOString().split('T')[0] : '',
    duration: editingMovie?.duration || '',
    director_name: editingMovie?.director_name || '',
    synopsis: editingMovie?.synopsis || '',
    recommendation: editingMovie?.recommendation || false
  })

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [genres, casters, cinemas] = await Promise.all([
          apiClient.get('/movies/genres'),
          apiClient.get('/movies/casters'),
          apiClient.get('/movies/cinemas')
        ])
        setMetadata({
          genres: genres.result,
          casters: casters.result,
          cinemas: cinemas.result
        })
      } catch (err) {
        console.error('Failed to fetch metadata:', err)
      }
    }
    if (isOpen) fetchMetadata()
  }, [isOpen])

  if (!isOpen) return null

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const toggleSelection = (field, id) => {
    setFormData(prev => {
      const current = prev[field]
      if (current.includes(id)) {
        return { ...prev, [field]: current.filter(item => item !== id) }
      } else {
        return { ...prev, [field]: [...current, id] }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('released_at', formData.released_at ? new Date(formData.released_at).toISOString() : '')
      data.append('duration', formData.duration)
      data.append('director_name', formData.director_name)
      data.append('synopsis', formData.synopsis)
      data.append('recommendation', String(formData.recommendation))
      
      formData.genre_ids.forEach(id => data.append('genre_ids', String(id)))
      formData.caster_ids.forEach(id => data.append('caster_ids', String(id)))
      formData.cinema_ids.forEach(id => data.append('cinema_ids', String(id)))
      
      if (selectedFile) {
        data.append('image', selectedFile)
      }

      if (editingMovie) {
        await apiClient.patch(`/movies/${editingMovie.id}`, data)
      } else {
        await apiClient.post('/movies', data)
      }
      
      onSave()
    } catch (err) {
      alert('Failed to save movie: ' + (err.message || 'Error occurred'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
               <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 cursor-pointer hover:border-[#5F2EEA] hover:bg-[#5F2EEA]/5 transition-all"
               >
                  {previewUrl ? (
                    <div className="w-full h-[200px] rounded-xl overflow-hidden relative">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#5F2EEA]/10 flex items-center justify-center text-[#5F2EEA] mb-4">
                        <Upload className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-bold text-slate-700 mb-2">Upload Image</p>
                      <p className="text-xs text-slate-400 mb-6 max-w-[180px]">Drop your image here, or browse. JPEG, PNG are supported.</p>
                      <Button type="button" className="bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white rounded-xl px-10">Browse</Button>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
               </div>

               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Movie Name</label>
                    <Input 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Spider-Man: Homecoming"
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Genres</label>
                    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                      {metadata.genres.map(genre => (
                        <button
                          key={genre.id}
                          type="button"
                          onClick={() => toggleSelection('genre_ids', genre.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            formData.genre_ids.includes(genre.id)
                              ? 'bg-[#5F2EEA] text-white shadow-md'
                              : 'bg-white text-slate-400 border border-slate-200 hover:border-[#5F2EEA]'
                          }`}
                        >
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">Release Date</label>
                      <div className="relative">
                        <Input 
                            type="date"
                            value={formData.released_at}
                            onChange={(e) => setFormData({...formData, released_at: e.target.value})}
                            className="bg-slate-50 border-slate-200 h-12 rounded-xl pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">Duration (e.g. 2h 13m)</label>
                      <Input 
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="2h 13m" 
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl" 
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Director Name</label>
                  <Input 
                      value={formData.director_name}
                      onChange={(e) => setFormData({...formData, director_name: e.target.value})}
                      placeholder="e.g. Jon Watts"
                      className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                  />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Casters</label>
                  <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {metadata.casters.map(caster => (
                      <button
                        key={caster.id}
                        type="button"
                        onClick={() => toggleSelection('caster_ids', caster.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          formData.caster_ids.includes(caster.id)
                            ? 'bg-[#5F2EEA] text-white shadow-md'
                            : 'bg-white text-slate-400 border border-slate-200 hover:border-[#5F2EEA]'
                        }`}
                      >
                        {caster.name}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Synopsis</label>
                  <textarea 
                      value={formData.synopsis}
                      onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#5F2EEA]/20"
                      placeholder="Write brief movie story..."
                  ></textarea>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Select Cinemas</label>
                  <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                    {metadata.cinemas.map(cinema => (
                      <button
                        key={cinema.id}
                        type="button"
                        onClick={() => toggleSelection('cinema_ids', cinema.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          formData.cinema_ids.includes(cinema.id)
                            ? 'bg-[#5F2EEA] text-white shadow-md'
                            : 'bg-white text-slate-400 border border-slate-200 hover:border-[#5F2EEA]'
                        }`}
                      >
                        {cinema.cinema_name} ({cinema.location_name})
                      </button>
                    ))}
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="recommendation"
                    checked={formData.recommendation}
                    onChange={(e) => setFormData({...formData, recommendation: e.target.checked})}
                    className="w-5 h-5 accent-[#5F2EEA]"
                  />
                  <label htmlFor="recommendation" className="text-sm font-bold text-slate-700">Set as Recommendation</label>
               </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end">
             <Button 
              type="submit" 
              disabled={loading}
              className="w-full lg:w-[300px] h-14 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-2xl shadow-xl shadow-[#5F2EEA]/30 disabled:opacity-50"
             >
                {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Save Movie'}
             </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
