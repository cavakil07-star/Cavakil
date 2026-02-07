'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CheckCircle, Shield, Clock, Award, Users, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import PanIndiaMarquee from './PanIndiaMarquee';

const BigHeadlines = () => {
  const features = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: "Legal & Compliance Simplified"
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      text: "Fast, Safe & Affordable"
    },
    {
      icon: <Clock className="w-5 h-5 text-orange-600" />,
      text: "Quick Turnaround Time"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-600" />,
      text: "Verified Professionals"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Cases Filed" },
    { number: "50+", label: "Verified Experts" },
    { number: "99%", label: "Success Rate" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="bg-white/80 border-blue-200 text-blue-700 px-4 py-2 text-sm font-medium">
            <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
            India's #1 Legal & Compliance Platform
          </Badge>
        </div>

        {/* Main Headlines */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              EXPERTS IN TAX, GST &
            </span>
            <br />
            <span className="text-slate-800">
              BUSINESS COMPLIANCE
            </span>
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-3">
              Every Filing handled by verified CA, ADVOCATE, CS.
            </p>
            <p className="text-lg md:text-xl text-blue-600 font-medium mb-3">
              GET LEGAL HELP & FILE CORRECTLY - FAST, SAFE & AFFORDABLE
            </p>
            <div className="flex items-center justify-center gap-2 text-base md:text-lg text-green-600 font-semibold mb-6">
              <MapPin className="w-5 h-5" />
              <span>Services Provided Across All India</span>
              <MapPin className="w-5 h-5" />
            </div>
          </div>

          {/* Pan India Marquee */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-10">
            <PanIndiaMarquee />
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {feature.icon}
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href={'/talk-to-lawyer'}>
             <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Talk to Expert Now
            </Button>
            </Link>
           <Link href={"/services"}>
           <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
            >
              Explore Services
            </Button>
           </Link>
            
          </div>
        </div>

        {/* Stats Section */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center mt-8">
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>ISO 27001 Certified</span>
            </div> */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="w-4 h-4" />
              <span>Government Recognized</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4" />
              <span>100% Legal Compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  )
}

export default BigHeadlines