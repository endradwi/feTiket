import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Instagram, Twitter, Facebook, Youtube, LogOut, Search } from 'lucide-react'
import { Button } from '../shared/components/ui/Button'
import { DUMMY_DATA } from '../data/dummy'
import { getCookie, removeCookie } from '../lib/cookies'
import apiClient from '../lib/api-client'

export default function MainLayout({ children }) {
  const location = useLocation()
  const [userData, setUserData] = useState(null)
  
  const userId = getCookie("userId")
  const token = getCookie("access_token")

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && token) {
        try {
          const response = await apiClient.get(`/users/${userId}`)
          setUserData(response.result)
        } catch (err) {
          console.error("Failed to fetch user data:", err)
        }
      }
    }

    fetchUser()
  }, [userId, token])

  const handleLogout = () => {
    removeCookie("access_token")
    removeCookie("userId")
    setUserData(null)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#FCBF49] text-slate-900 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <Link to="/">
          <img src="/logo.png" alt="Tickitz" className="h-8 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link to="/" className={`${location.pathname === '/' ? 'text-[#003049] border-b-2 border-[#003049]' : 'text-muted-foreground hover:text-[#003049]'} py-1 transition-colors`}>Home</Link>
          <Link to="/movie" className={`${location.pathname === '/movie' ? 'text-[#003049] border-b-2 border-[#003049]' : 'text-muted-foreground hover:text-[#003049]'} py-1 transition-colors`}>Movie</Link>
          <Link to="#" className="text-muted-foreground hover:text-[#003049] py-1 transition-colors">Buy Ticket</Link>
        </div>
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-6">
              <button className="text-muted-foreground hover:text-[#003049] transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <img 
                    src={userData?.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="icon"
                  className="text-muted-foreground hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="w-[100px] text-[#003049] border-[#003049] hover:bg-[#003049]/10 font-semibold rounded-lg">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="w-[100px] bg-[#003049] hover:bg-[#003049]/90 text-white font-semibold rounded-lg">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Newsletter Section */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#003049] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 relative z-10">Subscribe to our newsletter</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto relative z-10">
              <input type="text" placeholder="First name" className="w-full md:w-auto flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 placeholder-white/70 outline-none focus:bg-white/20 transition-colors text-white text-sm" />
              <input type="email" placeholder="Email address" className="w-full md:w-auto flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 placeholder-white/70 outline-none focus:bg-white/20 transition-colors text-white text-sm" />
              <Button className="w-full md:w-auto bg-white text-[#003049] hover:bg-white/90 rounded-xl h-auto py-3.5 px-6 font-semibold shadow-lg">Subscribe Now</Button>
            </div>
            {/* decorative curves */}
            <div className="absolute -bottom-32 -right-32 w-80 h-80 border-24 border-white/10 rounded-full"></div>
            <div className="absolute -top-32 -left-32 w-80 h-80 border-24 border-white/10 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <img src="/logo.png" alt="Tickitz" className="h-10 text-[#003049]" style={{filter: 'brightness(0) saturate(100%) invert(24%) sepia(50%) saturate(6015%) hue-rotate(251deg) brightness(85%) contrast(98%)'}} />
              <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs leading-relaxed">
                Stop waiting in line. Buy tickets conveniently, watch movies quietly.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                <li><Link to="#" className="hover:text-[#003049] transition-colors">Cinemas</Link></li>
                <li><Link to="/movie" className="hover:text-[#003049] transition-colors">Movies List</Link></li>
                <li><Link to="#" className="hover:text-[#003049] transition-colors">My Ticket</Link></li>
                <li><Link to="#" className="hover:text-[#003049] transition-colors">Notification</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-6">Our Sponsor</h4>
              <ul className="space-y-4">
                {DUMMY_DATA.sponsors.map(s => (
                  <li key={s.id}>
                    <img src={s.logo} alt={s.name} className="h-6 object-contain" style={{filter: 'grayscale(100%)'}} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-6">Follow us</h4>
              <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                <li><a href="#" className="flex items-center gap-3 hover:text-[#003049] transition-colors"><Instagram className="w-5 h-5"/> Tickitz Cinema id</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-[#003049] transition-colors"><Twitter className="w-5 h-5"/> tickitz.id</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-[#003049] transition-colors"><Facebook className="w-5 h-5"/> tickitz.id</a></li>
                <li><a href="#" className="flex items-center gap-3 hover:text-[#003049] transition-colors"><Youtube className="w-5 h-5"/> Tickitz Cinema id</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm font-medium pt-8 border-t border-slate-100">
            © 2026 Tickitz. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
