import React, { useState } from 'react'
import { X, Upload, Calendar, Clock, Plus } from 'lucide-react'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'

export default function AdminMovieModal({ isOpen, onClose, onSave, editingMovie }) {
  const [formData, setFormData] = useState({
    title: editingMovie?.title || '',
    genres: editingMovie?.genres || [],
    releaseDate: editingMovie?.releaseDate || '',
    duration: editingMovie?.duration || '',
    directedBy: editingMovie?.directedBy || '',
    casts: editingMovie?.casts || '',
    synopsis: editingMovie?.synopsis || '',
    image: editingMovie?.image || 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop',
    location: editingMovie?.location || 'Purwokerto, Bandung, Bekasi',
    showtimes: editingMovie?.showtimes || ['08:30am', '10:30pm']
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
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
               <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50">
                  <div className="w-16 h-16 rounded-full bg-[#5F2EEA]/10 flex items-center justify-center text-[#5F2EEA] mb-4">
                     <Upload className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-2">Upload Image</p>
                  <p className="text-xs text-slate-400 mb-6 max-w-[180px]">Drop your image here, or browse. JPEG, PNG are supported.</p>
                  <Button type="button" className="bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white rounded-xl px-10">Browse</Button>
               </div>

               <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Movie Name</label>
                    <Input 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Spider-Man: Homecoming"
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-500 mb-2">Category (comma separated)</label>
                    <Input 
                        value={formData.genres.join(', ')}
                        onChange={(e) => setFormData({...formData, genres: e.target.value.split(',').map(s => s.trim())})}
                        placeholder="e.g. Action, Adventure, Sci-Fi"
                        className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">Release Date</label>
                      <div className="relative">
                        <Input 
                            value={formData.releaseDate}
                            onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                            placeholder="07/07/2023"
                            className="bg-slate-50 border-slate-200 h-12 rounded-xl pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-500 mb-2">Duration (H/M)</label>
                      <div className="flex gap-2">
                        <Input placeholder="2" className="bg-slate-50 border-slate-200 h-12 rounded-xl text-center" />
                        <Input placeholder="13" className="bg-slate-50 border-slate-200 h-12 rounded-xl text-center" />
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Director Name</label>
                  <Input 
                      value={formData.directedBy}
                      onChange={(e) => setFormData({...formData, directedBy: e.target.value})}
                      placeholder="e.g. Jon Watts"
                      className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                  />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Cast</label>
                  <Input 
                      value={formData.casts}
                      onChange={(e) => setFormData({...formData, casts: e.target.value})}
                      placeholder="e.g. Tom Holland, Michael Keaton..."
                      className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                  />
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
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Add Location</label>
                  <Input 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="bg-slate-50 border-slate-200 h-12 rounded-xl"
                  />
               </div>
               <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Set Date & Time</label>
                  <div className="flex items-center gap-4">
                     <div className="relative flex-1">
                        <Input placeholder="Set a date" className="bg-slate-50 border-slate-200 h-10 rounded-xl pl-10 text-xs" />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                     </div>
                     <button type="button" className="w-10 h-10 rounded-xl border border-[#5F2EEA] text-[#5F2EEA] flex items-center justify-center hover:bg-[#5F2EEA]/10">
                        <Plus className="w-5 h-5" />
                     </button>
                     <div className="flex gap-2">
                        {formData.showtimes.map(time => (
                           <div key={time} className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600">{time}</div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end">
             <Button type="submit" className="w-full lg:w-[300px] h-14 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-2xl shadow-xl shadow-[#5F2EEA]/30">
                Save Movie
             </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
