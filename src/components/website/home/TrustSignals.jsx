'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, ExternalLink, TrendingUp, Users, Award, Verified, Building2, Shield, Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"

// Icon mapping for success stories
const iconMap = {
  TrendingUp: TrendingUp,
  Users: Users,
  Award: Award,
  Building2: Building2,
  Shield: Shield,
  Briefcase: Briefcase,
}

const TrustSignals = () => {
  const [reviews, setReviews] = useState([])
  const [successStories, setSuccessStories] = useState([])
  const [mediaFeatures, setMediaFeatures] = useState([])
  const [loading, setLoading] = useState(true)

  // Static authority badges (these are platform-level trust signals, not dynamic content)
  const authorityBadges = [
    {
      name: "Google Reviews",
      rating: "4.9/5",
      reviews: "2,500+ Reviews",
      verified: true
    },
    {
      name: "Trustpilot",
      rating: "4.8/5",
      reviews: "1,200+ Reviews",
      verified: true
    },
    {
      name: "Government Approved",
      rating: "Licensed",
      reviews: "MCA Registered",
      verified: true
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, storiesRes, mediaRes] = await Promise.all([
          fetch('/api/client-reviews?forWebsite=true', { cache: 'no-store' }),
          fetch('/api/success-stories?forWebsite=true', { cache: 'no-store' }),
          fetch('/api/media-features?forWebsite=true', { cache: 'no-store' }),
        ])

        const [reviewsData, storiesData, mediaData] = await Promise.all([
          reviewsRes.json(),
          storiesRes.json(),
          mediaRes.json(),
        ])

        if (reviewsData.success) setReviews(reviewsData.data || [])
        if (storiesData.success) setSuccessStories(storiesData.data || [])
        if (mediaData.success) setMediaFeatures(mediaData.data || [])
      } catch (error) {
        console.error('Error fetching trust signals data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading skeleton
  const LoadingSkeleton = ({ count = 3, className = "" }) => (
    <div className={`grid gap-6 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
      ))}
    </div>
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Verified className="h-4 w-4 mr-2 text-green-600" />
            Trusted by Thousands
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Why Clients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"> Trust Us</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories, verified reviews, and proven results from businesses just like yours
          </p>
        </div>

        {/* Verified Reviews Section */}
        {(loading || reviews.length > 0) && (
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Verified Client Reviews</h3>

            {loading ? (
              <LoadingSkeleton count={3} className="grid-cols-1 md:grid-cols-3" />
            ) : (
              <div className={`grid grid-cols-1 gap-8 ${reviews.length === 1 ? 'md:grid-cols-1 max-w-lg mx-auto' : reviews.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
                {reviews.map((review, index) => (
                  <Card key={review._id || index} className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {review.platform}
                        </Badge>
                      </div>

                      <Quote className="h-8 w-8 text-gray-300 mb-4" />
                      <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                        "{review.review}"
                      </p>

                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={review.avatar} alt={review.name} />
                          <AvatarFallback>{review.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">{review.name}</div>
                          <div className="text-sm text-gray-600">{review.title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Authority Badges */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Certified & Trusted</h3>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {authorityBadges.map((badge, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 text-center w-40 sm:w-48 md:w-56 h-full"
              >
                <CardContent className="p-6 flex flex-col items-center justify-between h-full">
                  <div className="relative mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {badge.verified && (
                        <Verified className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-1 leading-snug">{badge.name}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{badge.rating}</div>
                  <p className="text-sm text-gray-600">{badge.reviews}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Success Stories */}
        {(loading || successStories.length > 0) && (
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Success Stories</h3>

            {loading ? (
              <LoadingSkeleton count={2} className="grid-cols-1 md:grid-cols-2" />
            ) : (
              <div className={`grid grid-cols-1 gap-8 ${successStories.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
                {successStories.map((story, index) => {
                  const IconComponent = iconMap[story.iconType] || TrendingUp
                  return (
                    <Card key={story._id || index} className="group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <IconComponent className="h-6 w-6 text-emerald-600" />
                          <h4 className="text-xl font-bold text-gray-900 ml-3">{story.title}</h4>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="font-semibold text-gray-900">{story.company}</span>
                            </div>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-gray-500">Challenge:</span>
                            <p className="text-gray-700">{story.challenge}</p>
                          </div>

                          <div>
                            <span className="text-sm font-medium text-gray-500">Result:</span>
                            <p className="text-gray-700">{story.result}</p>
                          </div>

                          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                            {story.savings}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Press Mentions */}
        {(loading || mediaFeatures.length > 0) && (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured In Media</h3>

            {loading ? (
              <LoadingSkeleton count={3} className="grid-cols-1 md:grid-cols-3" />
            ) : (
              <div className={`grid grid-cols-1 gap-6 ${mediaFeatures.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : mediaFeatures.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'}`}>
                {mediaFeatures.map((article, index) => (
                  <Card key={article._id || index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">{article.articleType}</Badge>
                      <h4 className="font-bold text-gray-900 mb-3 leading-tight">{article.title}</h4>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="font-medium">{article.source}</span>
                        <span>{article.date}</span>
                      </div>

                      {article.articleUrl ? (
                        <Link href={article.articleUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-blue-600 hover:text-blue-700">
                            Read Article <ExternalLink className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-gray-400 cursor-not-allowed" disabled>
                          Read Article <ExternalLink className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join 10,000+ Happy Clients
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Experience the same exceptional service that has earned us thousands of 5-star reviews
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Start Your Legal Journey
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                >
                  View All Reviews
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default TrustSignals