import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Check, Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setSeats } from '../../store/bookingSlice'
import { Button } from '../../shared/components/ui/Button'
import MainLayout from '../../layout/main'
import apiClient from '../../lib/api-client'

export default function Order() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const booking = useSelector((state) => state.booking)
  
  // Redirect to home if no booking data is present in redux
  React.useEffect(() => {
    if (!booking.movie || !booking.cinema) {
      navigate('/')
    }
  }, [booking.movie, booking.cinema, navigate])

  const [selectedSeats, setSelectedSeats] = useState(booking.seats || [])
  const [dragStartSeat, setDragStartSeat] = useState(null)
  
  const movie = booking.movie || {}
  const cinema = booking.cinema || {}
  const ticketPrice = booking.price || 10
  const showtime_id = booking.showtime_id
  
  const [realSeatsData, setRealSeatsData] = useState([])
  const [soldSeats, setSoldSeats] = useState([])
  const [loadingSeats, setLoadingSeats] = useState(false)

  useEffect(() => {
    if (showtime_id) {
      const fetchSeats = async () => {
        try {
          setLoadingSeats(true)
          const response = await apiClient.get(`/orders/seats?showtime_id=${showtime_id}`)
          if (response.result) {
            setRealSeatsData(response.result)
            // seat: { id, name, price, is_occupied }
            const occupied = response.result.filter(s => s.is_occupied).map(s => s.name)
            setSoldSeats(occupied)
          }
        } catch (error) {
          console.error("Failed to fetch seats", error)
        } finally {
          setLoadingSeats(false)
        }
      }
      fetchSeats()
    }
  }, [showtime_id])

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  
  const handleMouseDown = (seatId) => {
    if (loadingSeats || soldSeats.includes(seatId)) return
    setDragStartSeat(seatId)
  }

  const handleMouseEnter = (seatId) => {
    if (dragStartSeat && dragStartSeat !== seatId) {
      if (soldSeats.includes(seatId)) return
      
      const row1 = dragStartSeat.charAt(0)
      const col1 = parseInt(dragStartSeat.slice(1))
      const row2 = seatId.charAt(0)
      const col2 = parseInt(seatId.slice(1))
      
      if (row1 === row2 && Math.abs(col1 - col2) === 1) {
        // Prevent love nest across the middle aisle
        if ((col1 === 7 && col2 === 8) || (col1 === 8 && col2 === 7)) return;
        
        // Prevent creating love nest if either seat is already selected
        const dragSeatObj = selectedSeats.find(s => s.id === dragStartSeat)
        const targetSeatObj = selectedSeats.find(s => s.id === seatId)
        if (dragSeatObj || targetSeatObj) return;

        // they are adjacent horizontally
        // Create love nest
        const newSelection = [...selectedSeats]
        newSelection.push({ id: dragStartSeat, type: 'love-nest', partner: seatId })
        newSelection.push({ id: seatId, type: 'love-nest', partner: dragStartSeat })
        setSelectedSeats(newSelection)
        setDragStartSeat(null) // End drag to prevent multiple pairings
      }
    }
  }

  const handleMouseUp = (seatId) => {
    if (dragStartSeat === seatId) {
      // It was a click! Single seat toggle
      const existing = selectedSeats.find(s => s.id === seatId)
      if (existing) {
        // Remove it and its partner if it's a love nest
        let newSelection = selectedSeats.filter(s => s.id !== seatId)
        if (existing.type === 'love-nest') {
           newSelection = newSelection.filter(s => s.id !== existing.partner)
        }
        setSelectedSeats(newSelection)
      } else {
        setSelectedSeats([...selectedSeats, { id: seatId, type: 'single' }])
      }
    }
    setDragStartSeat(null)
  }

  const handleMouseLeaveGrid = () => {
    setDragStartSeat(null)
  }
  
  const getTotalPayment = () => {
     return selectedSeats.length * ticketPrice 
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-10 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Stepper */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#F77F00] text-white flex items-center justify-center font-bold mb-2 shadow-sm">
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
              <div className="w-10 h-10 rounded-full bg-[#003049] text-white flex items-center justify-center font-bold mb-2 shadow-md shadow-[#003049]/30">
                2
              </div>
              <span className="text-xs font-semibold text-slate-900">Seat</span>
            </div>
            
            <div className="flex items-center mx-4 -mt-6">
              <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold mb-2">
                3
              </div>
              <span className="text-xs font-semibold text-slate-500">Payment</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Seats Selection */}
            <div className="flex-1 space-y-8">
              {/* Movie Info Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex gap-6 items-center">
                  <img src={movie.posterImage} alt={movie.title} className="w-[120px] aspect-video rounded-lg object-cover" />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{movie.title}</h2>
                    <div className="flex gap-2 mb-3">
                      {movie.genres.map(g => (
                        <span key={g} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-full text-xs font-medium">{g}</span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {booking.date ? `${booking.date}` : "Reguler"} • {booking.time ? booking.time : "11:00 PM"}
                    </p>
                  </div>
                </div>
                <Button className="bg-slate-50 border border-slate-200 text-[#003049] hover:bg-[#003049] hover:border-[#003049] hover:text-white rounded-xl font-bold px-8 shadow-sm">Change</Button>
              </div>

              {/* Choose Seat Area */}
              <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Choose Your Seat</h3>
                
                {/* Screen Line */}
                <div className="mb-12 w-full flex flex-col items-center">
                   <div className="w-full h-2 bg-slate-200 rounded-full mb-3 shadow-inner"></div>
                   <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Screen</span>
                </div>

                {/* Seat Grid */}
                <div 
                  className="flex flex-col gap-3 select-none overflow-x-auto pb-6"
                  onMouseLeave={handleMouseLeaveGrid}
                >
                  {rows.map(row => (
                    <div key={row} className="flex flex-nowrap items-center min-w-max gap-8">
                      <div className="w-4 text-sm font-bold text-slate-400 flex justify-center">{row}</div>
                      
                      {/* Left Block: cols 1-7 */}
                      <div className="flex gap-2">
                        {[1,2,3,4,5,6,7].map(col => {
                          const seatId = `${row}${col}`
                          const isSold = soldSeats.includes(seatId)
                          const selectedObj = selectedSeats.find(s => s.id === seatId)
                          
                          if (selectedObj && selectedObj.type === 'love-nest') {
                            const myCol = parseInt(seatId.slice(1))
                            const partnerCol = parseInt(selectedObj.partner.slice(1))
                            if (myCol > partnerCol) {
                               return <div key={seatId} className="hidden"></div>
                            }
                          }

                          let bgClass = "bg-slate-100 border-slate-200"
                          let widthClass = "w-8"
                          if (isSold) {
                             bgClass = "bg-slate-500 border-slate-500 opacity-60 pointer-events-none"
                          } else if (selectedObj) {
                             if (selectedObj.type === 'love-nest') {
                               bgClass = "bg-[#D62828] border-[#D62828] shadow-[#D62828]/30 shadow-md" 
                               widthClass = "w-[72px]"
                             } else {
                               bgClass = "bg-[#003049] border-[#003049] shadow-[#003049]/30 shadow-md" 
                             }
                          } else {
                             bgClass = "hover:bg-[#003049]/20 hover:border-[#003049]/50 bg-slate-100 border-slate-200"
                          }

                          return (
                            <div 
                              key={seatId}
                              onMouseDown={() => handleMouseDown(seatId)}
                              onMouseEnter={() => handleMouseEnter(seatId)}
                              onMouseUp={() => handleMouseUp(seatId)}
                              className={`${widthClass} h-8 rounded border transition-all cursor-pointer ${bgClass}`}
                            ></div>
                          )
                        })}
                      </div>

                      {/* Right Block: cols 8-14 */}
                      <div className="flex gap-2">
                         {[8,9,10,11,12,13,14].map(col => {
                          const seatId = `${row}${col}`
                          const isSold = soldSeats.includes(seatId)
                          const selectedObj = selectedSeats.find(s => s.id === seatId)
                          
                          if (selectedObj && selectedObj.type === 'love-nest') {
                            const myCol = parseInt(seatId.slice(1))
                            const partnerCol = parseInt(selectedObj.partner.slice(1))
                            if (myCol > partnerCol) {
                               return <div key={seatId} className="hidden"></div>
                            }
                          }

                          let bgClass = "bg-slate-100 border-slate-200"
                          let widthClass = "w-8"
                          if (isSold) {
                             bgClass = "bg-slate-500 border-slate-500 opacity-60 pointer-events-none"
                          } else if (selectedObj) {
                             if (selectedObj.type === 'love-nest') {
                               bgClass = "bg-[#D62828] border-[#D62828] shadow-[#D62828]/30 shadow-md" 
                               widthClass = "w-[72px]"
                             } else {
                               bgClass = "bg-[#003049] border-[#003049] shadow-[#003049]/30 shadow-md" 
                             }
                          } else {
                             bgClass = "hover:bg-[#003049]/20 hover:border-[#003049]/50 bg-slate-100 border-slate-200"
                          }

                          return (
                            <div 
                              key={seatId}
                              onMouseDown={() => handleMouseDown(seatId)}
                              onMouseEnter={() => handleMouseEnter(seatId)}
                              onMouseUp={() => handleMouseUp(seatId)}
                              className={`${widthClass} h-8 rounded border transition-all cursor-pointer ${bgClass}`}
                            ></div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {/* Column Numbers */}
                  <div className="flex flex-nowrap items-center min-w-max gap-8 mt-4">
                     <div className="w-4"></div>
                     <div className="flex gap-2">
                        {[1,2,3,4,5,6,7].map(col => (
                           <div key={col} className="w-8 text-center text-xs font-bold text-slate-400">{col}</div>
                        ))}
                     </div>
                     <div className="flex gap-2">
                        {[8,9,10,11,12,13,14].map(col => (
                           <div key={col} className="w-8 text-center text-xs font-bold text-slate-400">{col}</div>
                        ))}
                     </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-12">
                  <h4 className="text-sm font-bold text-slate-900 mb-6">Seating key</h4>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200"></div>
                      <span className="text-sm text-slate-500 font-semibold">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#003049] border border-[#003049] shadow-md shadow-[#003049]/20"></div>
                      <span className="text-sm text-slate-500 font-semibold">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-6 rounded bg-[#D62828] border border-[#D62828] shadow-md shadow-[#D62828]/20"></div>
                      <span className="text-sm text-slate-500 font-semibold">Love nest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-500 border border-slate-500 opacity-60"></div>
                      <span className="text-sm text-slate-500 font-semibold">Sold</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-[400px]">
               <div className="bg-white rounded-2xl p-8 border border-slate-100 mb-6 shadow-sm">
                 <div className="flex justify-center mb-6">
                    <img src={cinema.logo} alt={cinema.name} className="h-10 object-contain" />
                 </div>
                 <h3 className="text-center font-bold text-2xl text-slate-900 mb-8">{cinema.name} Cinema</h3>
                 
                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm items-center">
                     <span className="text-slate-500 font-semibold">Movie selected</span>
                     <span className="font-bold text-slate-900 text-right max-w-[150px] truncate">{movie.title}</span>
                   </div>
                   <div className="flex justify-between text-sm items-center">
                     <span className="text-slate-500 font-semibold">{booking.date ? booking.date : "Tuesday, 07 July 2026"}</span>
                     <span className="font-bold text-slate-900 text-right">{booking.time ? booking.time : "11:00pm"}</span>
                   </div>
                   <div className="flex justify-between text-sm items-center">
                     <span className="text-slate-500 font-semibold">One ticket price</span>
                     <span className="font-bold text-slate-900 text-right">Rp {ticketPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm items-start">
                     <span className="text-slate-500 font-semibold">Seat choosed</span>
                     <span className="font-bold text-slate-900 text-right max-w-[150px] wrap-break-words leading-tight">
                       {selectedSeats.length > 0 
                         ? selectedSeats.map(s => s.id).sort().join(', ') 
                         : '-'}
                     </span>
                   </div>
                 </div>

                 <div className="pt-6 border-t border-slate-100 flex justify-between items-center mb-2">
                   <span className="font-bold text-lg text-slate-900">Total Payment</span>
                   <span className="text-2xl font-bold text-[#003049]">
                     Rp {getTotalPayment().toLocaleString()}
                   </span>
                 </div>
               </div>
               
               <div className="w-full">
                 <Button 
                   onClick={async () => {
                     try {
                        const seat_ids = selectedSeats.map(s => {
                           const found = realSeatsData.find(rs => rs.name === s.id)
                           return found ? found.id : null
                        }).filter(Boolean)

                        if (!showtime_id || seat_ids.length === 0) return;

                        const orderResponse = await apiClient.post('/orders', {
                           showtime_id: showtime_id,
                           seat_ids: seat_ids
                        })
                        
                        if (orderResponse.result) {
                          dispatch(setSeats({
                            seats: selectedSeats,
                            totalPrice: selectedSeats.length * ticketPrice
                          }))
                          navigate('/payment', { state: { orderId: orderResponse.result.id } })
                        }
                     } catch (error) {
                        console.error("Failed to checkout", error)
                        alert("Checkout failed. Please ensure you are logged in and selecting valid seats.")
                     }
                   }}
                   disabled={selectedSeats.length === 0 || loadingSeats}
                   className="w-full h-14 bg-[#003049] hover:bg-[#003049]/90 text-white font-bold rounded-2xl shadow-lg shadow-[#003049]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                   {loadingSeats && <Loader2 className="w-5 h-5 animate-spin"/>}
                   Checkout now
                 </Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
