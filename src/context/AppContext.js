'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, delay } from '@/lib/utils';

// Import dummy data
import categoriesData from '@/data/categories.json';
import requestsData from '@/data/requests.json';
import sellersData from '@/data/sellers.json';
import offersData from '@/data/offers.json';

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  // State for categories
  const [categories, setCategories] = useState([]);
  
  // State for user requests
  const [requests, setRequests] = useState([]);
  
  // State for sellers
  const [sellers, setSellers] = useState([]);
  
  // State for offers
  const [offers, setOffers] = useState([]);
  
  // State for loading status
  const [loading, setLoading] = useState(true);
  
  // State for current user (dummy)
  const [currentUser, setCurrentUser] = useState(null);
  
  // State for active request (for demo)
  const [activeRequest, setActiveRequest] = useState(null);
  
  // State for active offers (for demo)
  const [activeOffers, setActiveOffers] = useState([]);

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      
      // Load data from localStorage or use dummy data
      const storedRequests = loadFromLocalStorage('requests', requestsData);
      const storedSellers = loadFromLocalStorage('sellers', sellersData);
      const storedOffers = loadFromLocalStorage('offers', offersData);
      const storedUser = loadFromLocalStorage('currentUser', null);
      
      // Simulate API loading delay
      await delay(1000);
      
      // Set state with loaded data
      setCategories(categoriesData);
      setRequests(storedRequests);
      setSellers(storedSellers);
      setOffers(storedOffers);
      setCurrentUser(storedUser);
      
      setLoading(false);
    };
    
    initializeData();
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (!loading) {
      saveToLocalStorage('requests', requests);
      saveToLocalStorage('sellers', sellers);
      saveToLocalStorage('offers', offers);
      if (currentUser) {
        saveToLocalStorage('currentUser', currentUser);
      }
    }
  }, [requests, sellers, offers, currentUser, loading]);
  
  // Function to create a new request
  const createRequest = async (requestData) => {
    setLoading(true);
    
    // Create new request object
    const newRequest = {
      id: `req-${Date.now()}`,
      ...requestData,
      created_at: new Date().toISOString(),
      status: 'active',
      offers: 0,
      best_offer: null
    };
    
    // Simulate API delay
    await delay(1500);
    
    // Add to requests array
    setRequests(prev => [newRequest, ...prev]);
    
    // Set as active request for demo
    setActiveRequest(newRequest);
    
    setLoading(false);
    return newRequest;
  };
  
  // Function to simulate AI matching and generate offers
  const generateOffers = async (requestId) => {
    setLoading(true);
    
    // Find the request
    const request = requests.find(r => r.id === requestId);
    if (!request) {
      setLoading(false);
      throw new Error('Request not found');
    }
    
    // Set as active request
    setActiveRequest(request);
    
    // Simulate AI processing delay
    await delay(2000);
    
    // Find matching sellers based on category
    const matchingSellers = sellers.filter(s => 
      s.categories.includes(request.category)
    );
    
    // Generate 3-5 random offers
    const numOffers = Math.floor(Math.random() * 3) + 3;
    const newOffers = [];
    
    for (let i = 0; i < numOffers && i < matchingSellers.length; i++) {
      const seller = matchingSellers[i];
      
      // Calculate a competitive price within budget range
      const minPrice = request.budget.min;
      const maxPrice = request.budget.max;
      const price = minPrice + Math.random() * (maxPrice - minPrice);
      
      // Create offer
      const offer = {
        id: `offer-${Date.now()}-${i}`,
        request_id: request.id,
        seller_id: seller.id,
        price: Math.round(price * 100) / 100,
        description: `Offer for ${request.title}. Competitive price from ${seller.name}.`,
        condition: 'New',
        delivery_time: '3-5 business days',
        shipping_cost: 0,
        warranty: '1 year standard warranty',
        return_policy: '30-day returns accepted',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      };
      
      newOffers.push(offer);
    }
    
    // Update offers array
    setOffers(prev => [...newOffers, ...prev]);
    
    // Set active offers
    setActiveOffers(newOffers);
    
    // Update request with number of offers and best price
    const bestPrice = Math.min(...newOffers.map(o => o.price));
    const updatedRequests = requests.map(r => {
      if (r.id === request.id) {
        return {
          ...r,
          offers: newOffers.length,
          best_offer: bestPrice
        };
      }
      return r;
    });
    
    setRequests(updatedRequests);
    
    setLoading(false);
    return newOffers;
  };
  
  // Function to accept an offer
  const acceptOffer = async (offerId) => {
    setLoading(true);
    
    // Find the offer
    const offer = offers.find(o => o.id === offerId);
    if (!offer) {
      setLoading(false);
      throw new Error('Offer not found');
    }
    
    // Simulate API delay
    await delay(1500);
    
    // Update offer status
    const updatedOffers = offers.map(o => {
      if (o.id === offerId) {
        return { ...o, status: 'accepted' };
      }
      if (o.request_id === offer.request_id && o.id !== offerId) {
        return { ...o, status: 'declined' };
      }
      return o;
    });
    
    setOffers(updatedOffers);
    
    // Update request status
    const updatedRequests = requests.map(r => {
      if (r.id === offer.request_id) {
        return { ...r, status: 'completed' };
      }
      return r;
    });
    
    setRequests(updatedRequests);
    
    setLoading(false);
    return { ...offer, status: 'accepted' };
  };
  
  // Context value
  const contextValue = {
    categories,
    requests,
    sellers,
    offers,
    loading,
    currentUser,
    activeRequest,
    activeOffers,
    createRequest,
    generateOffers,
    acceptOffer,
    setCurrentUser,
    setActiveRequest,
    setActiveOffers
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
