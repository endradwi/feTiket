import React from 'react'
import { Link, useLocation } from 'react-router'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function AdminLayout({ children }) {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-[#F5F6F8] font-sans">
      {/* Navbar Admn */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-12">
          <Link to="/">
            <img src="/logo.png" alt="Tickitz" className="h-8 w-auto object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link 
              to="/admin" 
              className={`${location.pathname === '/admin' ? 'text-[#003049] border-b-2 border-[#003049]' : 'text-slate-400 hover:text-[#003049]'} py-5 transition-colors`}
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/movies" 
              className={`${location.pathname === '/admin/movies' ? 'text-[#003049] border-b-2 border-[#003049]' : 'text-slate-400 hover:text-[#003049]'} py-5 transition-colors`}
            >
              Movie
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-slate-700 font-semibold text-sm">
            <span>Location</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="relative w-[180px] hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-10 pl-10 pr-4 bg-transparent outline-none text-sm font-medium" 
            />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop" 
              alt="Admin" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Small dedicated footer if needed, but the design doesn't show one */}
    </div>
  )
}
