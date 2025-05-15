'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ParticleField from '@/components/animations/ParticleField';
import { formatPrice } from '@/lib/utils';

// Import dummy data
import requestsData from '@/data/requests.json';
import sellersData from '@/data/sellers.json';
import offersData from '@/data/offers.json';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ShowcasePage() {
  const showcaseRef = useRef(null);
  const [activeTab, setActiveTab] = useState('buyers');

  // Animation on component mount
  useEffect(() => {
    if (!showcaseRef.current) return;

    gsap.fromTo(
      showcaseRef.current.querySelectorAll('.animate-in'),
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  // Filter offers by request
  const getOffersForRequest = (requestId) => {
    return offersData.filter(offer => offer.request_id === requestId);
  };

  // Get seller by ID
  const getSellerById = (sellerId) => {
    return sellersData.find(seller => seller.id === sellerId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background effect */}
      <ParticleField count={30} color="#4F46E5" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="pt-24 pb-16">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-indigo-600 to-cyan-500 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                BestzDeal in Action
              </h1>
              <p className="text-xl mb-8">
                See real examples of how BestzDeal is transforming online shopping
                for both buyers and sellers.
              </p>
            </div>
          </div>
        </section>

        {/* Showcase section */}
        <section ref={showcaseRef} className="py-20">
          <div className="container mx-auto px-4">
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                    activeTab === 'buyers'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('buyers')}
                >
                  For Buyers
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                    activeTab === 'sellers'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('sellers')}
                >
                  For Sellers
                </button>
              </div>
            </div>

            {/* Buyers showcase */}
            {activeTab === 'buyers' && (
              <div className="space-y-16">
                <h2 className="text-3xl font-bold text-center text-white mb-12 animate-in">
                  How Buyers Save Time and Money
                </h2>

                {requestsData.slice(0, 3).map((request, index) => (
                  <div key={request.id} className="animate-in">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      {/* Request card */}
                      <Card className="p-6">
                        <h3 className="text-xl font-bold mb-4">Buyer Request</h3>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                            <Image
                              src={request.image}
                              alt="Buyer"
                              width={48}
                              height={48}
                              className="object-cover"
                              onError={(e) => {
                                e.target.src = '/images/buyer.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium">Anonymous Buyer</div>
                            <div className="text-sm text-gray-500">
                              {request.location}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Product</div>
                            <div className="font-medium">{request.title}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Category</div>
                            <div className="font-medium">{request.subcategory}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Budget</div>
                            <div className="font-medium">
                              {formatPrice(request.budget.min)} - {formatPrice(request.budget.max)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Description</div>
                            <div className="text-gray-700">{request.description}</div>
                          </div>
                        </div>

                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <div className="text-xs text-gray-500">Offers Received</div>
                              <div className="font-bold text-indigo-600">{request.offers}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Best Offer</div>
                              <div className="font-bold text-indigo-600">{formatPrice(request.best_offer)}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Savings</div>
                              <div className="font-bold text-green-600">
                                {formatPrice(request.budget.max - request.best_offer)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Offers */}
                      <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold mb-4">Seller Offers</h3>

                        {getOffersForRequest(request.id).slice(0, 3).map((offer, offerIndex) => {
                          const seller = getSellerById(offer.seller_id);
                          return (
                            <Card
                              key={offer.id}
                              className={`p-4 ${offerIndex === 0 ? 'border-2 border-green-500' : ''}`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                <div className="flex items-center mb-2 md:mb-0">
                                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    <Image
                                      src={seller?.logo || '/images/seller.jpg'}
                                      alt={seller?.name || 'Seller'}
                                      width={40}
                                      height={40}
                                      className="object-cover"
                                      onError={(e) => {
                                        e.target.src = '/images/seller.jpg';
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{seller?.name || 'Unknown Seller'}</div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      {seller?.rating || '4.5'} ({seller?.reviews || '0'} reviews)
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-indigo-600">
                                    {formatPrice(offer.price)}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {offer.shipping_cost === 0 ? 'Free shipping' : `+${formatPrice(offer.shipping_cost)} shipping`}
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-700 text-sm mb-3">{offer.description}</p>

                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <div className="text-gray-500">Condition</div>
                                  <div>{offer.condition}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Delivery</div>
                                  <div>{offer.delivery_time}</div>
                                </div>
                                <div>
                                  <div className="text-gray-500">Warranty</div>
                                  <div>{offer.warranty}</div>
                                </div>
                              </div>

                              {offerIndex === 0 && (
                                <div className="mt-3 text-xs text-green-600 font-medium">
                                  Best offer - {Math.round(((request.budget.max - offer.price) / request.budget.max) * 100)}% below maximum budget
                                </div>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {index < requestsData.slice(0, 3).length - 1 && (
                      <div className="border-b border-gray-200 my-12"></div>
                    )}
                  </div>
                ))}

                <div className="text-center animate-in">
                  <Button href="/demo" size="lg">
                    Try It Yourself
                  </Button>
                </div>
              </div>
            )}

            {/* Sellers showcase */}
            {activeTab === 'sellers' && (
              <div className="space-y-16">
                <h2 className="text-3xl font-bold text-center text-white mb-12 animate-in">
                  How Sellers Grow Their Business
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in">
                  {sellersData.slice(0, 6).map((seller) => (
                    <Card key={seller.id} className="p-6" hoverEffect={true}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                          <Image
                            src={seller.logo}
                            alt={seller.name}
                            width={48}
                            height={48}
                            className="object-cover"
                            onError={(e) => {
                              e.target.src = '/images/seller.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{seller.name}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {seller.rating} ({seller.reviews} reviews)
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Categories</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {seller.categories.map((category) => (
                              <span
                                key={category}
                                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                              >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-medium">{seller.location}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Response Time</div>
                          <div className="font-medium">{seller.response_time}</div>
                        </div>
                      </div>

                      <div className="bg-indigo-50 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Completion Rate</div>
                            <div className="font-bold text-indigo-600">{seller.completion_rate}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Member Since</div>
                            <div className="font-bold text-indigo-600">{new Date(seller.joined).getFullYear()}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="bg-indigo-50 rounded-lg p-8 animate-in">
                  <h3 className="text-2xl font-bold mb-4">Seller Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Access Ready-to-Buy Customers</h4>
                        <p className="text-gray-600 text-sm">Connect directly with buyers who have declared purchase intent and budget.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Increase Conversion Rates</h4>
                        <p className="text-gray-600 text-sm">Higher conversion rates compared to traditional marketplaces where buyers browse passively.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Optimize Inventory</h4>
                        <p className="text-gray-600 text-sm">Better understand market demand and adjust inventory based on buyer requests.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Build Trust and Reputation</h4>
                        <p className="text-gray-600 text-sm">Develop a strong seller profile with ratings and reviews from satisfied customers.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center animate-in">
                  <Button href="/demo" size="lg">
                    See How It Works
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
