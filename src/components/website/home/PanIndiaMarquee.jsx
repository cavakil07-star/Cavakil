'use client'

import React from 'react'
import { MapPin, Globe, CheckCircle2, Sparkles } from 'lucide-react'

const PanIndiaMarquee = () => {
  const indianStates = [
    "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", 
    "Uttar Pradesh", "West Bengal", "Rajasthan", "Telangana", "Haryana",
    "Madhya Pradesh", "Punjab", "Kerala", "Andhra Pradesh", "Bihar",
    "Odisha", "Assam", "Jharkhand", "Chhattisgarh", "Uttarakhand",
    "Goa", "Himachal Pradesh", "Tripura", "Meghalaya", "Manipur",
    "Nagaland", "Jammu & Kashmir", "Ladakh", "Puducherry", "Chandigarh"
  ]

  const MarqueeContent = () => (
    <div className="flex items-center gap-8 px-4">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <Globe className="w-5 h-5 text-blue-400" />
        <span className="text-lg font-semibold text-white">
          Services Provided Across India
        </span>
        <Sparkles className="w-5 h-5 text-yellow-400" />
      </div>
      
      {indianStates.map((state, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">{state}</span>
          </div>
          {index < indianStates.length - 1 && (
            <MapPin className="w-4 h-4 text-blue-300" />
          )}
        </React.Fragment>
      ))}

      <div className="flex items-center gap-2 whitespace-nowrap">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="text-lg font-semibold text-white">
          All States Covered
        </span>
        <Globe className="w-5 h-5 text-blue-400" />
      </div>
    </div>
  )

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-4 overflow-hidden shadow-lg">
      {/* Background animated pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
      </div>

      {/* Marquee container */}
      <div className="relative flex overflow-hidden">
        {/* First marquee */}
        <div className="flex animate-marquee">
          <MarqueeContent />
        </div>
        
        {/* Second marquee for seamless loop */}
        <div className="flex animate-marquee" aria-hidden="true">
          <MarqueeContent />
        </div>
      </div>

      {/* Edge gradients for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-600 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-800 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default PanIndiaMarquee
