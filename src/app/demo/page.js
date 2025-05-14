'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ParticleField from '@/components/animations/ParticleField';
import { useApp } from '@/context/AppContext';
import { formatPrice, timeAgo } from '@/lib/utils';

export default function DemoPage() {
  const { 
    categories, 
    createRequest, 
    generateOffers, 
    acceptOffer,
    activeRequest,
    activeOffers,
    loading
  } = useApp();
  
  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    budget: {
      min: 0,
      max: 0
    },
    location: 'United States',
    delivery: 'Shipping',
    urgency: 'No rush'
  });
  
  // Selected category and subcategories
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  
  // Handle category change
  const handleCategoryChange = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    setSelectedCategory(category);
    setSubcategories(category ? category.subcategories : []);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      subcategory: ''
    }));
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'min' || name === 'max') {
      setFormData(prev => ({
        ...prev,
        budget: {
          ...prev.budget,
          [name]: parseInt(value, 10) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate first step
      if (!formData.title || !formData.category || !formData.subcategory) {
        alert('Please fill in all required fields');
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Validate second step
      if (formData.budget.min <= 0 || formData.budget.max <= 0 || formData.budget.min > formData.budget.max) {
        alert('Please enter a valid budget range');
        return;
      }
      
      try {
        // Create request
        await createRequest({
          ...formData,
          image: '/images/buyer.jpg' // Dummy image
        });
        
        // Move to next step
        setStep(3);
      } catch (error) {
        console.error('Error creating request:', error);
        alert('Failed to create request. Please try again.');
      }
    } else if (step === 3) {
      try {
        // Generate offers
        await generateOffers(activeRequest.id);
        
        // Move to next step
        setStep(4);
      } catch (error) {
        console.error('Error generating offers:', error);
        alert('Failed to generate offers. Please try again.');
      }
    }
  };
  
  // Handle accepting an offer
  const handleAcceptOffer = async (offerId) => {
    try {
      await acceptOffer(offerId);
      setStep(5);
    } catch (error) {
      console.error('Error accepting offer:', error);
      alert('Failed to accept offer. Please try again.');
    }
  };
  
  // Reset demo
  const resetDemo = () => {
    setStep(1);
    setFormData({
      title: '',
      category: '',
      subcategory: '',
      description: '',
      budget: {
        min: 0,
        max: 0
      },
      location: 'United States',
      delivery: 'Shipping',
      urgency: 'No rush'
    });
    setSelectedCategory(null);
    setSubcategories([]);
  };
  
  return (
    <div className="min-h-screen">
      {/* Background effect */}
      <ParticleField count={30} color="#4F46E5" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              BestzDeal Demo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience how BestzDeal works. Post a request, watch AI match with sellers,
              and see competitive offers roll in.
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= i 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i}
                  </div>
                  <div className={`text-sm ${step >= i ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {i === 1 && 'Request'}
                    {i === 2 && 'Details'}
                    {i === 3 && 'AI Match'}
                    {i === 4 && 'Offers'}
                    {i === 5 && 'Complete'}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-1 bg-gray-200 mt-4">
              <div 
                className="absolute h-1 bg-indigo-600 transition-all duration-500"
                style={{ width: `${(step - 1) * 25}%` }}
              ></div>
            </div>
          </div>
          
          {/* Demo content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Basic Request Info */}
            {step === 1 && (
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">What are you looking to buy?</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., iPhone 15 Pro Max 256GB"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category*
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleCategoryChange(category.id)}
                            className={`p-3 border rounded-md text-center transition-colors ${
                              formData.category === category.id
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-300 hover:border-indigo-300'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {selectedCategory && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subcategory*
                        </label>
                        <select
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        >
                          <option value="">Select a subcategory</option>
                          {subcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            )}
            
            {/* Step 2: Request Details */}
            {step === 2 && (
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Tell us more about your request</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe what you're looking for in detail..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range*
                      </label>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="number"
                              name="min"
                              value={formData.budget.min || ''}
                              onChange={handleInputChange}
                              placeholder="Min"
                              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="number"
                              name="max"
                              value={formData.budget.max || ''}
                              onChange={handleInputChange}
                              placeholder="Max"
                              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery
                        </label>
                        <select
                          name="delivery"
                          value={formData.delivery}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Shipping">Shipping</option>
                          <option value="Local Pickup">Local Pickup</option>
                          <option value="Either">Either</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Urgency
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="No rush">No rush</option>
                          <option value="Within 2 weeks">Within 2 weeks</option>
                          <option value="Within 1 week">Within 1 week</option>
                          <option value="ASAP">ASAP</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="secondary" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Post Request'}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            )}
            
            {/* Step 3: AI Matching */}
            {step === 3 && activeRequest && (
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">AI is matching your request with sellers</h2>
                
                <div className="mb-8">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-indigo-800 mb-2">Your Request</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Product</div>
                        <div className="font-medium">{activeRequest.title}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Category</div>
                        <div className="font-medium">{activeRequest.subcategory}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Budget</div>
                        <div className="font-medium">
                          {formatPrice(activeRequest.budget.min)} - {formatPrice(activeRequest.budget.max)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{activeRequest.location}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2 mb-8">
                    <p className="text-lg font-medium">Finding the best sellers for your request...</p>
                    <p className="text-gray-500">This usually takes 15-30 seconds</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full animate-pulse w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Analyzing request</span>
                      <span>Matching sellers</span>
                      <span>Generating offers</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Processing...' : 'Continue to Offers'}
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Step 4: Seller Offers */}
            {step === 4 && activeRequest && activeOffers.length > 0 && (
              <Card className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-2">Seller Offers for Your Request</h2>
                <p className="text-gray-500 mb-6">
                  {activeOffers.length} sellers have submitted offers for your request
                </p>
                
                <div className="space-y-6">
                  {activeOffers.map((offer, index) => (
                    <div 
                      key={offer.id}
                      className={`border rounded-lg overflow-hidden ${
                        index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      {index === 0 && (
                        <div className="bg-green-500 text-white text-center py-1 text-sm font-medium">
                          Best Offer
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                              <Image
                                src="/images/seller.jpg"
                                alt="Seller"
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{offer.seller_id.replace('seller-', 'Seller ')}</div>
                              <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {4.5 + Math.random() * 0.5} ({Math.floor(Math.random() * 1000) + 100} reviews)
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">
                              {formatPrice(offer.price)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {offer.shipping_cost === 0 ? 'Free shipping' : `+${formatPrice(offer.shipping_cost)} shipping`}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Offer Details</h4>
                          <p className="text-gray-700">{offer.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <div className="text-gray-500">Condition</div>
                            <div>{offer.condition}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Delivery Time</div>
                            <div>{offer.delivery_time}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Warranty</div>
                            <div>{offer.warranty}</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            onClick={() => handleAcceptOffer(offer.id)}
                            disabled={loading}
                            className="w-full md:w-auto"
                          >
                            {loading ? 'Processing...' : 'Accept Offer'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Step 5: Completion */}
            {step === 5 && (
              <Card className="p-6 md:p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Deal Accepted!</h2>
                <p className="text-gray-600 mb-6">
                  You've successfully accepted an offer. In a real scenario, you would now
                  proceed to payment and complete the transaction.
                </p>
                
                <div className="max-w-md mx-auto bg-indigo-50 rounded-lg p-4 mb-8">
                  <div className="text-center mb-4">
                    <div className="text-sm text-gray-500">Total Price</div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {formatPrice(activeOffers[0]?.price || 0)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Seller</div>
                      <div className="font-medium">{activeOffers[0]?.seller_id.replace('seller-', 'Seller ') || 'Unknown'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Delivery</div>
                      <div className="font-medium">{activeOffers[0]?.delivery_time || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={resetDemo}>
                  Try Another Request
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
