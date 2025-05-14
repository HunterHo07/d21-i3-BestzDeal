'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Button from '@/components/ui/Button';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ComparisonSection() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

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

  // Handle slider drag
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseDown = (e) => {
      e.preventDefault();
      isDragging.current = true;
      updateSliderPosition(e);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        e.preventDefault();
        updateSliderPosition(e);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e) => {
      isDragging.current = true;
      updateSliderPositionTouch(e);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };

    const handleTouchMove = (e) => {
      if (isDragging.current) {
        e.preventDefault();
        updateSliderPositionTouch(e);
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    const updateSliderPosition = (e) => {
      const sliderRect = slider.getBoundingClientRect();
      const position = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      const newPosition = Math.min(Math.max(position, 0), 100);
      setSliderPosition(newPosition);

      // Update the slider visually for immediate feedback
      const rightSide = slider.querySelector('[data-side="right"]');
      if (rightSide) {
        rightSide.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
      }

      // Update handle position
      const handle = slider.querySelector('[data-handle="true"]');
      if (handle) {
        handle.style.left = `${newPosition}%`;
      }
    };

    const updateSliderPositionTouch = (e) => {
      const sliderRect = slider.getBoundingClientRect();
      const touch = e.touches[0];
      const position = ((touch.clientX - sliderRect.left) / sliderRect.width) * 100;
      const newPosition = Math.min(Math.max(position, 0), 100);
      setSliderPosition(newPosition);

      // Update the slider visually for immediate feedback
      const rightSide = slider.querySelector('[data-side="right"]');
      if (rightSide) {
        rightSide.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
      }

      // Update handle position
      const handle = slider.querySelector('[data-handle="true"]');
      if (handle) {
        handle.style.left = `${newPosition}%`;
      }
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('touchstart', handleTouchStart, { passive: false });

    // Add initial animation to show the slider functionality
    setTimeout(() => {
      const initialPosition = 70;
      setSliderPosition(initialPosition);

      const rightSide = slider.querySelector('[data-side="right"]');
      if (rightSide) {
        rightSide.style.clipPath = `inset(0 0 0 ${initialPosition}%)`;
      }

      const handle = slider.querySelector('[data-handle="true"]');
      if (handle) {
        handle.style.left = `${initialPosition}%`;
      }

      setTimeout(() => {
        setSliderPosition(50);

        if (rightSide) {
          rightSide.style.clipPath = `inset(0 0 0 50%)`;
        }

        if (handle) {
          handle.style.left = `50%`;
        }
      }, 1000);
    }, 500);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-in">
            Traditional Shopping vs. BestzDeal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-in">
            See the difference between endless searching and letting sellers compete for your business.
          </p>
        </div>

        {/* Comparison slider */}
        <div className="max-w-4xl mx-auto mb-12 animate-in">
          <div
            ref={sliderRef}
            className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden cursor-ew-resize select-none"
          >
            {/* Left side - Traditional */}
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 bg-red-900/20" />
              <Image
                src="/images/comparison.jpg"
                alt="Traditional Shopping"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-xs text-center">
                  <h3 className="text-xl font-bold text-red-600 mb-2">Traditional Shopping</h3>
                  <ul className="text-left text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Hours spent searching multiple sites</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Manual price comparison across platforms</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>No guarantee of finding the best deal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side - BestzDeal */}
            <div
              data-side="right"
              className="absolute inset-0 z-0"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <div className="absolute inset-0 bg-indigo-900/20" />
              <Image
                src="/images/ai-matching.jpg"
                alt="BestzDeal Shopping"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-xs text-center">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">BestzDeal</h3>
                  <ul className="text-left text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Post once, receive multiple offers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI automatically matches with sellers</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Sellers compete to give you the best price</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Slider handle */}
            <div
              data-handle="true"
              className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-30 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-red-600">
              Traditional
            </div>
            <div className="absolute top-4 right-4 z-30 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
              BestzDeal
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">85%</div>
            <p className="text-gray-600">Average time saved compared to traditional shopping</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">23%</div>
            <p className="text-gray-600">Average savings on purchases through competitive offers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">92%</div>
            <p className="text-gray-600">User satisfaction rate with the BestzDeal process</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-in">
          <Button href="/demo" size="lg">
            Try BestzDeal Now
          </Button>
        </div>
      </div>
    </section>
  );
}
