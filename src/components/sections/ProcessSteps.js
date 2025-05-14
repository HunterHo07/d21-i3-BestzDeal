'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Card from '@/components/ui/Card';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSteps() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  
  // Add to steps ref array
  const addToStepsRef = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };
  
  // Animation on component mount
  useEffect(() => {
    if (!sectionRef.current || stepsRef.current.length === 0) return;
    
    // Create animation for each step
    stepsRef.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          delay: index * 0.2
        }
      );
    });
    
    // Animate connecting lines
    gsap.fromTo(
      '.process-line',
      { 
        height: 0 
      },
      { 
        height: '100%', 
        duration: 1.5, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  // Process steps data
  const steps = [
    {
      number: '01',
      title: 'Post Your Request',
      description: 'Describe what you want to buy, including details like product specifications, budget, and delivery preferences.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'AI Matches Sellers',
      description: 'Our AI instantly analyzes your request and matches it with verified sellers who can fulfill your needs.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Sellers Compete',
      description: 'Qualified sellers submit their best offers, competing on price, delivery time, and additional perks.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Choose Your Deal',
      description: 'Review all offers, compare prices and terms, then select the best deal that meets your requirements.',
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];
  
  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-indigo-900"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How BestzDeal Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our reverse marketplace flips the traditional shopping model,
            putting you in control and making sellers compete for your business.
          </p>
        </div>
        
        {/* Process steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line connecting steps */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500 process-line md:-ml-0.5"></div>
          
          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={addToStepsRef}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8`}
              >
                {/* Step number and icon */}
                <div className="flex-shrink-0 z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-900 text-white text-xs font-bold px-2 py-1 rounded">
                    {step.number}
                  </div>
                </div>
                
                {/* Step content */}
                <Card
                  glassmorphism={true}
                  className="p-6 md:w-1/2"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
