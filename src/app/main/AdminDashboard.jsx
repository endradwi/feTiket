import React from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import AdminLayout from '../../layout/AdminLayout'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Sales Chart Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <h2 className="text-xl font-bold text-slate-800">Sales Chart</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-semibold cursor-pointer">
                <span>Movie Name</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-semibold cursor-pointer">
                <span>Weekly</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <Button className="bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl h-[44px] px-8">
                Filter
              </Button>
            </div>
          </div>

          <div className="relative pt-10">
            <h3 className="text-lg font-bold text-slate-800 absolute -top-2 left-0 capitalize">Avengers: End Game</h3>
            
            {/* Mock Chart */}
            <div className="w-full h-[280px] relative mt-12 px-4">
               {/* Grid lines */}
               {[0, 25, 50, 75, 100].map((val) => (
                 <div key={val} className="absolute inset-x-0 border-t border-slate-100 flex items-center" style={{ top: `${100 - val}%` }}>
                   <span className="absolute -left-10 text-[10px] font-bold text-slate-300">{val * 5}</span>
                 </div>
               ))}
               
               {/* Wave Chart using SVG */}
               <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 280" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="#5F2EEA" stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#5F2EEA" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 <path 
                    d="M0,200 C50,180 100,210 150,160 C200,110 250,50 300,80 C350,110 400,180 450,170 C500,160 550,120 600,150 C650,180 700,200 750,190 C800,180 850,120 900,140 C950,160 1000,120 1000,120 L1000,280 L0,280 Z" 
                    fill="url(#gradient)" 
                 />
                 <path 
                    d="M0,200 C50,180 100,210 150,160 C200,110 250,50 300,80 C350,110 400,180 450,170 C500,160 550,120 600,150 C650,180 700,200 750,190 C800,180 850,120 900,140 C950,160 1000,120 1000,120" 
                    fill="none" 
                    stroke="#5F2EEA" 
                    strokeWidth="3"
                    strokeLinecap="round"
                 />
                 {/* Current point */}
                 <circle cx="280" cy="70" r="10" fill="#5F2EEA" />
                 <rect x="260" y="45" width="40" height="20" rx="4" fill="#5F2EEA" />
               </svg>

               <div className="flex justify-between mt-8 text-[10px] font-bold text-slate-300 px-2 uppercase tracking-widest">
                 {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map(m => <span key={m}>{m}</span>)}
               </div>
            </div>
          </div>
        </div>

        {/* Ticket Sales Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <h2 className="text-xl font-bold text-slate-800">Ticket Sales</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-semibold cursor-pointer">
                <span>Category</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-sm font-semibold cursor-pointer">
                <span>Location</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <Button className="bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl h-[44px] px-8">
                Filter
              </Button>
            </div>
          </div>

          <div className="relative pt-6">
            <h3 className="text-sm font-bold text-slate-400 absolute -top-2 left-0 uppercase tracking-widest">Adventure, Purwokerto</h3>
            
            {/* Same Mock Chart but maybe different data if we want to vary */}
            <div className="w-full h-[280px] relative mt-12 px-4 shadow-[0_-20px_40px_-20px_rgba(95,46,234,0.05)]">
               {/* Grid lines */}
               {[0, 25, 50, 75, 100].map((val) => (
                 <div key={val} className="absolute inset-x-0 border-t border-slate-100 flex items-center" style={{ top: `${100 - val}%` }}>
                   <span className="absolute -left-10 text-[10px] font-bold text-slate-300">{val * 5}</span>
                 </div>
               ))}
               
               <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 280" preserveAspectRatio="none">
                 <path 
                    d="M0,180 C100,160 200,240 300,140 C400,40 500,280 600,180 C700,80 800,150 1000,120 L1000,280 L0,280 Z" 
                    fill="url(#gradient)" 
                 />
                 <path 
                    d="M0,180 C100,160 200,240 300,140 C400,40 500,280 600,180 C700,80 800,150 1000,120" 
                    fill="none" 
                    stroke="#5F2EEA" 
                    strokeWidth="3"
                    strokeLinecap="round"
                 />
                 <circle cx="340" cy="110" r="10" fill="#5F2EEA" />
               </svg>

               <div className="flex justify-between mt-8 text-[10px] font-bold text-slate-300 px-2 uppercase tracking-widest">
                  {['01', '02', '03', '04', '05', '06', '07'].map(d => <span key={d}>{d}</span>)}
               </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
