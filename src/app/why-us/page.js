'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
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

export default function WhyUsPage() {
  const featuresRef = useRef(null);
  
  // Animation on component mount
  useEffect(() => {
    if (!featuresRef.current) return;
    
    gsap.fromTo(
      featuresRef.current.querySelectorAll('.feature-card'),
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  // Features data
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our proprietary AI analyzes your request and instantly matches you with the perfect sellers who can fulfill your needs.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Competitive Bidding',
      description: 'Sellers compete to offer you the best price and service, driving down costs and improving terms.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Time Savings',
      description: 'Eliminate hours of searching and comparing. Post once and let sellers come to you with their best offers.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Verified Sellers',
      description: 'All sellers on our platform are verified and rated, ensuring you only deal with trusted businesses.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Transparent Marketplace',
      description: 'Clear pricing, no hidden fees, and detailed seller information help you make informed decisions.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Cross-Category Platform',
      description: 'From electronics to fashion, home goods to services, BestzDeal works across all product categories.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    }
  ];
  
  // Comparison data
  const comparison = [
    {
      traditional: 'Hours spent searching multiple sites',
      bestzdeal: 'Post once, receive multiple offers'
    },
    {
      traditional: 'Manual price comparison across platforms',
      bestzdeal: 'Sellers compete to offer the best price'
    },
    {
      traditional: 'No guarantee of finding the best deal',
      bestzdeal: 'AI ensures optimal matching with sellers'
    },
    {
      traditional: 'Limited to visible listings',
      bestzdeal: 'Access to sellers' complete inventory'
    },
    {
      traditional: 'Seller-driven marketplace',
      bestzdeal: 'Buyer-centric platform'
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
                Why Choose BestzDeal?
              </h1>
              <p className="text-xl mb-8">
                We're revolutionizing online shopping by putting buyers in control.
                Our reverse marketplace creates a more efficient, transparent, and
                competitive shopping experience.
              </p>
              <Button href="/demo" variant="outline" size="lg">
                Try the Demo
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section ref={featuresRef} className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Unique Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 feature-card"
                  hoverEffect={true}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Comparison section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              BestzDeal vs. Traditional Shopping
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-t-lg md:rounded-t-none md:rounded-tl-lg font-bold text-center text-gray-700 border-b md:border-b-0 md:border-r border-gray-200">
                  Traditional Shopping
                </div>
                <div className="bg-indigo-600 p-4 rounded-b-lg md:rounded-b-none md:rounded-tr-lg font-bold text-center text-white">
                  BestzDeal
                </div>
              </div>
              
              {comparison.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{item.traditional}</span>
                  </div>
                  <div className="bg-indigo-50 p-4 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item.bestzdeal}</span>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-b-lg md:rounded-b-none md:rounded-bl-lg flex items-center justify-center">
                  <Button href="/demo" variant="secondary">
                    See Traditional Shopping
                  </Button>
                </div>
                <div className="bg-indigo-50 p-4 rounded-b-lg md:rounded-b-none md:rounded-br-lg flex items-center justify-center">
                  <Button href="/demo">
                    Try BestzDeal Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              The BestzDeal Advantage
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
                <p className="text-gray-600">Average time saved compared to traditional shopping</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">23%</div>
                <p className="text-gray-600">Average savings on purchases through competitive offers</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">92%</div>
                <p className="text-gray-600">User satisfaction rate with the BestzDeal process</p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-500">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Shopping Experience?
              </h2>
              <p className="text-xl mb-8">
                Join thousands of satisfied users who are saving time and money
                with BestzDeal's revolutionary approach to online shopping.
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
