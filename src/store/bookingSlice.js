import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movie: null,
  cinema: null,
  date: null,
  time: null,
  showtime_id: null,
  price: 0,
  seats: [], // Array of seat objects { id, type, partner? }
  totalPrice: 0,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+62',
    phoneNumber: ''
  },
  paymentMethod: null,
  bookingId: null // Generated after payment
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      // payload: { movie, cinema, date, time, showtime_id, price }
      state.movie = action.payload.movie
      state.cinema = action.payload.cinema
      state.date = action.payload.date
      state.time = action.payload.time
      state.showtime_id = action.payload.showtime_id
      state.price = action.payload.price || 0
    },
    setSeats: (state, action) => {
      // payload: { seats, totalPrice }
      state.seats = action.payload.seats
      state.totalPrice = action.payload.totalPrice
    },
    setPersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload
    },
    resetBooking: () => initialState
  }
})

export const { 
  setBookingDetails, 
  setSeats, 
  setPersonalInfo, 
  setPaymentMethod,
  setBookingId,
  resetBooking 
} = bookingSlice.actions

export default bookingSlice.reducer
