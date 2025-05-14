'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

export default function HeroSection() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const [productName, setProductName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [offers, setOffers] = useState([]);

  // Animation on component mount
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate random offers
      const dummyOffers = [
        {
          id: 1,
          seller: 'TechDirect',
          price: Math.floor(Math.random() * 300) + 700,
          rating: 4.8,
          delivery: '2-3 days'
        },
        {
          id: 2,
          seller: 'GadgetWorld',
          price: Math.floor(Math.random() * 300) + 700,
          rating: 4.6,
          delivery: '1-2 days'
        },
        {
          id: 3,
          seller: 'ElectroHub',
          price: Math.floor(Math.random() * 300) + 700,
          rating: 4.9,
          delivery: '3-5 days'
        }
      ];

      // Sort by price
      dummyOffers.sort((a, b) => a.price - b.price);

      setOffers(dummyOffers);
      setIsSubmitting(false);
      setShowDemo(true);
    }, 2000);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden flex items-center"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-cyan-900/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div>
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Sellers Compete, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                You Win
              </span>
            </h1>

            <p
              ref={subheadingRef}
              className="text-xl text-gray-200 mb-8"
            >
              Post what you want to buy. Let AI match you with the perfect sellers.
              Watch them compete to give you the best deal.
            </p>

            {/* Interactive demo form */}
            <div ref={formRef}>
              {!showDemo ? (
                <form onSubmit={handleSubmit} className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="What do you want to buy? (e.g., iPhone 15 Pro)"
                      className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      Find Best Deals
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="mb-8 space-y-4">
                  <h3 className="text-xl text-white font-semibold">
                    Best deals for: <span className="text-cyan-300">{productName}</span>
                  </h3>

                  {/* Offers */}
                  <div className="space-y-3">
                    {offers.map((offer, index) => (
                      <Card
                        key={offer.id}
                        glassmorphism={true}
                        className={`p-4 ${index === 0 ? 'border-2 border-green-400' : ''}`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <span className="font-semibold text-white">{offer.seller}</span>
                              <div className="ml-2 px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-xs">
                                ★ {offer.rating}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm">Delivery: {offer.delivery}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              {formatPrice(offer.price)}
                            </div>
                            {index === 0 && (
                              <div className="text-xs text-green-400">Best Deal</div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button href="/demo" variant="primary">
                      See Full Demo
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowDemo(false);
                        setProductName('');
                      }}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">JD</div>
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs">KL</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">MR</div>
                </div>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">1,500+</span> buyers found better deals today
                </p>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div ref={imageRef} className="hidden lg:block">
            <div className="relative">
              <Card
                glassmorphism={true}
                className="p-6 max-w-md mx-auto"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl text-white font-semibold">Your Request</h3>
                    <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                      Active
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Product</label>
                      <div className="text-white">iPhone 15 Pro Max 256GB</div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Budget</label>
                      <div className="text-white">$900 - $1,200</div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Condition</label>
                      <div className="text-white">New</div>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Delivery</label>
                      <div className="text-white">Shipping to 94107</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-gray-400 text-sm">Best offer</div>
                        <div className="text-2xl font-bold text-white">$949.99</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Offers received</div>
                        <div className="text-2xl font-bold text-white">7</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-lg opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
