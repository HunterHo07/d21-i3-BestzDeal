'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ParticleField from '@/components/animations/ParticleField';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoadmapPage() {
  const timelineRef = useRef(null);
  
  // Animation on component mount
  useEffect(() => {
    if (!timelineRef.current) return;
    
    // Animate timeline items
    gsap.fromTo(
      timelineRef.current.querySelectorAll('.timeline-item'),
      { 
        opacity: 0, 
        x: -50 
      },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.3,
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Animate timeline line
    gsap.fromTo(
      '.timeline-line',
      { 
        scaleY: 0,
        transformOrigin: 'top' 
      },
      { 
        scaleY: 1, 
        duration: 1.5, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  // Roadmap phases data
  const phases = [
    {
      title: 'Phase 1: MVP Web App',
      status: 'current',
      timeline: 'Q2 2023',
      description: 'Launch the core platform with essential features for buyers to post requests and sellers to respond with competitive offers.',
      features: [
        'User request posting system',
        'Basic AI matching algorithm',
        'Seller response interface',
        'Offer comparison tools',
        'User profiles and ratings'
      ]
    },
    {
      title: 'Phase 2: Seller Dashboard',
      status: 'upcoming',
      timeline: 'Q3 2023',
      description: 'Enhance the seller experience with advanced tools to manage inventory, track performance, and optimize bidding strategies.',
      features: [
        'Comprehensive seller analytics',
        'Inventory management system',
        'Automated bidding tools',
        'Performance metrics dashboard',
        'Enhanced seller profiles'
      ]
    },
    {
      title: 'Phase 3: Advanced AI Assistant',
      status: 'upcoming',
      timeline: 'Q4 2023',
      description: 'Implement cutting-edge AI capabilities to improve matching accuracy, provide smart suggestions, and enhance the overall user experience.',
      features: [
        'Natural language request parsing',
        'Smart product recommendations',
        'Price prediction algorithms',
        'Personalized matching based on history',
        'Fraud detection and prevention'
      ]
    },
    {
      title: 'Phase 4: Mobile App',
      status: 'upcoming',
      timeline: 'Q1 2024',
      description: 'Extend the platform to mobile devices with native apps for iOS and Android, featuring real-time notifications and on-the-go access.',
      features: [
        'Native iOS and Android apps',
        'Push notifications for new offers',
        'Image and voice input for requests',
        'Mobile-optimized UI/UX',
        'Offline capabilities'
      ]
    },
    {
      title: 'Phase 5: Global Expansion',
      status: 'planned',
      timeline: 'Q2-Q4 2024',
      description: 'Scale the platform internationally with multi-language support, localized features, and region-specific marketplace adaptations.',
      features: [
        'Multi-language support',
        'International payment methods',
        'Regional marketplace customizations',
        'Cross-border transaction support',
        'Local partnerships and integrations'
      ]
    }
  ];
  
  return (
    <div className="min-h-screen">
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
                BestzDeal Roadmap
              </h1>
              <p className="text-xl mb-8">
                Our vision for the future of BestzDeal and how we're building
                the ultimate reverse marketplace platform.
              </p>
            </div>
          </div>
        </section>
        
        {/* Vision section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Our Vision
              </h2>
              
              <Card className="p-8 mb-12">
                <p className="text-lg text-gray-700 mb-6">
                  BestzDeal is on a mission to fundamentally transform e-commerce by creating a buyer-centric
                  marketplace where sellers compete to offer the best deals. Our roadmap outlines how we'll
                  build and scale this revolutionary platform over the coming years.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-indigo-600 mb-2">1M+</div>
                    <p className="text-gray-600">Active users by end of 2024</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                    <p className="text-gray-600">Verified sellers on the platform</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-indigo-600 mb-2">$100M+</div>
                    <p className="text-gray-600">Transaction volume target</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Timeline section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              Development Timeline
            </h2>
            
            <div ref={timelineRef} className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-indigo-200 md:-ml-0.5 timeline-line"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {phases.map((phase, index) => (
                  <div key={index} className="timeline-item relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 -ml-3 md:-ml-3.5 w-7 h-7 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          phase.status === 'current' 
                            ? 'bg-green-500' 
                            : phase.status === 'upcoming' 
                              ? 'bg-indigo-500' 
                              : 'bg-gray-400'
                        }`}
                      ></div>
                    </div>
                    
                    {/* Timeline content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:ml-auto' : 'md:pl-12'}`}>
                      <Card className="p-6">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                          <h3 className="text-xl font-bold">{phase.title}</h3>
                          <div 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              phase.status === 'current' 
                                ? 'bg-green-100 text-green-800' 
                                : phase.status === 'upcoming' 
                                  ? 'bg-indigo-100 text-indigo-800' 
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {phase.timeline}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">
                          {phase.description}
                        </p>
                        
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <ul className="space-y-1 text-gray-700">
                          {phase.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <svg className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {phase.status === 'current' && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-500">Current Progress</div>
                              <div className="text-sm font-medium text-indigo-600">75%</div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Future innovations section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Future Innovations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AR Product Visualization</h3>
                <p className="text-gray-600">
                  Augmented reality tools to visualize products in your space before accepting offers.
                </p>
              </Card>
              
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Offers</h3>
                <p className="text-gray-600">
                  Real-time bidding system for time-sensitive requests with immediate fulfillment options.
                </p>
              </Card>
              
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Blockchain Verification</h3>
                <p className="text-gray-600">
                  Secure transaction records and product authenticity verification using blockchain technology.
                </p>
              </Card>
              
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Group Buying Power</h3>
                <p className="text-gray-600">
                  Aggregate similar requests to leverage collective buying power for even better deals.
                </p>
              </Card>
              
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Integrated Payments</h3>
                <p className="text-gray-600">
                  Secure escrow system and multiple payment options with buyer protection guarantees.
                </p>
              </Card>
              
              <Card className="p-6" hoverEffect={true}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AI Language Translation</h3>
                <p className="text-gray-600">
                  Seamless communication between buyers and sellers across different languages and regions.
                </p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Us on This Journey
              </h2>
              <p className="text-xl mb-8">
                Be part of the revolution in online shopping. Try BestzDeal today
                and experience the future of e-commerce.
              </p>
              <Button href="/demo" variant="outline" size="lg">
                Try BestzDeal Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
