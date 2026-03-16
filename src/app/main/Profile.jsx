import React, { useState } from 'react'
import { Plus, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'
import MainLayout from '../../layout/main'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('accountSettings')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState(null)

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  // Mock order data based on design
  const orders = [
    {
      id: 1,
      date: 'Tuesday, 07 July 2026 - 04:30pm',
      movieTitle: 'Spider-Man: Homecoming',
      cinemaLogo: '/CineOne21.png', // Replace with actual logo or text if unavailable
      cinemaName: 'CineOne21',
      status: 'active', // 'active' or 'used'
      paymentStatus: 'Not Paid', // 'Not Paid' or 'Paid'
      virtualAccount: '12321328913829724',
      total: '$30',
      payByDate: 'June 23, 2023',
    },
    {
      id: 2,
      date: 'Monday, 14 June 2026 - 02:00pm',
      movieTitle: 'Avengers: End Game',
      cinemaLogo: '/ebv.id.png', // Replace with actual logo
      cinemaName: 'ebv.id',
      status: 'used',
      paymentStatus: 'Paid',
      category: 'PG-13',
      time: '2:00pm',
      count: '3 pcs',
      seats: 'C4, C5, C6',
      total: '$30.00',
    },
    {
      id: 3,
      date: 'Monday, 08 June 2026 - 02:00pm',
      movieTitle: 'Avengers: End Game',
      cinemaLogo: '/ebv.id.png', // Replace with actual logo
      cinemaName: 'ebv.id',
      status: 'used',
      paymentStatus: 'Paid',
      category: 'PG-13',
      time: '2:00pm',
      count: '3 pcs',
      seats: 'C4, C5, C6',
      total: '$30.00',
    }
  ]

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-10 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-[30%] space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center">
               <span className="self-start text-xs font-semibold text-slate-500 mb-4">INFO</span>
               <div className="mb-4 text-center">
                  <div className="relative inline-block mb-3">
                     <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop" 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover shadow-sm"
                     />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Jonas El Rodriguez</h3>
                  <p className="text-sm text-slate-500 font-medium">Moviegoers</p>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
               <span className="block text-sm font-semibold text-slate-700 mb-4">Loyalty Points</span>
               <div className="bg-linear-to-r from-[#003049] to-[#8C6EEA] w-full h-28 rounded-2xl relative overflow-hidden flex flex-col justify-center px-6 shadow-md shadow-[#003049]/20">
                  <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute right-4 bottom-2 text-4xl">🌟</div>
                  <div className="text-white">
                     <span className="block text-sm font-medium opacity-90 mb-1">Moviegoers</span>
                     <span className="block text-3xl font-bold">320<span className="text-lg text-white/70 font-medium">points</span></span>
                  </div>
               </div>
               <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                  180 points become a master
               </p>
               <div className="w-full bg-slate-100 rounded-full h-1 mt-3">
                  <div className="bg-[#003049] h-1 rounded-full w-[60%]"></div>
               </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full md:w-[70%]">
             <div className="bg-white rounded-3xl p-2 md:p-8 border border-slate-100 shadow-sm min-h-[600px]">
                
                {/* Tabs */}
                <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
                   <button 
                      onClick={() => setActiveTab('accountSettings')}
                      className={`px-6 py-4 font-semibold text-sm transition-colors relative whitespace-nowrap ${
                         activeTab === 'accountSettings' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                   >
                      Account Settings
                      {activeTab === 'accountSettings' && (
                         <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#003049]"></div>
                      )}
                   </button>
                   <button 
                      onClick={() => setActiveTab('orderHistory')}
                      className={`px-6 py-4 font-semibold text-sm transition-colors relative whitespace-nowrap ${
                         activeTab === 'orderHistory' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                      }`}
                   >
                      Order History
                      {activeTab === 'orderHistory' && (
                         <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#003049]"></div>
                      )}
                   </button>
                </div>

                {/* Tab Content */}
                <div className="px-2 md:px-0">
                   
                   {/* Account Settings Content */}
                   {activeTab === 'accountSettings' && (
                      <div className="space-y-10">
                         {/* Details Information */}
                         <div>
                            <p className="text-sm font-semibold text-slate-700 mb-6">Details Information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">First Name</label>
                                  <Input defaultValue="Jonas" className="w-full h-12 bg-white rounded-xl" />
                               </div>
                               <div>
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">Last Name</label>
                                  <Input defaultValue="El Rodriguez" className="w-full h-12 bg-white rounded-xl" />
                               </div>
                               <div>
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">E-mail</label>
                                  <Input type="email" defaultValue="jonasrodrigez123@gmail.com" className="w-full h-12 bg-white rounded-xl" />
                               </div>
                               <div>
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">Phone Number</label>
                                  <div className="flex gap-4">
                                     <select className="h-12 w-[80px] bg-white border border-slate-200 rounded-xl px-2 text-slate-900 font-medium outline-none text-sm">
                                        <option>+62</option>
                                     </select>
                                     <Input defaultValue="81445687121" className="flex-1 h-12 bg-white rounded-xl" />
                                  </div>
                               </div>
                            </div>
                         </div>

                         <hr className="border-slate-100" />
                         
                         {/* Account and Privacy */}
                         <div>
                            <p className="text-sm font-semibold text-slate-700 mb-6">Account and Privacy</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="relative">
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">New Password</label>
                                  <div className="relative">
                                     <Input 
                                        type={showPassword ? 'text' : 'password'} 
                                        placeholder="Write your password" 
                                        className="w-full h-12 bg-white rounded-xl pr-10" 
                                     />
                                     <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                     >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                     </button>
                                  </div>
                               </div>
                               <div className="relative">
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">Confirm Password</label>
                                  <div className="relative">
                                     <Input 
                                        type={showConfirmPassword ? 'text' : 'password'} 
                                        placeholder="Confirm your password" 
                                        className="w-full h-12 bg-white rounded-xl pr-10" 
                                     />
                                     <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                     >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                     </button>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <Button className="w-full md:w-auto px-12 h-12 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-xl shadow-lg shadow-[#003049]/30 transition-all">
                            Update changes
                         </Button>
                      </div>
                   )}

                   {/* Order History Content */}
                   {activeTab === 'orderHistory' && (
                      <div className="space-y-6">
                         {orders.map((order) => {
                            const isExpanded = expandedOrder === order.id;

                            return (
                               <div key={order.id} className="bg-white border text-center md:text-left border-slate-100 rounded-3xl p-6 md:p-8 transition-shadow hover:shadow-sm">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                     <div>
                                        <p className="text-xs text-slate-400 font-medium mb-2">{order.date}</p>
                                        <h4 className="text-lg md:text-xl font-bold text-slate-900">{order.movieTitle}</h4>
                                     </div>
                                     <div>
                                        <h4 className="text-2xl md:text-3xl font-bold text-[#003049] opacity-30 italic">{order.cinemaName}</h4>
                                     </div>
                                  </div>

                                  <hr className="border-slate-100 my-4" />

                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                     <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                                           order.status === 'active' ? 'bg-[#FCBF49]/10 text-[#FCBF49]' : 'bg-[#6E7191]/10 text-[#6E7191]'
                                        }`}>
                                           {order.status === 'active' ? 'Ticket in active' : 'Ticket used'}
                                        </span>
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                                           order.paymentStatus === 'Not Paid' ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-[#6E7191]/10 text-[#6E7191]'
                                        }`}>
                                           {order.paymentStatus}
                                        </span>
                                     </div>
                                     <button 
                                        onClick={() => toggleOrderDetails(order.id)}
                                        className="flex items-center gap-2 text-slate-400 hover:text-[#003049] font-semibold text-sm transition-colors mx-auto md:mx-0"
                                     >
                                        Show Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                     </button>
                                  </div>

                                  {/* Accordion Content */}
                                  {isExpanded && (
                                     <div className="mt-8 pt-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                        <h5 className="text-base font-bold text-slate-900 mb-6">Ticket Information</h5>
                                        
                                        {order.status === 'active' ? (
                                           // Ticket Active Content
                                           <div className="space-y-6 max-w-lg">
                                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                 <span className="text-sm text-slate-500 font-medium">No. Rekening Virtual</span>
                                                 <div className="flex items-center gap-4">
                                                    <span className="font-bold text-slate-900">12321328913829724</span>
                                                    <Button variant="outline" className="border-[#003049] text-[#003049] hover:bg-[#003049]/10 h-8 px-4 py-0 rounded-lg text-xs font-bold">Copy</Button>
                                                 </div>
                                              </div>
                                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                 <span className="text-sm text-slate-500 font-medium">Total Payment</span>
                                                 <span className="font-bold text-[#003049] text-lg">$30</span>
                                              </div>
                                              <p className="text-xs text-slate-500 text-left leading-relaxed">
                                                 Pay this payment bill before it is due, <span className="text-red-500 font-bold">on June 23, 2023</span>. If the bill has not been paid by the specified time, it will be forfeited.
                                              </p>
                                              <Button className="w-full md:w-[200px] h-12 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-xl shadow-lg shadow-[#003049]/30">
                                                 Check Payment
                                              </Button>
                                           </div>
                                        ) : (
                                           // Ticket Used Content
                                           <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm shrink-0">
                                                 <QRCodeSVG 
                                                    value={`TK-${order.id}-123`} 
                                                    size={120}
                                                    level={"L"}
                                                    includeMargin={false}
                                                 />
                                              </div>
                                              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 w-full text-left">
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Movie</span>
                                                    <span className="block text-sm font-bold text-slate-900 line-clamp-2">{order.movieTitle}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Category</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.category}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Date</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.date.split('-')[0].trim()}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Time</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.time}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Count</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.count}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Seats</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.seats}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Total</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.total}</span>
                                                 </div>
                                              </div>
                                           </div>
                                        )}
                                     </div>
                                  )}

                               </div>
                            )
                         })}
                      </div>
                   )}
                </div>
                
             </div>
          </div>

        </div>
      </div>
    </MainLayout>
  )
}
