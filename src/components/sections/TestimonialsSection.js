'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Card from '@/components/ui/Card';

// Import testimonials data
import testimonials from '@/data/testimonials.json';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Animation on component mount
  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.animate-in'),
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
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-indigo-900 to-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-in">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-in">
            Join thousands of satisfied buyers and sellers who are transforming how they shop online.
          </p>
        </div>
        
        {/* Testimonials carousel */}
        <div
          ref={testimonialsRef}
          className="max-w-5xl mx-auto relative animate-in"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <Card
                    glassmorphism={true}
                    className="p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <div className="flex items-center mb-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-gray-200 text-lg italic mb-4">
                          "{testimonial.content}"
                        </p>
                        <div>
                          <div className="font-semibold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-indigo-500'
                    : 'bg-gray-400 hover:bg-indigo-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
