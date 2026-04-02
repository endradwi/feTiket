import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {  Eye, EyeOff, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '../../shared/components/ui/Button'
import { Input } from '../../shared/components/ui/Input'
import MainLayout from '../../layout/main'
import apiClient from '../../lib/api-client'

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('accountSettings')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState(null)

  const [loadingProfile, setLoadingProfile] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  })
  const [originalData, setOriginalData] = useState(null)

  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoadingProfile(true)
        const resp = await apiClient.get('/users/profile')
        if (resp.result) {
          const fetchedData = {
            firstName: resp.result.first_name || '',
            lastName: resp.result.last_name || '',
            email: resp.result.email || '',
            phoneNumber: resp.result.phone_number || ''
          }
          setProfileData(fetchedData)
          setOriginalData(fetchedData)
        }
      } catch (err) {
        console.error("Failed fetching profile", err)
      } finally {
        setLoadingProfile(false)
      }
    }
    fetchProfile()
  }, [])

  // Fetch Orders
  useEffect(() => {
     if (activeTab === 'orderHistory') {
        const fetchOrders = async () => {
           try {
             setLoadingOrders(true)
             const resp = await apiClient.get('/users/history')
             if (resp.result) {
                setOrders(resp.result)
             }
           } catch (e) {
             console.error("Failed fetching history", e)
           } finally {
             setLoadingOrders(false)
           }
        }
        fetchOrders()
     }
  }, [activeTab])

  const handleUpdateProfile = async () => {
     try {
       setIsUpdating(true)
       
       const formData = new FormData()
       let hasChanges = false;
       if (originalData) {
         if (profileData.firstName !== originalData.firstName) { formData.append('first_name', profileData.firstName); hasChanges = true; }
         if (profileData.lastName !== originalData.lastName) { formData.append('last_name', profileData.lastName); hasChanges = true; }
         if (profileData.phoneNumber !== originalData.phoneNumber) { formData.append('phone_number', profileData.phoneNumber); hasChanges = true; }
       } else {
         formData.append('first_name', profileData.firstName);
         formData.append('last_name', profileData.lastName);
         formData.append('phone_number', profileData.phoneNumber);
         hasChanges = true;
       }

       if (!hasChanges) {
         alert("No changes detected.");
         setIsUpdating(false);
         return;
       }

       await apiClient.patch('/users/profile', formData)
       setOriginalData(profileData)
       alert("Profile updated successfully!")
     } catch (err) {
       console.error("Failed to update profile", err)
       alert("Failed to update profile")
     } finally {
       setIsUpdating(false)
     }
  }

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

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
                  <h3 className="text-xl font-bold text-slate-900">
                     {profileData.firstName || profileData.lastName 
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : 'No Name Provided'}
                  </h3>
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
                      <div className="space-y-10 relative">
                         {loadingProfile && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                               <Loader2 className="w-8 h-8 text-[#003049] animate-spin" />
                            </div>
                         )}
                         {/* Details Information */}
                         <div>
                            <p className="text-sm font-semibold text-slate-700 mb-6">Details Information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                   <label className="block text-sm text-slate-500 font-semibold mb-2">First Name</label>
                                   <Input 
                                      value={profileData.firstName} 
                                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                      className="w-full h-12 bg-white rounded-xl" 
                                   />
                                </div>
                                <div>
                                   <label className="block text-sm text-slate-500 font-semibold mb-2">Last Name</label>
                                   <Input 
                                      value={profileData.lastName} 
                                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                      className="w-full h-12 bg-white rounded-xl" 
                                   />
                                </div>
                                <div>
                                   <label className="block text-sm text-slate-500 font-semibold mb-2">E-mail</label>
                                   <Input 
                                      type="email" 
                                      disabled
                                      value={profileData.email} 
                                      className="w-full h-12 bg-slate-100/50 rounded-xl opacity-70 cursor-not-allowed" 
                                   />
                                </div>
                                <div>
                                   <label className="block text-sm text-slate-500 font-semibold mb-2">Phone Number</label>
                                   <div className="flex gap-4">
                                      <select disabled className="h-12 w-[80px] bg-white border border-slate-200 rounded-xl px-2 text-slate-900 font-medium outline-none text-sm opacity-50">
                                         <option>+62</option>
                                      </select>
                                      <Input 
                                         value={profileData.phoneNumber} 
                                         onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                                         className="flex-1 h-12 bg-white rounded-xl" 
                                      />
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
                                  <label className="block text-sm text-slate-500 font-semibold mb-2">New Password <span className="text-xs font-normal opacity-50">(Unused for now)</span></label>
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

                         <Button 
                            onClick={handleUpdateProfile}
                            disabled={isUpdating}
                            className="w-full md:w-auto px-12 h-12 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-xl shadow-lg shadow-[#003049]/30 transition-all flex items-center justify-center gap-2"
                          >
                            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                            Update changes
                         </Button>
                      </div>
                   )}

                   {/* Order History Content */}
                   {activeTab === 'orderHistory' && (
                      <div className="space-y-6 relative min-h-[200px]">
                         {loadingOrders && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl">
                               <Loader2 className="w-8 h-8 text-[#003049] animate-spin" />
                            </div>
                         )}
                         {orders.map((order) => {
                            const isExpanded = expandedOrder === order.id;
                            
                            const displayDate = order.show_date ? new Date(order.show_date).toLocaleDateString() : '';
                            const isPaid = order.status === 'PAID';
                            const displaySeats = order.seats ? order.seats.map(s => s.name).join(', ') : '';

                            return (
                               <div key={order.id} className="bg-white border text-center md:text-left border-slate-100 rounded-3xl p-6 md:p-8 transition-shadow hover:shadow-sm">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                     <div>
                                        <p className="text-xs text-slate-400 font-medium mb-2">{displayDate} - {order.show_time}</p>
                                        <h4 className="text-lg md:text-xl font-bold text-slate-900">{order.movie_title}</h4>
                                     </div>
                                     <div>
                                        <h4 className="text-2xl md:text-3xl font-bold text-[#003049] opacity-30 italic">{order.cinema_name}</h4>
                                     </div>
                                  </div>

                                  <hr className="border-slate-100 my-4" />

                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                     <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                                           isPaid ? 'bg-[#FCBF49]/10 text-[#FCBF49]' : 'bg-[#6E7191]/10 text-[#6E7191]'
                                        }`}>
                                           {isPaid ? 'Ticket in active' : 'Ticket unpaid/used'}
                                        </span>
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold ${
                                           !isPaid ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-[#6E7191]/10 text-[#6E7191]'
                                        }`}>
                                           {order.status || 'Not Paid'}
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
                                        
                                        {!isPaid ? (
                                           // Ticket Pending Content
                                           <div className="space-y-6 max-w-lg">
                                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                 <span className="text-sm text-slate-500 font-medium">Order Number</span>
                                                 <div className="flex items-center gap-4">
                                                    <span className="font-bold text-slate-900">{order.order_number}</span>
                                                 </div>
                                              </div>
                                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                 <span className="text-sm text-slate-500 font-medium">Total Payment</span>
                                                 <span className="font-bold text-[#003049] text-lg">Rp {order.total_price?.toLocaleString()}</span>
                                              </div>
                                              <p className="text-xs text-slate-500 text-left leading-relaxed">
                                                 Pay this payment bill before it is due. If the bill has not been paid by the specified time, it will be forfeited.
                                              </p>
                                              <Button 
                                                 onClick={() => navigate('/payment', { state: { orderId: order.id } })}
                                                 className="w-full md:w-[200px] h-12 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-xl shadow-lg shadow-[#003049]/30"
                                              >
                                                 Check Payment
                                              </Button>
                                           </div>
                                        ) : (
                                           // Ticket Used/Paid Content
                                           <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm shrink-0 cursor-pointer" onClick={() => navigate('/ticket', { state: { orderId: order.id } })}>
                                                 <QRCodeSVG 
                                                    value={order.order_number || String(order.id)} 
                                                    size={120}
                                                    level={"L"}
                                                    includeMargin={false}
                                                 />
                                                 <p className="text-xs text-center mt-2 text-slate-400 font-bold hover:text-[#003049]">View Ticket</p>
                                              </div>
                                              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 w-full text-left">
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Movie</span>
                                                    <span className="block text-sm font-bold text-slate-900 line-clamp-2">{order.movie_title}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Category</span>
                                                    <span className="block text-sm font-bold text-slate-900">Regular</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Date</span>
                                                    <span className="block text-sm font-bold text-slate-900">{displayDate}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Time</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.show_time}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Count</span>
                                                    <span className="block text-sm font-bold text-slate-900">{order.seats ? order.seats.length : 0}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Seats</span>
                                                    <span className="block text-sm font-bold text-slate-900">{displaySeats}</span>
                                                 </div>
                                                 <div>
                                                    <span className="block text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1">Total</span>
                                                    <span className="block text-sm font-bold text-slate-900">Rp {Number(order.total_price).toLocaleString()}</span>
                                                 </div>
                                              </div>
                                           </div>
                                        )}
                                     </div>
                                  )}

                               </div>
                            )
                         })}
                         
                         {orders.length === 0 && !loadingOrders && (
                            <div className="text-center py-10 text-slate-400 font-medium">You have no order history yet.</div>
                         )}
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
