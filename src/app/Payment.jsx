import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Check } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import MainLayout from '../layout/main'
import { DUMMY_DATA } from '../data/dummy'

export default function Payment() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  
  const handlePay = () => {
    setShowModal(true)
  }

  const paymentMethods = [
    { id: 'gpay', logo: 'https://via.placeholder.com/80x30?text=G+Pay' }, // Replace with real logos
    { id: 'visa', logo: 'https://via.placeholder.com/80x30?text=VISA' },
    { id: 'gopay', logo: 'https://via.placeholder.com/80x30?text=gopay' },
    { id: 'paypal', logo: 'https://via.placeholder.com/80x30?text=PayPal' },
    { id: 'dana', logo: 'https://via.placeholder.com/80x30?text=DANA' },
    { id: 'bca', logo: 'https://via.placeholder.com/80x30?text=BCA' },
    { id: 'bri', logo: 'https://via.placeholder.com/80x30?text=BRI' },
    { id: 'ovo', logo: 'https://via.placeholder.com/80x30?text=OVO' }
  ]

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-10 px-8 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-2 shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Dates And Time</span>
            </div>
            
            <div className="flex items-center mx-4 -mt-6">
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-2 shadow-sm">
                <Check className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Seat</span>
            </div>
            
            <div className="flex items-center mx-4 -mt-6">
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#5F2EEA] text-white flex items-center justify-center font-bold mb-2 shadow-md shadow-[#5F2EEA]/30">
                3
              </div>
              <span className="text-xs font-semibold text-slate-900">Payment</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative z-10">
             
            {/* Payment Info Section */}
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Payment Info</h3>
            <div className="space-y-4 mb-10">
               <div className="flex flex-col md:flex-row md:items-center justify-between text-sm gap-2">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Date & Time</span>
                 <span className="font-semibold text-slate-900">Tuesday, 07 July 2026 at 02:00pm</span>
               </div>
               <hr className="border-slate-100" />
               <div className="flex flex-col md:flex-row md:items-center justify-between text-sm gap-2">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Movie Title</span>
                 <span className="font-semibold text-slate-900">Spider-Man: Homecoming</span>
               </div>
               <hr className="border-slate-100" />
               <div className="flex flex-col md:flex-row md:items-center justify-between text-sm gap-2">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Cinema Name</span>
                 <span className="font-semibold text-slate-900">CineOne21 Cinema</span>
               </div>
               <hr className="border-slate-100" />
               <div className="flex flex-col md:flex-row md:items-center justify-between text-sm gap-2">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Number Of Tickets</span>
                 <span className="font-semibold text-slate-900">3 pieces</span>
               </div>
               <hr className="border-slate-100" />
               <div className="flex flex-col md:flex-row md:items-center justify-between text-sm gap-2">
                 <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs">Total Payment</span>
                 <span className="font-bold text-[#5F2EEA] text-lg">$30,00</span>
               </div>
            </div>

            {/* Personal Information Section */}
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Personal Information</h3>
            <div className="space-y-5 mb-10">
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Full Name</label>
                  <Input 
                     defaultValue="Jonas El Rodriguez" 
                     className="w-full h-12 bg-white border-slate-200 rounded-xl"
                  />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Email</label>
                  <Input 
                     type="email"
                     defaultValue="jonasrodr123@gmail.com" 
                     className="w-full h-12 bg-white border-slate-200 rounded-xl"
                  />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Phone Number</label>
                  <div className="flex gap-4">
                     <select className="h-12 w-[100px] bg-white border border-slate-200 rounded-xl px-4 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#5F2EEA]/20">
                        <option>+62</option>
                        <option>+1</option>
                        <option>+44</option>
                     </select>
                     <Input 
                        type="tel"
                        defaultValue="81445687121" 
                        className="flex-1 h-12 bg-white border-slate-200 rounded-xl"
                     />
                  </div>
               </div>
            </div>

            {/* Payment Method Section */}
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">Payment Method</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
               {paymentMethods.map((method) => (
                  <div 
                     key={method.id}
                     onClick={() => setSelectedPayment(method.id)}
                     className={`h-14 border rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                        selectedPayment === method.id 
                        ? 'border-[#5F2EEA] bg-[#5F2EEA]/5 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-[#5F2EEA]/50 hover:bg-slate-50'
                     }`}
                  >
                     <img src={method.logo} alt={method.id} className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all mix-blend-multiply" />
                  </div>
               ))}
            </div>

            <Button 
               onClick={handlePay}
               className="w-full h-14 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#5F2EEA]/30"
            >
               Pay your order
            </Button>

          </div>
        </div>
      </div>
      
      {/* Payment Modal Overlay */}
      {showModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
               <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 text-center">Payment Info</h3>
               
               <div className="space-y-6 mb-8">
                  <div className="flex flex-col gap-1">
                     <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">No. Rekening Virtual</span>
                     <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-lg">12321328913829724</span>
                        <Button variant="outline" className="border-[#5F2EEA] text-[#5F2EEA] hover:bg-[#5F2EEA]/10 h-8 rounded-lg text-xs font-bold px-4">Copy</Button>
                     </div>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                     <span className="text-sm text-slate-500 font-semibold">Total Payment</span>
                     <span className="font-bold text-[#5F2EEA] text-xl">$30</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed text-center">
                     Pay this payment bill before it is due, <span className="text-red-500 font-bold">on June 23, 2023</span>. If the bill has not been paid by the specified time, it will be forfeited.
                  </p>
               </div>
               
               <div className="space-y-3">
                  <Button 
                     onClick={() => navigate('/')} 
                     className="w-full h-12 bg-[#5F2EEA] hover:bg-[#5F2EEA]/90 text-white font-bold rounded-xl shadow-lg shadow-[#5F2EEA]/30"
                  >
                     Check Payment
                  </Button>
                  <Button 
                     variant="ghost" 
                     onClick={() => setShowModal(false)}
                     className="w-full h-12 text-[#5F2EEA] font-bold hover:bg-slate-50 rounded-xl"
                  >
                     Pay Later
                  </Button>
               </div>
            </div>
         </div>
      )}
    </MainLayout>
  )
}
