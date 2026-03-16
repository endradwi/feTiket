import React, { useState } from 'react'
import { Link } from 'react-router'
import { Eye, EyeOff, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import MainLayout from '../layout/main'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('settings') // 'settings' | 'history'
  const [showPassword, setShowPassword] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState(null) // store order id

  const toggleExpand = (id) => {
    if (expandedOrder === id) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(id)
    }
  }

  const orders = [
    {
      id: 1,
      date: 'Tuesday, 07 July 2026 - 04:30pm',
      movieTitle: 'Spider-Man: Homecoming',
      cinemaLogo: 'https://via.placeholder.com/100x30?text=CineOne21',
      status: 'active', // 'active', 'not_paid', 'used'
      statusLabel: 'Ticket in active',
      virtualAccount: null,
      total: '$30.00',
      seats: 'C4, C5, C6',
      time: '2:00pm',
      category: 'PG-13',
      count: '3 pcs',
      bookingId: 'BK-12321328913829724'
    },
    {
      id: 2,
      date: 'Monday, 14 June 2026 - 02:00pm',
      movieTitle: 'Avengers: End Game',
      cinemaLogo: 'https://via.placeholder.com/100x30?text=ebv.id',
      status: 'not_paid',
      statusLabel: 'Not Paid',
      virtualAccount: '12321328913829724',
      total: '$30',
      bookingId: 'BK-0000001'
    },
    {
      id: 3,
      date: 'Monday, 10 March 2026 - 04:00pm',
      movieTitle: 'Avengers: End Game',
      cinemaLogo: 'https://via.placeholder.com/100x30?text=ebv.id',
      status: 'used',
      statusLabel: 'Ticket used',
      virtualAccount: null,
      bookingId: 'BK-0000002'
    }
  ]

  const getStatusBadge = (status, label) => {
    if (status === 'active') {
      return <span className="bg-[#00BA88]/10 text-[#00BA88] font-bold text-xs px-4 py-2 rounded-lg">{label}</span>
    } else if (status === 'not_paid') {
      return <span className="bg-[#F1468E]/10 text-[#F1468E] font-bold text-xs px-4 py-2 rounded-lg">{label}</span>
    } else {
      return <span className="bg-slate-100 text-slate-500 font-bold text-xs px-4 py-2 rounded-lg">{label}</span>
    }
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="md:w-1/3 lg:w-[30%] space-y-6">
            
            {/* Profile Info Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="text-sm font-semibold text-slate-500 w-full mb-6">INFO</div>
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50">
                <img src="https://i.pravatar.cc/150?img=11" alt="Jonas" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Jonas El Rodriguez</h3>
              <p className="text-sm text-slate-500 font-medium mb-6">Moviegoers</p>
              <hr className="w-full border-slate-100 mb-6" />
            </div>

            {/* Loyalty Points Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-900 mb-6">Loyalty Points</h4>
              
              <div className="w-full relative rounded-2xl overflow-hidden shadow-lg p-6 mb-4" style={{ background: 'linear-gradient(135deg, #1C055C 0%, #5F2EEA 100%)' }}>
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4 text-white">
                       <span className="font-bold text-sm tracking-wider">Moviegoers</span>
                       <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-white">
                       320 <span className="text-xs font-normal text-white/70">points</span>
                    </div>
                 </div>
                 {/* Decorative circles */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                 <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              </div>

              <div className="text-center text-xs text-slate-500 font-medium mb-4">
                 180 points become master
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-[#5F2EEA] w-[60%] rounded-full"></div>
              </div>
            </div>

          </div>

          {/* Main Content Area */}
          <div className="md:w-2/3 lg:w-[70%] bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[600px]">
             
             {/* Tabs Header */}
             <div className="flex items-center gap-8 mb-8 border-b border-slate-100 w-full relative">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`pb-4 text-[15px] font-bold transition-colors ${activeTab === 'settings' ? 'text-[#5F2EEA] border-b-2 border-[#5F2EEA]' : 'text-slate-500 hover:text-slate-900'}`}
                >
                   Account Settings
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`pb-4 text-[15px] font-bold transition-colors ${activeTab === 'history' ? 'text-[#5F2EEA] border-b-2 border-[#5F2EEA]' : 'text-slate-500 hover:text-slate-900'}`}
                >
                   Order History
                </button>
             </div>

             {/* Tab Content: Account Settings */}
             {activeTab === 'settings' && (
                <div className="animate-in fade-in duration-300">
                   {/* Details Information */}
                   <h4 className="border-b border-slate-100 pb-4 mb-6 text-sm font-semibold text-slate-900">Details Information</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-2">First Name</label>
                         <Input defaultValue="Jonas" className="h-12 border-slate-200 bg-white" />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-2">Last Name</label>
                         <Input defaultValue="El Rodriguez" className="h-12 border-slate-200 bg-white" />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-2">E-mail</label>
                         <Input defaultValue="jonasrodr123@gmail.com" type="email" className="h-12 border-slate-200 bg-white" />
                      </div>
                      <div>
                         <label className="block text-xs font-semibold text-slate-500 mb-2">Phone Number</label>
                         <div className="flex gap-4">
                           <select className="h-12 w-[80px] border-slate-200 rounded-xl px-2 text-sm text-slate-900 bg-white outline-none border focus:ring-2 focus:ring-[#5F2EEA]/20">
                              <option>+62</option>
                           </select>
                           <Input defaultValue="81445687121" type="tel" className="flex-1 h-12 border-slate-200 bg-white" />
                         </div>
                      </div>
                   </div>

                   {/* Account and Privacy */}
                   <h4 className="border-b border-slate-100 pb-4 mb-6 text-sm font-semibold text-slate-900">Account and Privacy</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className="relative">
                         <label className="block text-xs font-semibold text-slate-500 mb-2">New Password</label>
                         <div className="relative">
                            <Input 
                               type={showPassword ? "text" : "password"} 
                               placeholder="Write your password" 
                               className="h-12 border-slate-200 bg-white pr-12" 
                            />
                            <button 
                               type="button" 
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                               {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                         </div>
                      </div>
                      <div className="relative">
                         <label className="block text-xs font-semibold text-slate-500 mb-2">Confirm Password</label>
                         <div className="relative">
                            <Input 
                               type={showPassword ? "text" : "password"} 
                               placeholder="Confirm your password" 
                               className="h-12 border-slate-200 bg-white pr-12" 
                            />
                            <button 
                               type="button" 
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                               {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                         </div>
                      </div>
                   </div>

                   <Button className="w-full md:w-[250px] h-12 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl shadow-lg shadow-[#5F2EEA]/20">
                      Update changes
                   </Button>
                </div>
             )}

             {/* Tab Content: Order History */}
             {activeTab === 'history' && (
                <div className="animate-in fade-in duration-300 space-y-6">
                   {orders.map((order) => {
                      const isExpanded = expandedOrder === order.id;

                      return (
                         <div key={order.id} className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300">
                            
                            {/* Card Header (Always visible) */}
                            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                               <div className="flex-1">
                                  <div className="text-xs text-slate-400 font-semibold mb-2">{order.date}</div>
                                  <h4 className="text-lg font-bold text-slate-900 mb-6">{order.movieTitle}</h4>
                                  
                                  <div className="flex items-center gap-4">
                                     {getStatusBadge(order.status, order.statusLabel)}
                                  </div>
                               </div>
                               
                               <div className="flex flex-col items-center justify-between h-full gap-8">
                                  <img src={order.cinemaLogo} alt="Cinema logo" className="h-8 object-contain" />
                                  <button 
                                     onClick={() => toggleExpand(order.id)}
                                     className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 ml-auto"
                                  >
                                     Show Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </button>
                               </div>
                            </div>

                            {/* Accordion Content */}
                            {isExpanded && (
                               <div className="border-t border-slate-100 p-6 md:p-8 bg-slate-50/50 animate-in slide-in-from-top-4 duration-300 relative">
                                  
                                  <h4 className="text-sm font-semibold text-slate-900 mb-6 pb-4 border-b border-slate-200">Ticket Information</h4>
                                  
                                  {order.status === 'not_paid' && (
                                     <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                           <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No. Rekening Virtual</span>
                                           <div className="flex items-center gap-4">
                                              <span className="font-bold text-slate-900">{order.virtualAccount}</span>
                                              <Button variant="outline" className="h-8 border-[#5F2EEA] text-[#5F2EEA] hover:bg-[#5F2EEA]/10 text-xs px-4 rounded-lg font-bold">Copy</Button>
                                           </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                           <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Payment</span>
                                           <span className="text-xl font-bold text-[#5F2EEA]">{order.total}</span>
                                        </div>

                                        <p className="text-xs text-slate-500 leading-relaxed">
                                           Pay this payment bill before it is due, <span className="text-red-500 font-bold">on June 23, 2023</span>. If the bill has not been paid by the specified time, it will be forfeited.
                                        </p>

                                        <Button className="w-[150px] h-10 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl shadow-lg shadow-[#5F2EEA]/20">
                                           Check Payment
                                        </Button>
                                     </div>
                                  )}

                                  {order.status === 'active' && (
                                     <div className="flex gap-8">
                                        <div className="w-32 flex-shrink-0">
                                           <QRCodeSVG value={order.bookingId} size={128} level={"L"} />
                                        </div>
                                        
                                        <div className="flex-1 grid grid-cols-3 gap-y-4 text-xs">
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Category</span>
                                              <span className="font-bold text-slate-900">{order.category}</span>
                                           </div>
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Time</span>
                                              <span className="font-bold text-slate-900">{order.time}</span>
                                           </div>
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Seats</span>
                                              <span className="font-bold text-slate-900">{order.seats}</span>
                                           </div>
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Movie</span>
                                              <span className="font-bold text-slate-900 truncate pr-2 block">{order.movieTitle}</span>
                                           </div>
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Date</span>
                                              <span className="font-bold text-slate-900">{order.date.split(' - ')[0]}</span>
                                           </div>
                                           <div>
                                              <span className="block text-slate-400 font-semibold mb-1 uppercase">Count</span>
                                              <span className="font-bold text-slate-900">{order.count}</span>
                                           </div>
                                           
                                           <div className="col-span-3 flex justify-between items-center mt-2 p-3 bg-white rounded-lg border border-slate-100">
                                              <span className="font-semibold text-slate-500">Total</span>
                                              <span className="font-bold text-slate-900">{order.total}</span>
                                           </div>
                                        </div>
                                     </div>
                                  )}

                                  {order.status === 'used' && (
                                     <div className="text-center text-sm font-medium text-slate-500 py-4">
                                        This ticket has already been used.
                                     </div>
                                  )}

                               </div>
                            )}

                         </div>
                      );
                   })}
                </div>
             )}

          </div>
        </div>
      </div>
    </MainLayout>
  )
}
