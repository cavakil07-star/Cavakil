'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Users, Zap, Award, Clock } from "lucide-react"

const TrustMessaging = () => {
  const trustMessages = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Legal & Compliance Simplified",
      subtitle: "with AI & Experts",
      description: "Advanced AI-powered legal solutions backed by certified professionals"
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: "Trusted by 10,000+",
      subtitle: "businesses nationwide",
      description: "Join thousands of companies who trust us with their legal needs"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "All-in-One Dashboard",
      subtitle: "& mobile app",
      description: "Manage all your legal requirements from a single platform"
    }
  ]

  const features = [
    "24/7 Expert Support",
    "Government Approved",
    "100% Secure & Confidential", 
    "Fast Track Processing",
    "Money Back Guarantee",
    "Pan India Service"
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Trust Messages */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Award className="h-4 w-4 mr-2" />
            India's Leading Legal Tech Platform
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Legal Partner for 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Growth</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Empowering businesses with seamless legal solutions through cutting-edge technology and expert guidance
          </p>
        </div>

        {/* Trust Message Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {trustMessages.map((message, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {message.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {message.title}
                </h3>
                <p className="text-lg font-semibold text-blue-600 mb-4">
                  {message.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {message.description}
                </p>
                
                <div className="mt-6 flex justify-center">
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4">
                  Why Choose CA Vakil?
                </h3>
                <p className="text-xl opacity-90 mb-8">
                  Experience the difference of working with India's most trusted legal technology platform
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center lg:text-right text-white">
                <div className="inline-block p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Clock className="h-12 w-12 text-emerald-300 mx-auto lg:ml-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">25+ Years</div>
                  <p className="text-xl opacity-90">of Excellence</p>
                  <p className="mt-4 opacity-75">Serving businesses with dedication and expertise</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default TrustMessaging