import React from 'react'
import { Link } from 'react-router'

function AuthLayout({ children }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-slate-900/70"></div>
      
      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center justify-center py-8">
        <Link to="/" className="mb-8">
          <img src="/logo.png" alt="Tickitz Logo" className="h-14 w-auto object-contain brightness-0 invert" />
        </Link>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout