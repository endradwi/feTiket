import React from 'react'
import { CheckCircle2, Tag, Headphones } from 'lucide-react'

const WhyChooseUs = () => {
  return (
    <section className="px-8 py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-[#003049] text-sm font-bold tracking-wider uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-bold leading-tight">Unleashing the Ultimate Movie<br />Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#003049]/10 flex items-center justify-center text-[#003049]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">Guaranteed</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
          </div>
          <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#003049]/10 flex items-center justify-center text-[#003049]">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">Affordable</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
          </div>
          <div className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#003049]/10 flex items-center justify-center text-[#003049]">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">24/7 Customer Support</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim mi, proin faucibus nibh in sagittis a. Lacinia purus ac amet.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
