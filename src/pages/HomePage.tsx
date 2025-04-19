import React, { useState, useEffect } from 'react';
import AgentCard from '../components/AgentCard';
import SearchBar from '../components/SearchBar';
import { Agent } from '../types';
import { agents as mockAgents } from '../utils/mockData';
import { Filter, ArrowUpRight, Sparkles } from 'lucide-react';
import { searchAgents } from '../services/gemini';

const HomePage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setAgents(mockAgents);
      setFilteredAgents(mockAgents);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    
    if (query.trim() === '') {
      setFilteredAgents(agents);
      setIsSearching(false);
      return;
    }
    
    try {
      const results = await searchAgents(query, agents);
      setFilteredAgents(results);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to basic filtering
      const results = agents.filter(agent => 
        agent.name.toLowerCase().includes(query.toLowerCase()) ||
        agent.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAgents(results);
    }
    
    setIsSearching(false);
  };

  const applyFilters = () => {
    let results = [...agents];
    
    if (selectedCategory) {
      results = results.filter(agent => 
        agent.categories.some(category => category === selectedCategory)
      );
    }
    
    if (minRating > 0) {
      results = results.filter(agent => agent.rating >= minRating);
    }
    
    setFilteredAgents(results);
  };

  const allCategories = Array.from(
    new Set(agents.flatMap(agent => agent.categories))
  ).sort();

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, minRating]);

  const getRecommendedAgents = () => {
    return agents
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Find Your Perfect AI Agent</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover and compare AI assistants that can boost your productivity and creativity
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {filteredAgents.length} {filteredAgents.length === 1 ? 'Agent' : 'Agents'} Available
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
        </div>
        
        {showFilters && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Minimum Rating</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        {isLoading || isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredAgents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-xl text-gray-600 mb-4">No agents found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setMinRating(0);
                    setFilteredAgents(agents);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Recommended for You</h2>
            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300">
              <span className="mr-1">View all</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && getRecommendedAgents().map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use AgentFinder?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect AI assistant for any task, with verified reviews and detailed information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Find the Right Tool</h3>
            <p className="text-gray-600">Our AI-powered search helps you find the perfect agent for your specific needs.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Reviews</h3>
            <p className="text-gray-600">Read honest reviews from real users to make informed decisions.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Boost Productivity</h3>
            <p className="text-gray-600">Find AI agents that save you time and enhance your workflow.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;