import React from 'react'
import { Link, useNavigate } from 'react-router'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '../components/ui/Button'
import MainLayout from '../layout/main'
import { DUMMY_DATA } from '../data/dummy'

export default function Ticket() {
  const navigate = useNavigate()
  
  // Dummy data for this page since we don't have real fetch yet
  const movie = DUMMY_DATA.movieDetails
  
  // Mock booking data
  const bookingData = {
    movieTitle: movie.title,
    date: '07 Jul',
    time: '2:00pm',
    category: 'PG-13',
    count: '3 pcs',
    seats: 'C4, C5, C6',
    total: '$30.00',
    bookingId: 'BK-12321328913829724'
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-[calc(100vh-80px)] md:py-16 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white md:rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Side: Success Image & Text */}
          <div className="md:w-[55%] relative flex flex-col justify-center p-12 text-white">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: 'url("https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop")',
                filter: 'brightness(0.3)'
              }}
            ></div>
            
            <div className="relative z-10 max-w-md">
              <img src="/logo.png" alt="Tickitz" className="h-10 mb-8 brightness-0 invert" />
              <h1 className="text-4xl font-bold mb-4 leading-tight">Thankyou For Purchasing</h1>
              <p className="text-slate-300 mb-10 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor integer sed magna et.
              </p>
              
              <div className="flex items-center gap-2 text-sm font-semibold hover:text-slate-200 cursor-pointer transition-colors w-max">
                Please Download Your Ticket <span className="text-lg leading-none">→</span>
              </div>
            </div>
          </div>

          {/* Right Side: The Ticket */}
          <div className="md:w-[45%] bg-[#F5F6F8] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden">
             <div className="w-full max-w-sm">
                
                {/* Top Part of Ticket (QR Code) */}
                <div className="bg-white rounded-t-2xl p-8 flex justify-center items-center relative shadow-sm border-b-2 border-dashed border-slate-200">
                   <QRCodeSVG 
                      value={bookingData.bookingId} 
                      size={160}
                      level={"L"}
                      includeMargin={false}
                   />
                   
                   {/* Left Semi-circle notch */}
                   <div className="absolute -left-4 -bottom-4 w-8 h-8 rounded-full bg-[#F5F6F8]"></div>
                   {/* Right Semi-circle notch */}
                   <div className="absolute -right-4 -bottom-4 w-8 h-8 rounded-full bg-[#F5F6F8]"></div>
                </div>

                {/* Middle Part of Ticket (Details) */}
                <div className="bg-white rounded-b-2xl p-8 relative shadow-sm mb-8">
                   <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Movie</span>
                         <span className="block text-sm font-bold text-slate-900 truncate max-w-[120px]">{bookingData.movieTitle}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Category</span>
                         <span className="block text-sm font-bold text-slate-900">{bookingData.category}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Date</span>
                         <span className="block text-sm font-bold text-slate-900">{bookingData.date}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Time</span>
                         <span className="block text-sm font-bold text-slate-900">{bookingData.time}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Count</span>
                         <span className="block text-sm font-bold text-slate-900">{bookingData.count}</span>
                      </div>
                      <div>
                         <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Seats</span>
                         <span className="block text-sm font-bold text-slate-900 truncate">{bookingData.seats}</span>
                      </div>
                   </div>

                   <div className="border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">Total</span>
                      <span className="font-bold text-slate-900">{bookingData.total}</span>
                   </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                   <Button variant="outline" className="w-full h-12 border-slate-300 text-[#5F2EEA] hover:bg-[#5F2EEA]/5 rounded-xl font-bold gap-2">
                      <Download className="w-4 h-4" /> Download
                   </Button>
                   <Button onClick={() => navigate('/')} className="w-full h-12 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white rounded-xl font-bold shadow-lg shadow-[#5F2EEA]/20">
                      Done
                   </Button>
                </div>

             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
