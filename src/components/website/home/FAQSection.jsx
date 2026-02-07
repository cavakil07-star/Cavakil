'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, MessageCircle, Phone, Mail, HelpCircle, FileText, Users } from 'lucide-react'

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set([0])) // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      category: "General",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          q: "What services does CA Vakil provide?",
          a: "CA Vakil provides comprehensive legal and compliance services including tax filing, GST registration, company incorporation, legal documentation, and business compliance. All services are handled by verified CAs, Advocates, and Company Secretaries."
        },
        {
          q: "How are your experts verified?",
          a: "All our professionals go through a rigorous verification process including license validation, experience assessment, and background checks. We only work with certified CAs, qualified Advocates, and registered Company Secretaries."
        },
        {
          q: "What makes CA Vakil different from other platforms?",
          a: "We combine AI-powered efficiency with expert human oversight, offering 24/7 support, guaranteed compliance, and transparent pricing. Our all-in-one dashboard makes managing your legal and tax requirements simple and streamlined."
        }
      ]
    },
    {
      category: "Services",
      icon: <FileText className="w-5 h-5" />,
      questions: [
        {
          q: "How quickly can my tax return be filed?",
          a: "Most tax returns are completed within 24-48 hours after document submission. Complex cases may take 3-5 business days. We provide real-time updates throughout the process."
        },
        {
          q: "Do you handle GST registration for all business types?",
          a: "Yes, we handle GST registration for all business entities including sole proprietorships, partnerships, private limited companies, LLPs, and more. Our experts ensure compliance with all GST requirements."
        },
        {
          q: "Can you help with ongoing compliance after incorporation?",
          a: "Absolutely! We provide end-to-end compliance services including annual filings, board resolutions, statutory audits, and regular compliance monitoring to keep your business on track."
        }
      ]
    },
    {
      category: "Pricing",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          q: "How transparent is your pricing?",
          a: "Our pricing is completely transparent with no hidden charges. You'll see the exact cost upfront, including government fees, professional charges, and any applicable taxes."
        },
        {
          q: "Do you offer refunds if not satisfied?",
          a: "Yes, we offer a 100% satisfaction guarantee. If you're not satisfied with our service, we provide full refund within 7 days of service completion (excluding government fees)."
        },
        {
          q: "Are there any additional charges for revisions?",
          a: "Minor revisions and clarifications are included in our service fee. Major changes or additional services will be clearly communicated and approved before any extra charges apply."
        }
      ]
    }
  ]

  const allQuestions = faqData.flatMap((category, categoryIndex) => 
    category.questions.map((q, qIndex) => ({
      ...q,
      category: category.category,
      icon: category.icon,
      globalIndex: categoryIndex * 10 + qIndex
    }))
  )

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 px-4 py-2 mb-6">
            <MessageCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Got Questions? 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}We've Got Answers
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Find quick answers to the most common questions about our legal and compliance services. 
            Can't find what you're looking for? Our experts are just a click away.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {allQuestions.map((item, index) => (
                    <Collapsible
                      key={index}
                      open={openItems.has(index)}
                      onOpenChange={() => toggleItem(index)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200 group">
                          <div className="flex items-center gap-4 text-left">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                {item.icon}
                              </div>
                            </div>
                            <div>
                              <Badge variant="secondary" className="mb-2 text-xs">
                                {item.category}
                              </Badge>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.q}
                              </h3>
                            </div>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              openItems.has(index) ? 'transform rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="overflow-hidden transition-all duration-300">
                        <div className="px-6 pb-6 pl-20">
                          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                            <p className="text-gray-700 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            
            {/* Still Have Questions Card */}
            {/* <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
                  <p className="text-blue-100 mb-6">
                    Our expert team is available 24/7 to help you with any queries.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                      size="lg"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Live Chat Support
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      size="lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule a Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Why Choose Our Support?</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">24/7</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Round the Clock Support</p>
                      <p className="text-sm text-gray-600">Available whenever you need help</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">5⭐</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Expert Resolution</p>
                      <p className="text-sm text-gray-600">Handled by certified professionals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">2min</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Quick Response</p>
                      <p className="text-sm text-gray-600">Average response time under 2 minutes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-bold text-gray-900 mb-4">Other Ways to Reach Us</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">baggarajiv@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone Support</p>
                      <p className="text-sm text-gray-600">+91 7696 000 201</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection