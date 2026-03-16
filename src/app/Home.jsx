import React from 'react'
import { Link } from 'react-router'
import { CheckCircle2, Tag, Headphones, ArrowRight, ArrowLeft, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { DUMMY_DATA } from '../data/dummy'
import MainLayout from '../layout/main'

function Home() {
  // const navigate = useNavigate()

  // useEffect(() => {
  //   // Check if this is the first time accessing the app
  //   const hasVisited = localStorage.getItem('hasVisited_tickitz')
  //   const isLoggedIn = false // Placeholder for actual auth check
    
  //   if (!hasVisited && !isLoggedIn) {
  //     localStorage.setItem('hasVisited_tickitz', 'true')
  //     navigate('/register')
  //   }
  // }, [navigate])

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 py-16 gap-12 bg-white max-w-7xl mx-auto">
        <div className="flex-1 space-y-6">
          <p className="text-[#5F2EEA] text-xs md:text-sm font-bold tracking-wider uppercase">Movie Ticket Purchases #1 in Indonesia</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-800">
            Experience the Magic of<br />Cinema: Book Your Tickets<br />Today
          </h1>
          <p className="text-muted-foreground text-lg">Sign up and get the ticket with a lot of discount</p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-4 mt-12">
            <img src={DUMMY_DATA.heroImages[0]} alt="Movie placeholder" className="rounded-2xl object-cover w-full h-[220px] shadow-lg" />
            <img src={DUMMY_DATA.heroImages[1]} alt="Movie placeholder" className="rounded-2xl object-cover w-full h-[220px] shadow-lg" />
          </div>
          <div className="space-y-4">
            <img src={DUMMY_DATA.heroImages[2]} alt="Movie placeholder" className="rounded-2xl object-cover w-full h-[220px] shadow-lg" />
            <img src={DUMMY_DATA.heroImages[3]} alt="Movie placeholder" className="rounded-2xl object-cover w-full h-[220px] shadow-lg" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#5F2EEA] text-sm font-bold tracking-wider uppercase mb-3">Why Choose Us</p>
            <h2 className="text-3xl font-bold leading-tight">Unleashing the Ultimate Movie<br />Experience</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#5F2EEA]/10 flex items-center justify-center text-[#5F2EEA]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">Guaranteed</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#5F2EEA]/10 flex items-center justify-center text-[#5F2EEA]">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">Affordable</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
            </div>
            <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#5F2EEA]/10 flex items-center justify-center text-[#5F2EEA]">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl">24/7 Customer Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Today */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#5F2EEA] text-sm font-bold tracking-wider uppercase mb-3">Movies</p>
            <h2 className="text-3xl font-bold leading-tight">Exciting Movies That Should Be<br />Watched Today</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_DATA.nowShowingMovies.map(movie => (
              <div key={movie.id} className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col cursor-pointer transition-shadow hover:shadow-md">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-[#5F2EEA] text-white text-xs font-bold px-3 py-1 rounded-md opacity-0 transition-opacity">
                    RECOMMENDED
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6">
                    <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black rounded-lg">Details</Button>
                    <Button className="w-full bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white rounded-lg">Buy Ticket</Button>
                  </div>
                </div>
                <div className="p-5 text-center flex flex-col flex-1 justify-between">
                  <h3 className="font-bold text-lg mb-4">{movie.title}</h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                    {movie.genres.map(g => (
                      <span key={g} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-medium">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button variant="ghost" className="text-[#5F2EEA] font-semibold hover:bg-[#5F2EEA]/5 hover:text-[#5F2EEA] rounded-lg">View All <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="px-8 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-[#5F2EEA] text-sm font-bold tracking-wider uppercase mb-3">Upcoming Movies</p>
              <h2 className="text-3xl font-bold leading-tight">Exciting Movie Coming Soon</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-slate-200 text-slate-500 hover:text-[#5F2EEA] hover:border-[#5F2EEA] hover:bg-transparent"><ArrowLeft className="w-4 h-4" /></Button>
              <Button size="icon" className="w-10 h-10 rounded-full bg-[#5F2EEA] text-white hover:bg-[#5F2EEA]/90"><ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_DATA.upcomingMovies.map(movie => (
              <div key={movie.id} className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm flex flex-col">
                <div className="relative aspect-[3/4]">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                    <p className="text-[#5F2EEA] text-sm font-semibold mb-4">{movie.releaseDate}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-auto">
                    {movie.genres.map(g => (
                      <span key={g} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-medium">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home
